"""CLOZE (fill-in-the-blank) renderer."""

from pathlib import Path
from typing import Any, Optional

from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QComboBox,
    QHBoxLayout,
    QLabel,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.models import RenderedQuestion
from msa_trainer.ui.renderers.base_renderer import BaseRenderer
from msa_trainer.ui.styles import COLORS, FEEDBACK_CORRECT_STYLE, FEEDBACK_INCORRECT_STYLE
from msa_trainer.ui.widgets.question_image import QuestionImageWidget


class ClozeRenderer(BaseRenderer):
    """Renderer for CLOZE (fill-in-the-blank) questions."""

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
        self._layout.setSpacing(16)

        # Instruction
        self._instruction = QLabel("Fülle die Lücke aus:")
        self._instruction.setStyleSheet(
            f"font-size: 14px; color: {COLORS['text_secondary']};"
        )
        self._layout.addWidget(self._instruction)

        # Question image (hidden by default)
        self._image_widget = QuestionImageWidget()
        self._layout.addWidget(self._image_widget)

        # Sentence with blank
        self._sentence_widget = QWidget()
        self._sentence_layout = QHBoxLayout(self._sentence_widget)
        self._sentence_layout.setContentsMargins(0, 0, 0, 0)
        self._layout.addWidget(self._sentence_widget)

        # Choice dropdown
        self._combo = QComboBox()
        self._combo.setStyleSheet(
            f"""
            QComboBox {{
                font-size: 16px;
                padding: 8px 16px;
                border: 2px solid {COLORS['primary']};
                border-radius: 4px;
                background-color: white;
                min-width: 100px;
            }}
            QComboBox:focus {{
                border-color: {COLORS['primary_dark']};
            }}
            """
        )

        # Labels for sentence parts
        self._before_label = QLabel()
        self._before_label.setStyleSheet(f"font-size: 18px; color: {COLORS['text_primary']};")
        self._after_label = QLabel()
        self._after_label.setStyleSheet(f"font-size: 18px; color: {COLORS['text_primary']};")

        # Feedback area
        self._feedback_widget = QWidget()
        self._feedback_widget.setVisible(False)
        self._feedback_layout = QVBoxLayout(self._feedback_widget)
        self._feedback_label = QLabel()
        self._feedback_label.setWordWrap(True)
        self._feedback_layout.addWidget(self._feedback_label)
        self._layout.addWidget(self._feedback_widget)

        self._layout.addStretch()

    def render(self, question: RenderedQuestion) -> None:
        """Display the question."""
        self.reset()
        self._question = question

        # Load image if present
        if question.image:
            self._image_widget.load_image(
                question.image,
                region=question.image_region,
                display_width=900,
                widget_height=450
            )

        # Parse prompt to find blank position
        prompt = question.prompt
        blank_marker = "{{blank}}"

        if blank_marker in prompt:
            parts = prompt.split(blank_marker, 1)
            before = parts[0]
            after = parts[1] if len(parts) > 1 else ""
        else:
            before = prompt
            after = ""

        # Clear and rebuild sentence layout
        while self._sentence_layout.count():
            item = self._sentence_layout.takeAt(0)
            if item.widget():
                item.widget().setParent(None)

        self._before_label.setText(before)
        self._after_label.setText(after)

        self._sentence_layout.addWidget(self._before_label)
        self._sentence_layout.addWidget(self._combo)
        self._sentence_layout.addWidget(self._after_label)
        self._sentence_layout.addStretch()

        # Populate choices
        choices = question.payload.get("choices", [])
        self._combo.clear()
        self._combo.addItem("-- Auswählen --")
        for choice in choices:
            self._combo.addItem(choice)

    def get_answer(self) -> Any:
        """Return selected choice."""
        if self._combo.currentIndex() == 0:
            return None
        return self._combo.currentText()

    def show_feedback(self, is_correct: bool, correct_answer: Any, explanation: str) -> None:
        """Show feedback with correct/incorrect styling."""
        self._combo.setEnabled(False)

        # Style combo based on correctness
        if is_correct:
            self._combo.setStyleSheet(
                f"""
                QComboBox {{
                    font-size: 16px;
                    padding: 8px 16px;
                    background-color: {COLORS['ampel_green_light']};
                    border: 2px solid {COLORS['ampel_green']};
                    border-radius: 4px;
                    min-width: 100px;
                }}
                """
            )
        else:
            self._combo.setStyleSheet(
                f"""
                QComboBox {{
                    font-size: 16px;
                    padding: 8px 16px;
                    background-color: {COLORS['ampel_red_light']};
                    border: 2px solid {COLORS['ampel_red']};
                    border-radius: 4px;
                    min-width: 100px;
                }}
                """
            )

        # Show explanation
        status = "Richtig!" if is_correct else f"Leider falsch. Richtig: {correct_answer}"
        self._feedback_label.setText(f"<b>{status}</b><br><br>{explanation}")
        self._feedback_widget.setStyleSheet(
            FEEDBACK_CORRECT_STYLE if is_correct else FEEDBACK_INCORRECT_STYLE
        )
        self._feedback_widget.setVisible(True)

    def reset(self) -> None:
        """Clear for next question."""
        self._question = None
        self._combo.clear()
        self._combo.setEnabled(True)
        self._combo.setStyleSheet(
            f"""
            QComboBox {{
                font-size: 16px;
                padding: 8px 16px;
                border: 2px solid {COLORS['primary']};
                border-radius: 4px;
                background-color: white;
                min-width: 100px;
            }}
            """
        )
        self._before_label.clear()
        self._after_label.clear()
        self._feedback_widget.setVisible(False)
        self._image_widget.clear()

    def is_answer_ready(self) -> bool:
        """Check if user has selected an answer."""
        return self._combo.currentIndex() > 0
