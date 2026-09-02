"""Calculator widget for math sessions."""

from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import (
    QGridLayout,
    QLineEdit,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.calculator.evaluator import EvaluationError, calculate
from msa_trainer.calculator.parser import ParseError
from msa_trainer.calculator.tokenizer import TokenizerError


class CalculatorWidget(QWidget):
    """Calculator widget - safe, no eval()."""

    result_ready = Signal(str)

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self) -> None:
        layout = QVBoxLayout(self)
        layout.setSpacing(2)
        layout.setContentsMargins(2, 2, 2, 2)

        # Display
        self._display = QLineEdit()
        self._display.setAlignment(Qt.AlignmentFlag.AlignRight)
        self._display.setMinimumHeight(40)
        self._display.setStyleSheet("font-size: 18px; padding: 5px; background: white; border: 1px solid #999;")
        self._display.returnPressed.connect(self._calculate)
        layout.addWidget(self._display)

        # Buttons grid
        grid = QGridLayout()
        grid.setSpacing(2)

        # Define buttons: text, action
        buttons = [
            ("sin", "sin("), ("cos", "cos("), ("tan", "tan("), ("^", "^"), ("C", "C"),
            ("sqrt", "sqrt("), ("log", "log("), ("(", "("), (")", ")"), ("DEL", "DEL"),
            ("7", "7"), ("8", "8"), ("9", "9"), ("/", "/"), ("%", "%"),
            ("4", "4"), ("5", "5"), ("6", "6"), ("*", "*"), ("pi", "pi"),
            ("1", "1"), ("2", "2"), ("3", "3"), ("-", "-"), ("=", "="),
            ("0", "0"), ("", ""), (",", ","), ("+", "+"), ("", ""),
        ]

        row, col = 0, 0
        for text, action in buttons:
            if text:
                btn = QPushButton(text)
                btn.setFixedSize(42, 38)

                # Colors and font sizes
                if text in ["C", "DEL"]:
                    bg, fg, fs = "#E53935", "white", "9"
                elif text == "=":
                    bg, fg, fs = "#43A047", "white", "16"
                elif text in ["sin", "cos", "tan", "sqrt", "log"]:
                    bg, fg, fs = "#7B1FA2", "white", "9"
                elif text == "pi":
                    bg, fg, fs = "#00796B", "white", "10"
                elif text in "+-*/^()%":
                    bg, fg, fs = "#1976D2", "white", "14"
                else:
                    bg, fg, fs = "#EEE", "#000", "14"

                btn.setStyleSheet(f"""
                    QPushButton {{
                        background-color: {bg};
                        color: {fg};
                        font-size: {fs}px;
                        font-weight: bold;
                        border: none;
                        border-radius: 2px;
                        padding: 0px;
                        margin: 0px;
                    }}
                """)
                btn.clicked.connect(lambda checked, a=action: self._on_click(a))
                grid.addWidget(btn, row, col)
            col += 1
            if col >= 5:
                col = 0
                row += 1

        layout.addLayout(grid)

    def _on_click(self, action: str) -> None:
        if action == "C":
            self._display.clear()
        elif action == "DEL":
            self._display.setText(self._display.text()[:-1])
        elif action == "=":
            self._calculate()
        else:
            self._display.setText(self._display.text() + action)

    def _calculate(self) -> None:
        expr = self._display.text()
        if not expr:
            return
        try:
            result = calculate(expr)
            if result == int(result):
                self._display.setText(str(int(result)))
            else:
                self._display.setText(f"{result:.10g}".replace(".", ","))
            self.result_ready.emit(self._display.text())
        except (TokenizerError, ParseError, EvaluationError):
            self._display.setText("Fehler")

    def clear(self) -> None:
        self._display.clear()

    def get_value(self) -> str:
        return self._display.text()

    def set_value(self, value: str) -> None:
        self._display.setText(value)
