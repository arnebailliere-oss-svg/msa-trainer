"""Parser for calculator expressions using recursive descent."""

from dataclasses import dataclass
from typing import Union

from msa_trainer.calculator.tokenizer import Token, TokenType


class ParseError(Exception):
    """Error during parsing."""

    def __init__(self, message: str, token: Token) -> None:
        super().__init__(message)
        self.token = token


# AST Node types
@dataclass(frozen=True)
class NumberNode:
    """A numeric literal."""

    value: float


@dataclass(frozen=True)
class ConstantNode:
    """A mathematical constant (pi, e)."""

    name: str


@dataclass(frozen=True)
class BinaryOpNode:
    """A binary operation."""

    op: str
    left: "ASTNode"
    right: "ASTNode"


@dataclass(frozen=True)
class UnaryOpNode:
    """A unary operation (negation)."""

    op: str
    operand: "ASTNode"


@dataclass(frozen=True)
class PercentNode:
    """A percentage operation."""

    operand: "ASTNode"


@dataclass(frozen=True)
class FunctionNode:
    """A function call (sin, cos, sqrt, etc.)."""

    name: str
    argument: "ASTNode"


ASTNode = Union[NumberNode, ConstantNode, BinaryOpNode, UnaryOpNode, PercentNode, FunctionNode]


class Parser:
    """Recursive descent parser for calculator expressions.

    Grammar:
        expr    -> term (('+' | '-') term)*
        term    -> power (('*' | '/') power)*
        power   -> factor ('^' power)?
        factor  -> ('-')? primary ('%')?
        primary -> NUMBER | CONSTANT | FUNCTION '(' expr ')' | '(' expr ')'
    """

    def __init__(self, tokens: list[Token]) -> None:
        self._tokens = tokens
        self._pos = 0

    def parse(self) -> ASTNode:
        """Parse tokens into AST."""
        if not self._tokens or self._current().type == TokenType.EOF:
            raise ParseError("Leerer Ausdruck", self._current())

        result = self._parse_expr()

        if self._current().type != TokenType.EOF:
            raise ParseError(
                f"Unerwartetes Zeichen: {self._current().value}", self._current()
            )

        return result

    def _current(self) -> Token:
        """Get current token."""
        if self._pos >= len(self._tokens):
            return Token(TokenType.EOF, "", -1)
        return self._tokens[self._pos]

    def _advance(self) -> Token:
        """Advance to next token and return previous."""
        token = self._current()
        self._pos += 1
        return token

    def _match(self, *types: TokenType) -> bool:
        """Check if current token matches any of the types."""
        return self._current().type in types

    def _parse_expr(self) -> ASTNode:
        """Parse addition/subtraction."""
        left = self._parse_term()

        while self._match(TokenType.PLUS, TokenType.MINUS):
            op_token = self._advance()
            op = "+" if op_token.type == TokenType.PLUS else "-"
            right = self._parse_term()
            left = BinaryOpNode(op, left, right)

        return left

    def _parse_term(self) -> ASTNode:
        """Parse multiplication/division."""
        left = self._parse_power()

        while self._match(TokenType.STAR, TokenType.SLASH):
            op_token = self._advance()
            op = "*" if op_token.type == TokenType.STAR else "/"
            right = self._parse_power()
            left = BinaryOpNode(op, left, right)

        return left

    def _parse_power(self) -> ASTNode:
        """Parse exponentiation (right-associative)."""
        base = self._parse_factor()

        if self._match(TokenType.CARET):
            self._advance()
            exponent = self._parse_power()  # Right-associative
            return BinaryOpNode("^", base, exponent)

        return base

    def _parse_factor(self) -> ASTNode:
        """Parse unary minus and percentage."""
        # Handle unary minus
        if self._match(TokenType.MINUS):
            self._advance()
            operand = self._parse_factor()
            return UnaryOpNode("-", operand)

        # Handle unary plus (just skip it)
        if self._match(TokenType.PLUS):
            self._advance()
            return self._parse_factor()

        result = self._parse_primary()

        # Handle percentage
        if self._match(TokenType.PERCENT):
            self._advance()
            result = PercentNode(result)

        return result

    def _parse_primary(self) -> ASTNode:
        """Parse number, constant, function call, or parenthesized expression."""
        # Number
        if self._match(TokenType.NUMBER):
            token = self._advance()
            return NumberNode(float(token.value))

        # Constant (pi, e)
        if self._match(TokenType.CONSTANT):
            token = self._advance()
            return ConstantNode(token.value)

        # Function call
        if self._match(TokenType.FUNCTION):
            func_token = self._advance()
            func_name = func_token.value

            if not self._match(TokenType.LPAREN):
                raise ParseError(f"Erwarte '(' nach {func_name}", self._current())

            self._advance()  # Skip '('
            argument = self._parse_expr()

            if not self._match(TokenType.RPAREN):
                raise ParseError("Erwarte ')'", self._current())

            self._advance()  # Skip ')'
            return FunctionNode(func_name, argument)

        # Parenthesized expression
        if self._match(TokenType.LPAREN):
            self._advance()  # Skip '('
            result = self._parse_expr()

            if not self._match(TokenType.RPAREN):
                raise ParseError("Erwarte ')'", self._current())

            self._advance()  # Skip ')'
            return result

        raise ParseError(f"Unerwartetes Zeichen: {self._current().value}", self._current())
