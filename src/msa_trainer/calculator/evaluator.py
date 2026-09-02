"""Safe AST evaluator for calculator expressions.

NO eval() - walks the AST to compute results.
"""

import math

from msa_trainer.calculator.parser import (
    ASTNode,
    BinaryOpNode,
    ConstantNode,
    FunctionNode,
    NumberNode,
    PercentNode,
    UnaryOpNode,
)


class EvaluationError(Exception):
    """Error during evaluation."""

    pass


# Mathematical constants
CONSTANTS = {
    "pi": math.pi,
    "e": math.e,
}

# Mathematical functions (all take radians for trig)
FUNCTIONS = {
    "sin": math.sin,
    "cos": math.cos,
    "tan": math.tan,
    "asin": math.asin,
    "acos": math.acos,
    "atan": math.atan,
    "sqrt": math.sqrt,
    "log": math.log10,  # log base 10
    "ln": math.log,  # natural log
    "abs": abs,
}


class SafeEvaluator:
    """Evaluates AST to numeric result without using eval()."""

    def evaluate(self, ast: ASTNode) -> float:
        """
        Evaluate AST to numeric result.

        Raises EvaluationError on errors (e.g., division by zero).
        """
        return self._eval_node(ast)

    def _eval_node(self, node: ASTNode) -> float:
        """Recursively evaluate an AST node."""
        if isinstance(node, NumberNode):
            return node.value

        elif isinstance(node, ConstantNode):
            if node.name in CONSTANTS:
                return CONSTANTS[node.name]
            raise EvaluationError(f"Unbekannte Konstante: {node.name}")

        elif isinstance(node, UnaryOpNode):
            operand = self._eval_node(node.operand)
            if node.op == "-":
                return -operand
            return operand

        elif isinstance(node, PercentNode):
            operand = self._eval_node(node.operand)
            return operand / 100.0

        elif isinstance(node, FunctionNode):
            argument = self._eval_node(node.argument)
            if node.name in FUNCTIONS:
                try:
                    return FUNCTIONS[node.name](argument)
                except ValueError as e:
                    raise EvaluationError(f"Mathematischer Fehler in {node.name}: {e}")
            raise EvaluationError(f"Unbekannte Funktion: {node.name}")

        elif isinstance(node, BinaryOpNode):
            left = self._eval_node(node.left)
            right = self._eval_node(node.right)

            if node.op == "+":
                return left + right
            elif node.op == "-":
                return left - right
            elif node.op == "*":
                return left * right
            elif node.op == "/":
                if right == 0:
                    raise EvaluationError("Division durch Null")
                return left / right
            elif node.op == "^":
                try:
                    return math.pow(left, right)
                except ValueError as e:
                    raise EvaluationError(f"Potenzfehler: {e}")

        raise EvaluationError(f"Unbekannter Knotentyp: {type(node)}")


def calculate(expression: str) -> float:
    """
    Calculate the result of an expression.

    This is the main entry point for the calculator.
    Uses tokenizer + parser + evaluator - NO eval().

    Args:
        expression: Mathematical expression string

    Returns:
        Calculated result

    Raises:
        TokenizerError: Invalid characters in expression
        ParseError: Syntax error in expression
        EvaluationError: Error during calculation (e.g., division by zero)
    """
    from msa_trainer.calculator.tokenizer import Tokenizer
    from msa_trainer.calculator.parser import Parser

    tokenizer = Tokenizer(expression)
    tokens = tokenizer.tokenize()

    parser = Parser(tokens)
    ast = parser.parse()

    evaluator = SafeEvaluator()
    return evaluator.evaluate(ast)
