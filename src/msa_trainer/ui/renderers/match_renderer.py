"""MATCH (matching pairs) renderer."""

from pathlib import Path
from typing import Any, Optional

from PySide6.QtCore import Qt
from PySide6.QtWidgets import (
    QComboBox,
    QGridLayout,
    QLabel,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.models import RenderedQuestion
from msa_trainer.ui.renderers.base_renderer import BaseRenderer
from msa_trainer.ui.styles import COLORS, FEEDBACK_CORRECT_STYLE, FEEDBACK_INCORRECT_STYLE
from msa_trainer.ui.widgets.question_image import QuestionImageWidget


class MatchRenderer(BaseRenderer):
    """Renderer for MATCH (matching pairs) questions."""

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._question: Optional[RenderedQuestion] = None
        self._content_pack_path: Optional[Path] = None
        self._combos: list[tuple[str, QComboBox]] = []  # (left_item, combo)
        self._setup_ui()

    def set_content_pack_path(self, path: Path) -> None:
        """Set path for resolving image paths."""
        self._content_pack_path = path
        self._image_widget.set_content_pack_path(path)

    def _setup_ui(self) -> None:
        """Set up the UI."""
        self._layout = QVBoxLayout(self)
        self._layout.setSpacing(16)

        # Question prompt
        self._prompt_label = QLabel()
        self._prompt_label.setWordWrap(True)
        self._prompt_label.setStyleSheet(
            f"font-size: 18px; color: {COLORS['text_primary']}; padding: 16px 0;"
        )
        self._layout.addWidget(self._prompt_label)

        # Question image (hidden by default)
        self._image_widget = QuestionImageWidget()
        self._layout.addWidget(self._image_widget)

        # Matching grid
        self._grid_widget = QWidget()
        self._grid_layout = QGridLayout(self._grid_widget)
        self._grid_layout.setSpacing(12)
        self._layout.addWidget(self._grid_widget)

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

        # Get left and right items
        left_items = question.payload.get("left", [])
        right_items = question.payload.get("right", [])

        # Create matching UI
        for i, left_item in enumerate(left_items):
            # Left label
            left_label = QLabel(left_item)
            left_label.setStyleSheet(
                f"""
                font-size: 16px;
                padding: 10px;
                background-color: {COLORS['surface']};
                border: 2px solid {COLORS['border']};
                border-radius: 4px;
                """
            )
            self._grid_layout.addWidget(left_label, i, 0)

            # Arrow
            arrow = QLabel("→")
            arrow.setStyleSheet(f"font-size: 20px; color: {COLORS['text_secondary']};")
            arrow.setAlignment(Qt.AlignmentFlag.AlignCenter)
            self._grid_layout.addWidget(arrow, i, 1)

            # Combo for right selection
            combo = QComboBox()
            combo.setStyleSheet(
                f"""
                QComboBox {{
                    font-size: 16px;
                    padding: 8px;
                    border: 2px solid {COLORS['border']};
                    border-radius: 4px;
                    min-width: 150px;
                }}
                QComboBox:focus {{
                    border-color: {COLORS['primary']};
                }}
                """
            )
            combo.addItem("-- Auswählen --")
            for right_item in right_items:
                combo.addItem(right_item)

            self._grid_layout.addWidget(combo, i, 2)
            self._combos.append((left_item, combo))

    def get_answer(self) -> Any:
        """Return list of [left, right] pairs."""
        pairs = []
        for left_item, combo in self._combos:
            if combo.currentIndex() > 0:
                pairs.append([left_item, combo.currentText()])
        return pairs

    def show_feedback(self, is_correct: bool, correct_answer: Any, explanation: str) -> None:
        """Show feedback with correct/incorrect styling."""
        # Build correct pairs lookup
        correct_pairs = {pair[0]: pair[1] for pair in correct_answer}

        # Style combos
        for left_item, combo in self._combos:
            combo.setEnabled(False)
            selected = combo.currentText() if combo.currentIndex() > 0 else None
            correct_right = correct_pairs.get(left_item)

            if selected == correct_right:
                combo.setStyleSheet(
                    f"""
                    QComboBox {{
                        font-size: 16px;
                        padding: 8px;
                        background-color: {COLORS['ampel_green_light']};
                        border: 2px solid {COLORS['ampel_green']};
                        border-radius: 4px;
                        min-width: 150px;
                    }}
                    """
                )
            else:
                combo.setStyleSheet(
                    f"""
                    QComboBox {{
                        font-size: 16px;
                        padding: 8px;
                        background-color: {COLORS['ampel_red_light']};
                        border: 2px solid {COLORS['ampel_red']};
                        border-radius: 4px;
                        min-width: 150px;
                    }}
                    """
                )

        # Show explanation
        status = "Alles richtig!" if is_correct else "Einige Zuordnungen sind falsch."
        self._feedback_label.setText(f"<b>{status}</b><br><br>{explanation}")
        self._feedback_widget.setStyleSheet(
            FEEDBACK_CORRECT_STYLE if is_correct else FEEDBACK_INCORRECT_STYLE
        )
        self._feedback_widget.setVisible(True)

    def reset(self) -> None:
        """Clear for next question."""
        self._question = None
        self._combos.clear()

        # Clear grid
        while self._grid_layout.count():
            item = self._grid_layout.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        self._feedback_widget.setVisible(False)
        self._prompt_label.clear()
        self._image_widget.clear()

    def is_answer_ready(self) -> bool:
        """Check if all pairs are matched."""
        for _, combo in self._combos:
            if combo.currentIndex() == 0:
                return False
        return len(self._combos) > 0
