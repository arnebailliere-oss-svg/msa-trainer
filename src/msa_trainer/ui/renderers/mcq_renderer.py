"""MCQ (Multiple Choice Question) renderer."""

import random
from pathlib import Path
from typing import Any, Optional

from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QButtonGroup,
    QFrame,
    QLabel,
    QRadioButton,
    QScrollArea,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.models import RenderedQuestion
from msa_trainer.ui.renderers.base_renderer import BaseRenderer
from msa_trainer.ui.styles import COLORS
from msa_trainer.ui.widgets.question_image import QuestionImageWidget


class MCQRenderer(BaseRenderer):
    """Renderer for Multiple Choice Questions with enhanced feedback."""

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._question: Optional[RenderedQuestion] = None
        self._choices: list[str] = []
        self._choice_buttons: list[QRadioButton] = []
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

        # Choices container - compact
        self._choices_widget = QWidget()
        self._choices_layout = QVBoxLayout(self._choices_widget)
        self._choices_layout.setSpacing(6)
        self._choices_layout.setContentsMargins(0, 0, 0, 0)
        self._layout.addWidget(self._choices_widget)

        # Button group for radio buttons
        self._button_group = QButtonGroup(self)

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

        # Explanation section - the main content
        self._explanation_label = QLabel()
        self._explanation_label.setWordWrap(True)
        self._explanation_label.setTextFormat(Qt.RichText)
        self._explanation_label.setStyleSheet(f"font-size: 14px; color: {COLORS['text_primary']}; line-height: 1.3;")
        self._feedback_layout.addWidget(self._explanation_label)

        self._feedback_scroll.setWidget(self._feedback_widget)
        self._layout.addWidget(self._feedback_scroll, 1)  # stretch factor 1 to take remaining space

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

        # Get and optionally shuffle choices
        self._choices = question.payload.get("choices", []).copy()
        if question.payload.get("shuffle", True):
            random.shuffle(self._choices)

        # Create choice buttons with letters (A, B, C, D) - compact
        letters = ["A", "B", "C", "D", "E", "F"]
        for i, choice in enumerate(self._choices):
            letter = letters[i] if i < len(letters) else str(i + 1)
            btn = QRadioButton(f" {letter}) {choice}")
            btn.setStyleSheet(self._get_choice_style("normal"))
            self._choice_buttons.append(btn)
            self._button_group.addButton(btn, i)
            self._choices_layout.addWidget(btn)

    def _get_choice_style(self, state: str) -> str:
        """Get stylesheet for choice button based on state."""
        base = f"""
            QRadioButton {{
                font-size: 14px;
                padding: 10px 12px;
                background-color: {COLORS['surface']};
                border: 2px solid {COLORS['border']};
                border-radius: 8px;
                spacing: 8px;
            }}
            QRadioButton::indicator {{
                width: 16px;
                height: 16px;
            }}
        """

        if state == "normal":
            return base + f"""
                QRadioButton:hover {{
                    border-color: {COLORS['primary']};
                    background-color: {COLORS['primary']}10;
                }}
                QRadioButton:checked {{
                    border-color: {COLORS['primary']};
                    background-color: {COLORS['primary']}20;
                }}
            """
        elif state == "correct":
            return f"""
                QRadioButton {{
                    font-size: 14px;
                    padding: 10px 12px;
                    background-color: {COLORS['ampel_green_light']};
                    border: 2px solid {COLORS['ampel_green']};
                    border-radius: 8px;
                    font-weight: bold;
                }}
            """
        elif state == "wrong":
            return f"""
                QRadioButton {{
                    font-size: 14px;
                    padding: 10px 12px;
                    background-color: {COLORS['ampel_red_light']};
                    border: 2px solid {COLORS['ampel_red']};
                    border-radius: 8px;
                    text-decoration: line-through;
                }}
            """
        elif state == "disabled":
            return f"""
                QRadioButton {{
                    font-size: 14px;
                    padding: 10px 12px;
                    background-color: {COLORS['background']};
                    border: 2px solid {COLORS['border']};
                    border-radius: 8px;
                    color: {COLORS['text_secondary']};
                }}
            """
        return base

    def get_answer(self) -> Any:
        """Return selected choice (without the letter prefix)."""
        checked_btn = self._button_group.checkedButton()
        if checked_btn:
            # Extract the actual choice text (remove " A) " prefix)
            text = checked_btn.text()
            # Find the ") " and get everything after
            idx = text.find(") ")
            if idx != -1:
                return text[idx + 2:]
            return text
        return None

    def show_feedback(self, is_correct: bool, correct_answer: Any, explanation: str) -> None:
        """Show encouraging, educational feedback."""
        # Style the choice buttons based on correctness
        for btn in self._choice_buttons:
            btn_text = btn.text()
            idx = btn_text.find(") ")
            choice_text = btn_text[idx + 2:] if idx != -1 else btn_text

            if choice_text == correct_answer:
                btn.setStyleSheet(self._get_choice_style("correct"))
            elif btn.isChecked() and not is_correct:
                btn.setStyleSheet(self._get_choice_style("wrong"))
            else:
                btn.setStyleSheet(self._get_choice_style("disabled"))
            btn.setEnabled(False)

        # Set status and colors
        if is_correct:
            self._status_label.setText("Richtig!")
            self._status_label.setStyleSheet(
                f"font-size: 18px; font-weight: bold; color: {COLORS['ampel_green']};"
            )
            self._feedback_widget.setStyleSheet(
                f"background-color: {COLORS['ampel_green_light']}; border-radius: 8px;"
            )
        else:
            self._status_label.setText(f"Falsch - Richtige Antwort: {correct_answer}")
            self._status_label.setStyleSheet(
                f"font-size: 18px; font-weight: bold; color: {COLORS['ampel_red']};"
            )
            self._feedback_widget.setStyleSheet(
                f"background-color: {COLORS['ampel_red_light']}; border-radius: 8px;"
            )

        # Build explanation - convert newlines to HTML
        explanation_html = explanation.replace("\n", "<br>")
        self._explanation_label.setText(explanation_html)
        self._explanation_label.setStyleSheet("font-size: 14px; color: #222; background: transparent; line-height: 1.3;")

        self._feedback_scroll.setVisible(True)

    def reset(self) -> None:
        """Clear for next question."""
        self._question = None
        self._choices = []

        # Remove old buttons
        for btn in self._choice_buttons:
            self._button_group.removeButton(btn)
            btn.deleteLater()
        self._choice_buttons.clear()

        self._feedback_scroll.setVisible(False)
        self._prompt_label.clear()
        self._image_widget.clear()

    def is_answer_ready(self) -> bool:
        """Check if user has selected an answer."""
        return self._button_group.checkedButton() is not None
