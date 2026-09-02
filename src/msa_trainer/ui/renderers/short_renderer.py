"""SHORT (short answer) renderer with educational feedback."""

from pathlib import Path
from typing import Any, Optional

from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QFrame,
    QLabel,
    QLineEdit,
    QScrollArea,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.models import RenderedQuestion
from msa_trainer.ui.renderers.base_renderer import BaseRenderer
from msa_trainer.ui.styles import COLORS
from msa_trainer.ui.widgets.question_image import QuestionImageWidget


class ShortRenderer(BaseRenderer):
    """Renderer for short answer questions with enhanced feedback."""

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._question: Optional[RenderedQuestion] = None
        self._content_pack_path: Optional[Path] = None
        self._setup_ui()

    def set_content_pack_path(self, path: Path) -> None:
        """Set path for resolving image paths."""
        self._content_pack_path = path
        self._image_widget.set_content_pack_path(path)

    def _setup_ui(self) -> None:
        """Set up the UI."""
        self._layout = QVBoxLayout(self)
        self._layout.setSpacing(8)
        self._layout.setContentsMargins(8, 8, 8, 8)

        # Question prompt - compact
        self._prompt_label = QLabel()
        self._prompt_label.setWordWrap(True)
        self._prompt_label.setStyleSheet(
            f"""
            font-size: 18px;
            color: {COLORS['text_primary']};
            padding: 12px;
            background-color: {COLORS['surface']};
            border-radius: 8px;
            border: 2px solid {COLORS['primary_light']};
            """
        )
        self._layout.addWidget(self._prompt_label)

        # Question image (hidden by default)
        self._image_widget = QuestionImageWidget()
        self._layout.addWidget(self._image_widget)

        # Answer input area - compact
        input_container = QWidget()
        input_layout = QVBoxLayout(input_container)
        input_layout.setContentsMargins(0, 0, 0, 0)
        input_layout.setSpacing(4)

        # Input label
        input_label = QLabel("Deine Antwort:")
        input_label.setStyleSheet(f"font-size: 13px; font-weight: bold; color: {COLORS['text_secondary']};")
        input_layout.addWidget(input_label)

        # Answer input
        self._input = QLineEdit()
        self._input.setPlaceholderText("Antwort eingeben...")
        self._input.setStyleSheet(self._get_input_style("normal"))
        self._input.returnPressed.connect(lambda: self.answer_submitted.emit(self.get_answer()))
        input_layout.addWidget(self._input)

        # Hint for number format
        self._hint_label = QLabel()
        self._hint_label.setStyleSheet(f"color: {COLORS['text_secondary']}; font-size: 12px; font-style: italic;")
        input_layout.addWidget(self._hint_label)

        self._layout.addWidget(input_container)

        # Scrollable feedback area
        self._feedback_scroll = QScrollArea()
        self._feedback_scroll.setWidgetResizable(True)
        self._feedback_scroll.setFrameShape(QFrame.NoFrame)
        self._feedback_scroll.setVisible(False)
        self._feedback_scroll.setStyleSheet("QScrollArea { border: none; background: transparent; }")

        self._feedback_widget = QWidget()
        self._feedback_layout = QVBoxLayout(self._feedback_widget)
        self._feedback_layout.setSpacing(6)
        self._feedback_layout.setContentsMargins(8, 8, 8, 8)

        # Status header - compact
        self._status_label = QLabel()
        self._status_label.setStyleSheet("font-size: 18px; font-weight: bold;")
        self._feedback_layout.addWidget(self._status_label)

        # Explanation section
        self._explanation_label = QLabel()
        self._explanation_label.setWordWrap(True)
        self._explanation_label.setTextFormat(Qt.RichText)
        self._explanation_label.setStyleSheet(f"font-size: 14px; color: {COLORS['text_primary']}; line-height: 1.3;")
        self._feedback_layout.addWidget(self._explanation_label)

        self._feedback_scroll.setWidget(self._feedback_widget)
        self._layout.addWidget(self._feedback_scroll, 1)  # stretch factor 1

    def _get_input_style(self, state: str) -> str:
        """Get stylesheet for input based on state."""
        if state == "normal":
            return f"""
                QLineEdit {{
                    font-size: 18px;
                    padding: 10px 12px;
                    border: 2px solid {COLORS['border']};
                    border-radius: 8px;
                    background-color: {COLORS['surface']};
                }}
                QLineEdit:focus {{
                    border-color: {COLORS['primary']};
                }}
            """
        elif state == "correct":
            return f"""
                QLineEdit {{
                    font-size: 18px;
                    padding: 10px 12px;
                    background-color: {COLORS['ampel_green_light']};
                    border: 2px solid {COLORS['ampel_green']};
                    border-radius: 8px;
                    font-weight: bold;
                }}
            """
        elif state == "wrong":
            return f"""
                QLineEdit {{
                    font-size: 18px;
                    padding: 10px 12px;
                    background-color: {COLORS['ampel_red_light']};
                    border: 2px solid {COLORS['ampel_red']};
                    border-radius: 8px;
                }}
            """
        return self._get_input_style("normal")

    def render(self, question: RenderedQuestion) -> None:
        """Display the question."""
        self.reset()
        self._question = question

        # Set prompt
        self._prompt_label.setText(question.prompt)

        # Load image if present
        if question.image:
            self._image_widget.load_image(
                question.image,
                region=question.image_region,
                display_width=900,
                widget_height=450
            )

        # Show hint based on answer type
        answer_type = question.payload.get("answer_type", "text")
        if answer_type == "number":
            self._hint_label.setText("Tipp: Komma (3,5) oder Punkt (3.5) als Dezimalzeichen")
            self._input.setPlaceholderText("Zahl eingeben...")
        else:
            self._hint_label.setText("")
            self._input.setPlaceholderText("Antwort eingeben...")

        self._input.setFocus()

    def get_answer(self) -> Any:
        """Return entered text."""
        return self._input.text()

    def show_feedback(self, is_correct: bool, correct_answer: Any, explanation: str) -> None:
        """Show encouraging, educational feedback."""
        self._input.setEnabled(False)

        # Style input based on correctness
        if is_correct:
            self._input.setStyleSheet(self._get_input_style("correct"))
            self._status_label.setText("Richtig!")
            self._status_label.setStyleSheet(
                f"font-size: 18px; font-weight: bold; color: {COLORS['ampel_green']};"
            )
            self._feedback_widget.setStyleSheet(
                f"background-color: {COLORS['ampel_green_light']}; border-radius: 8px;"
            )
        else:
            self._input.setStyleSheet(self._get_input_style("wrong"))
            self._status_label.setText(f"Falsch - Richtige Antwort: {correct_answer}")
            self._status_label.setStyleSheet(
                f"font-size: 18px; font-weight: bold; color: {COLORS['ampel_red']};"
            )
            self._feedback_widget.setStyleSheet(
                f"background-color: {COLORS['ampel_red_light']}; border-radius: 8px;"
            )

        # Set explanation - convert newlines to HTML
        explanation_html = explanation.replace("\n", "<br>")
        self._explanation_label.setText(explanation_html)
        self._explanation_label.setStyleSheet("font-size: 14px; color: #222; background: transparent; line-height: 1.3;")

        self._feedback_scroll.setVisible(True)

    def reset(self) -> None:
        """Clear for next question."""
        self._question = None
        self._input.clear()
        self._input.setEnabled(True)
        self._input.setStyleSheet(self._get_input_style("normal"))
        self._hint_label.clear()
        self._feedback_scroll.setVisible(False)
        self._prompt_label.clear()
        self._image_widget.clear()

    def is_answer_ready(self) -> bool:
        """Check if user has entered an answer."""
        return bool(self._input.text().strip())
