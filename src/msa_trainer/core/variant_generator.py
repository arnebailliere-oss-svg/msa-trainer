"""Deterministic variant generation for questions.

Implements the seeding algorithm from docs/VARIANTS_AND_SEEDING.md.
"""

import hashlib
import random
import re
from datetime import datetime
from typing import Any, Optional

from msa_trainer.core.enums import Subject, TrainingMode
from msa_trainer.core.models import Question, RenderedQuestion, VariantSpec


class VariantGenerator:
    """Generates reproducible question variants using SHA-256 seeding.

    Seed generation (from VARIANTS_AND_SEEDING.md):
    1. Canonical string: user_id|subject|topic_id|question_id|date_key|mode_key|counter
    2. SHA-256 hash
    3. First 8 bytes as uint64 (big endian)
    4. Use as seed for local RNG
    """

    def __init__(self) -> None:
        # Counter storage: (user_id, subject, topic_id, mode, date) -> counter
        self._counters: dict[tuple, int] = {}

    def generate_seed(
        self,
        user_id: str,
        subject: Subject,
        topic_id: str,
        question_id: str,
        mode: TrainingMode,
        date_key: Optional[str] = None,
        counter: Optional[int] = None,
    ) -> int:
        """
        Compute 64-bit seed from canonical inputs.

        Args:
            user_id: Current user ID
            subject: Subject of the question
            topic_id: Topic ID
            question_id: Base question ID
            mode: Training mode
            date_key: Date string (YYYY-MM-DD), defaults to today
            counter: Variant counter, auto-managed if not provided

        Returns:
            64-bit integer seed
        """
        if date_key is None:
            date_key = datetime.now().strftime("%Y-%m-%d")

        if counter is None:
            counter = self._get_and_increment_counter(
                user_id, subject, topic_id, mode, date_key
            )

        # Build canonical string
        canonical = "|".join([
            user_id,
            subject.value,
            topic_id,
            question_id,
            date_key,
            mode.value,
            str(counter),
        ])

        # SHA-256 hash
        digest = hashlib.sha256(canonical.encode("utf-8")).digest()

        # First 8 bytes as uint64 (big endian)
        seed = int.from_bytes(digest[:8], byteorder="big")

        return seed

    def render_variant(
        self,
        question: Question,
        user_id: str,
        mode: TrainingMode,
        seed: Optional[int] = None,
        date_key: Optional[str] = None,
        counter: Optional[int] = None,
    ) -> RenderedQuestion:
        """
        Render a question with applied variants.

        Args:
            question: Base question
            user_id: Current user
            mode: Training mode
            seed: Optional pre-computed seed
            date_key: Date for variant ID
            counter: Counter for variant ID

        Returns:
            RenderedQuestion with variants applied
        """
        if date_key is None:
            date_key = datetime.now().strftime("%Y-%m-%d")

        if counter is None:
            counter = self._get_counter(
                user_id, question.subject, question.topic_id, mode, date_key
            )

        # Generate variant ID
        variant_id = f"{question.id}::{date_key}::{mode.value}::{counter}"

        # If no variants or variants disabled, return as-is
        if not question.variants or not question.variants.enabled:
            return RenderedQuestion(
                base_question_id=question.id,
                variant_id=variant_id,
                subject=question.subject,
                topic_id=question.topic_id,
                difficulty=question.difficulty,
                qtype=question.qtype,
                prompt=question.prompt,
                payload=question.payload,
                solution=question.solution,
                explanation=question.explanation,
                image=question.image,
                image_region=question.image_region,
            )

        # Generate seed if not provided
        if seed is None:
            seed = self.generate_seed(
                user_id, question.subject, question.topic_id,
                question.id, mode, date_key, counter
            )

        # Apply variants
        rng = random.Random(seed)
        rendered_vars = self._sample_variables(question.variants, rng)
        rendered_prompt = self._render_template(question.variants.template, rendered_vars)
        rendered_solution = self._compute_solution(question.solution, rendered_vars)

        return RenderedQuestion(
            base_question_id=question.id,
            variant_id=variant_id,
            subject=question.subject,
            topic_id=question.topic_id,
            difficulty=question.difficulty,
            qtype=question.qtype,
            prompt=rendered_prompt,
            payload=question.payload,
            solution=rendered_solution,
            explanation=self._render_template(question.explanation, rendered_vars),
            rendered_vars=rendered_vars,
            image=question.image,
            image_region=question.image_region,
        )

    def get_variant_id(
        self, question_id: str, date_key: str, mode: TrainingMode, counter: int
    ) -> str:
        """Generate unique variant ID string."""
        return f"{question_id}::{date_key}::{mode.value}::{counter}"

    def _get_and_increment_counter(
        self,
        user_id: str,
        subject: Subject,
        topic_id: str,
        mode: TrainingMode,
        date_key: str,
    ) -> int:
        """Get current counter and increment for next use."""
        key = (user_id, subject.value, topic_id, mode.value, date_key)
        counter = self._counters.get(key, 0)
        self._counters[key] = counter + 1
        return counter

    def _get_counter(
        self,
        user_id: str,
        subject: Subject,
        topic_id: str,
        mode: TrainingMode,
        date_key: str,
    ) -> int:
        """Get current counter without incrementing."""
        key = (user_id, subject.value, topic_id, mode.value, date_key)
        return self._counters.get(key, 0)

    def _sample_variables(
        self, spec: VariantSpec, rng: random.Random
    ) -> dict[str, Any]:
        """Sample values for all variables using the RNG."""
        rendered: dict[str, Any] = {}

        # Process variables in sorted order for determinism
        for var_name in sorted(spec.variables.keys()):
            var_def = spec.variables[var_name]
            var_type = var_def.get("type", "choice")

            if var_type == "int":
                min_val = var_def.get("min", 1)
                max_val = var_def.get("max", 10)
                step = var_def.get("step", 1)
                pool = list(range(min_val, max_val + 1, step))
            elif var_type == "choice":
                pool = var_def.get("values", [])
            else:
                pool = var_def.get("values", [])

            if pool:
                rendered[var_name] = rng.choice(pool)

        return rendered

    def _render_template(self, template: str, variables: dict[str, Any]) -> str:
        """Replace {{varname}} placeholders with values."""
        result = template
        for var_name, value in variables.items():
            placeholder = "{{" + var_name + "}}"
            result = result.replace(placeholder, str(value))
        return result

    def _compute_solution(
        self, solution: dict[str, Any], variables: dict[str, Any]
    ) -> dict[str, Any]:
        """Compute solution with variable substitution."""
        kind = solution.get("kind")

        if kind == "computed_number":
            expr = solution.get("expr", "")
            round_digits = solution.get("round")

            # Safe expression evaluation
            computed = self._safe_eval_expr(expr, variables)

            if round_digits is not None and computed is not None:
                computed = round(computed, round_digits)

            return {"value": computed}

        # For non-computed solutions, just render any templates
        result = {}
        for key, value in solution.items():
            if isinstance(value, str) and "{{" in value:
                result[key] = self._render_template(value, variables)
            else:
                result[key] = value

        return result

    def _safe_eval_expr(self, expr: str, variables: dict[str, Any]) -> Optional[float]:
        """
        Safely evaluate a simple math expression.

        Supports: + - * / ( ) and variable names.
        NO eval() - uses parsing instead.
        """
        try:
            # Substitute variables
            substituted = expr
            for var_name, value in variables.items():
                substituted = re.sub(
                    rf"\b{var_name}\b",
                    str(float(value)),
                    substituted
                )

            # Validate: only allow digits, operators, parentheses, dots, spaces
            if not re.match(r"^[\d\s\+\-\*\/\(\)\.]+$", substituted):
                return None

            # Parse and evaluate using a simple recursive descent parser
            return self._parse_expression(substituted)

        except Exception:
            return None

    def _parse_expression(self, expr: str) -> float:
        """Parse and evaluate a simple arithmetic expression."""
        tokens = self._tokenize(expr)
        pos = [0]  # Use list to allow modification in nested functions

        def parse_term() -> float:
            result = parse_factor()
            while pos[0] < len(tokens) and tokens[pos[0]] in ("*", "/"):
                op = tokens[pos[0]]
                pos[0] += 1
                right = parse_factor()
                if op == "*":
                    result *= right
                else:
                    result /= right
            return result

        def parse_factor() -> float:
            token = tokens[pos[0]]
            if token == "(":
                pos[0] += 1
                result = parse_expr()
                pos[0] += 1  # skip ')'
                return result
            elif token == "-":
                pos[0] += 1
                return -parse_factor()
            else:
                pos[0] += 1
                return float(token)

        def parse_expr() -> float:
            result = parse_term()
            while pos[0] < len(tokens) and tokens[pos[0]] in ("+", "-"):
                op = tokens[pos[0]]
                pos[0] += 1
                right = parse_term()
                if op == "+":
                    result += right
                else:
                    result -= right
            return result

        return parse_expr()

    def _tokenize(self, expr: str) -> list[str]:
        """Tokenize a math expression."""
        tokens = []
        current = ""

        for char in expr:
            if char.isspace():
                if current:
                    tokens.append(current)
                    current = ""
            elif char in "+-*/()":
                if current:
                    tokens.append(current)
                    current = ""
                tokens.append(char)
            elif char.isdigit() or char == ".":
                current += char
            else:
                if current:
                    tokens.append(current)
                    current = ""

        if current:
            tokens.append(current)

        return tokens
