"""Lexical analysis for safe calculator expressions."""

import math
from dataclasses import dataclass
from enum import Enum, auto
from typing import Iterator


class TokenType(Enum):
    """Token types for calculator expressions."""

    NUMBER = auto()
    PLUS = auto()
    MINUS = auto()
    STAR = auto()
    SLASH = auto()
    LPAREN = auto()
    RPAREN = auto()
    PERCENT = auto()
    CARET = auto()  # Power operator ^
    FUNCTION = auto()  # sin, cos, tan, sqrt, log, ln, abs
    CONSTANT = auto()  # π, e
    EOF = auto()


@dataclass(frozen=True)
class Token:
    """A token from the expression."""

    type: TokenType
    value: str
    position: int


class TokenizerError(Exception):
    """Error during tokenization."""

    def __init__(self, message: str, position: int) -> None:
        super().__init__(message)
        self.position = position


# Supported functions
FUNCTIONS = {"sin", "cos", "tan", "sqrt", "log", "ln", "abs", "asin", "acos", "atan"}

# Supported constants with their values
CONSTANTS = {"pi": math.pi, "e": math.e}

# Allowed characters for security
ALLOWED_CHARS = set("0123456789.+-*/()%,^ abcdefghijklmnopqrstuvwxyz")


class Tokenizer:
    """Tokenizes calculator expressions.

    Supports scientific functions and constants.
    NO eval() or arbitrary code execution.
    """

    def __init__(self, expression: str) -> None:
        # Normalize: lowercase and replace π with pi
        self._expr = expression.lower().replace("π", "pi")
        self._pos = 0

    def tokenize(self) -> list[Token]:
        """
        Convert expression string to tokens.

        Raises TokenizerError on invalid characters.
        """
        self._validate_characters()
        tokens: list[Token] = []

        for token in self._generate_tokens():
            tokens.append(token)

        tokens.append(Token(TokenType.EOF, "", self._pos))
        return tokens

    def _validate_characters(self) -> None:
        """Check that expression only contains allowed characters."""
        for i, char in enumerate(self._expr):
            if char not in ALLOWED_CHARS:
                raise TokenizerError(f"Invalid character: '{char}'", i)

    def _generate_tokens(self) -> Iterator[Token]:
        """Generate tokens from the expression."""
        while self._pos < len(self._expr):
            char = self._expr[self._pos]

            if char.isspace():
                self._pos += 1
                continue

            if char.isdigit() or char == ".":
                yield self._read_number()
            elif char == ",":
                # Handle German decimal comma
                yield self._read_number_with_comma()
            elif char.isalpha():
                yield self._read_identifier()
            elif char == "+":
                yield Token(TokenType.PLUS, "+", self._pos)
                self._pos += 1
            elif char == "-":
                yield Token(TokenType.MINUS, "-", self._pos)
                self._pos += 1
            elif char == "*":
                yield Token(TokenType.STAR, "*", self._pos)
                self._pos += 1
            elif char == "/":
                yield Token(TokenType.SLASH, "/", self._pos)
                self._pos += 1
            elif char == "^":
                yield Token(TokenType.CARET, "^", self._pos)
                self._pos += 1
            elif char == "(":
                yield Token(TokenType.LPAREN, "(", self._pos)
                self._pos += 1
            elif char == ")":
                yield Token(TokenType.RPAREN, ")", self._pos)
                self._pos += 1
            elif char == "%":
                yield Token(TokenType.PERCENT, "%", self._pos)
                self._pos += 1
            else:
                raise TokenizerError(f"Unexpected character: '{char}'", self._pos)

    def _read_number(self) -> Token:
        """Read a number token."""
        start_pos = self._pos
        has_dot = False

        while self._pos < len(self._expr):
            char = self._expr[self._pos]
            if char.isdigit():
                self._pos += 1
            elif char == "." and not has_dot:
                has_dot = True
                self._pos += 1
            elif char == "," and not has_dot:
                # German decimal comma
                has_dot = True
                self._pos += 1
            else:
                break

        value = self._expr[start_pos : self._pos].replace(",", ".")
        return Token(TokenType.NUMBER, value, start_pos)

    def _read_number_with_comma(self) -> Token:
        """Handle comma at start (like ,5 for 0.5)."""
        start_pos = self._pos
        self._pos += 1  # Skip comma

        while self._pos < len(self._expr) and self._expr[self._pos].isdigit():
            self._pos += 1

        value = "0." + self._expr[start_pos + 1 : self._pos]
        return Token(TokenType.NUMBER, value, start_pos)

    def _read_identifier(self) -> Token:
        """Read a function name or constant."""
        start_pos = self._pos

        while self._pos < len(self._expr) and self._expr[self._pos].isalpha():
            self._pos += 1

        name = self._expr[start_pos : self._pos]

        if name in FUNCTIONS:
            return Token(TokenType.FUNCTION, name, start_pos)
        elif name in CONSTANTS:
            return Token(TokenType.CONSTANT, name, start_pos)
        else:
            raise TokenizerError(f"Unbekannte Funktion: '{name}'", start_pos)
