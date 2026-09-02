"""Unit tests for the safe calculator."""

import pytest

from msa_trainer.calculator.evaluator import EvaluationError, calculate
from msa_trainer.calculator.parser import ParseError
from msa_trainer.calculator.tokenizer import TokenizerError


class TestCalculator:
    """Tests for calculator functionality."""

    def test_simple_addition(self):
        """Test basic addition."""
        assert calculate("2 + 3") == 5

    def test_simple_subtraction(self):
        """Test basic subtraction."""
        assert calculate("10 - 4") == 6

    def test_simple_multiplication(self):
        """Test basic multiplication."""
        assert calculate("3 * 4") == 12

    def test_simple_division(self):
        """Test basic division."""
        assert calculate("20 / 4") == 5

    def test_order_of_operations(self):
        """Test that multiplication has higher precedence than addition."""
        assert calculate("2 + 3 * 4") == 14

    def test_parentheses(self):
        """Test parentheses override precedence."""
        assert calculate("(2 + 3) * 4") == 20

    def test_nested_parentheses(self):
        """Test nested parentheses."""
        assert calculate("((2 + 3) * 2) + 1") == 11

    def test_negative_number(self):
        """Test unary minus."""
        assert calculate("-5 + 3") == -2

    def test_percentage(self):
        """Test percentage conversion."""
        assert calculate("50%") == 0.5

    def test_percentage_in_expression(self):
        """Test percentage in calculation."""
        assert calculate("200 * 20%") == 40

    def test_german_decimal_comma(self):
        """Test German decimal comma support."""
        assert calculate("3,5 + 1,5") == 5.0

    def test_division_by_zero(self):
        """Test division by zero raises error."""
        with pytest.raises(EvaluationError):
            calculate("5 / 0")

    def test_invalid_character(self):
        """Test invalid character raises error."""
        with pytest.raises(TokenizerError):
            calculate("2 + x")

    def test_mismatched_parentheses(self):
        """Test mismatched parentheses raises error."""
        with pytest.raises(ParseError):
            calculate("(2 + 3")

    def test_complex_expression(self):
        """Test complex mathematical expression."""
        result = calculate("(100 - 20) * 0.15 + 5")
        assert result == pytest.approx(17.0)

    def test_no_eval_used(self):
        """Verify that eval is not used in the implementation."""
        import ast
        import inspect
        from msa_trainer.calculator import evaluator, parser, tokenizer

        for module in [evaluator, parser, tokenizer]:
            source = inspect.getsource(module)
            tree = ast.parse(source)

            # Walk the AST looking for Call nodes where func is 'eval'
            for node in ast.walk(tree):
                if isinstance(node, ast.Call):
                    if isinstance(node.func, ast.Name) and node.func.id == 'eval':
                        pytest.fail(f"eval() call found in {module.__name__}")


class TestTokenizer:
    """Tests for tokenizer specifically."""

    def test_valid_characters_only(self):
        """Test that only valid characters are accepted."""
        from msa_trainer.calculator.tokenizer import Tokenizer

        # Valid expression
        tokenizer = Tokenizer("123 + 456 * (7 - 8) / 9.5")
        tokens = tokenizer.tokenize()
        assert len(tokens) > 0

        # Invalid expression
        with pytest.raises(TokenizerError):
            Tokenizer("abc").tokenize()

    def test_allowed_chars(self):
        """Test allowed character set."""
        from msa_trainer.calculator.tokenizer import ALLOWED_CHARS

        allowed = "0123456789.+-*/()%, "
        for char in allowed:
            assert char in ALLOWED_CHARS

        # Security: no letters, no special chars
        for char in "abcdefghijklmnopqrstuvwxyz[]{}$;":
            assert char not in ALLOWED_CHARS
