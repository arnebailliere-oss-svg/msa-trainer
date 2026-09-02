"""Session view - training session with questions."""

from pathlib import Path
from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import (
    QHBoxLayout,
    QLabel,
    QProgressBar,
    QPushButton,
    QSplitter,
    QStackedWidget,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.content.hilfen_mapper import get_pdf_path
from msa_trainer.core.enums import QuestionType, Subject
from msa_trainer.core.models import AttemptResult, RenderedQuestion
from msa_trainer.ui.renderers.base_renderer import BaseRenderer
from msa_trainer.ui.renderers.cloze_renderer import ClozeRenderer
from msa_trainer.ui.renderers.match_renderer import MatchRenderer
from msa_trainer.ui.renderers.mcq_renderer import MCQRenderer
from msa_trainer.ui.renderers.short_renderer import ShortRenderer
from msa_trainer.ui.styles import COLORS
from msa_trainer.ui.widgets.calculator_widget import CalculatorWidget
from msa_trainer.ui.widgets.pdf_viewer import PdfViewerWidget


# Renderer registry
RENDERERS: dict[QuestionType, type[BaseRenderer]] = {
    QuestionType.MCQ: MCQRenderer,
    QuestionType.CLOZE: ClozeRenderer,
    QuestionType.MATCH: MatchRenderer,
    QuestionType.SHORT: ShortRenderer,
}


class SessionView(QWidget):
    """Training session view."""

    answer_submitted = Signal(object)  # User answer
    next_requested = Signal()
    exit_requested = Signal()

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._current_question: Optional[RenderedQuestion] = None
        self._renderers: dict[QuestionType, BaseRenderer] = {}
        self._is_feedback_shown = False
        self._setup_ui()

    def _setup_ui(self) -> None:
        """Set up the UI."""
        main_layout = QHBoxLayout(self)
        main_layout.setContentsMargins(0, 0, 0, 0)
        main_layout.setSpacing(0)

        # Main content area
        content = QWidget()
        content_layout = QVBoxLayout(content)
        content_layout.setContentsMargins(24, 24, 24, 24)
        content_layout.setSpacing(16)

        # Header
        header = QHBoxLayout()

        self._subject_label = QLabel()
        self._subject_label.setStyleSheet(
            f"font-size: 14px; color: {COLORS['text_secondary']};"
        )
        header.addWidget(self._subject_label)

        header.addStretch()

        self._progress_label = QLabel()
        self._progress_label.setStyleSheet(f"color: {COLORS['text_secondary']};")
        header.addWidget(self._progress_label)

        exit_btn = QPushButton("Beenden")
        exit_btn.setProperty("class", "secondary")
        exit_btn.clicked.connect(self.exit_requested.emit)
        header.addWidget(exit_btn)

        content_layout.addLayout(header)

        # Progress bar
        self._progress_bar = QProgressBar()
        self._progress_bar.setTextVisible(False)
        self._progress_bar.setMaximumHeight(8)
        content_layout.addWidget(self._progress_bar)

        # Question renderer stack
        self._renderer_stack = QStackedWidget()

        for qtype, renderer_class in RENDERERS.items():
            renderer = renderer_class()
            self._renderers[qtype] = renderer
            self._renderer_stack.addWidget(renderer)

        content_layout.addWidget(self._renderer_stack, 1)

        # Footer with buttons
        footer = QHBoxLayout()

        # Hilfe button (shown after wrong answers)
        self._hilfe_btn = QPushButton("Hilfe anzeigen")
        self._hilfe_btn.setMinimumWidth(130)
        self._hilfe_btn.setVisible(False)
        self._hilfe_btn.setStyleSheet(
            """
            QPushButton {
                background-color: #E3F2FD;
                color: #1565C0;
                border: 2px solid #90CAF9;
                border-radius: 6px;
                padding: 8px 16px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #BBDEFB;
                border-color: #64B5F6;
            }
            """
        )
        self._hilfe_btn.clicked.connect(self._on_hilfe_clicked)
        footer.addWidget(self._hilfe_btn)

        footer.addStretch()

        self._submit_btn = QPushButton("Antwort prüfen")
        self._submit_btn.setMinimumWidth(150)
        self._submit_btn.clicked.connect(self._on_submit)
        footer.addWidget(self._submit_btn)

        self._next_btn = QPushButton("Weiter")
        self._next_btn.setMinimumWidth(150)
        self._next_btn.setVisible(False)
        self._next_btn.clicked.connect(self._on_next)
        footer.addWidget(self._next_btn)

        content_layout.addLayout(footer)

        main_layout.addWidget(content, 1)

        # Hilfe panel (collapsible, shown when help is requested)
        self._hilfe_panel = QWidget()
        self._hilfe_panel.setStyleSheet(
            f"background-color: {COLORS['surface']}; border-left: 1px solid {COLORS['border']};"
        )
        hilfe_layout = QVBoxLayout(self._hilfe_panel)
        hilfe_layout.setContentsMargins(0, 0, 0, 0)

        self._hilfe_viewer = PdfViewerWidget()
        self._hilfe_viewer.closed.connect(self._on_hilfe_closed)
        hilfe_layout.addWidget(self._hilfe_viewer)

        self._hilfe_panel.setFixedWidth(450)
        self._hilfe_panel.setVisible(False)
        main_layout.addWidget(self._hilfe_panel)

        # Calculator panel (only for math)
        self._calculator_panel = QWidget()
        self._calculator_panel.setStyleSheet(
            f"background-color: {COLORS['surface']}; border-left: 1px solid {COLORS['border']};"
        )
        calc_layout = QVBoxLayout(self._calculator_panel)

        calc_title = QLabel("Rechner")
        calc_title.setStyleSheet("font-size: 16px; font-weight: bold;")
        calc_layout.addWidget(calc_title)

        self._calculator = CalculatorWidget()
        calc_layout.addWidget(self._calculator)
        calc_layout.addStretch()

        self._calculator_panel.setFixedWidth(250)
        self._calculator_panel.setVisible(False)
        main_layout.addWidget(self._calculator_panel)

    def show_question(self, question: RenderedQuestion, progress: tuple[int, int]) -> None:
        """Display a question."""
        self._current_question = question
        self._is_feedback_shown = False

        # Hide help panel from previous question
        self._hilfe_panel.setVisible(False)
        self._hilfe_btn.setVisible(False)

        # Update header
        subject_names = {Subject.MATH: "Mathematik", Subject.DE: "Deutsch", Subject.EN: "Englisch"}
        self._subject_label.setText(subject_names.get(question.subject, ""))

        # Update progress
        current, total = progress
        self._progress_label.setText(f"Frage {current + 1} von {total}")
        self._progress_bar.setMaximum(total)
        self._progress_bar.setValue(current)

        # Show calculator for math
        self._calculator_panel.setVisible(question.subject == Subject.MATH)
        if question.subject == Subject.MATH:
            self._calculator.clear()

        # Select and render with correct renderer
        renderer = self._renderers.get(question.qtype)
        if renderer:
            renderer.render(question)
            self._renderer_stack.setCurrentWidget(renderer)

        # Reset buttons
        self._submit_btn.setVisible(True)
        self._submit_btn.setEnabled(True)
        self._next_btn.setVisible(False)

    def show_feedback(self, result: AttemptResult) -> None:
        """Show feedback after answer submission."""
        self._is_feedback_shown = True

        renderer = self._renderers.get(self._current_question.qtype)
        if renderer:
            renderer.show_feedback(
                result.is_correct,
                result.correct_answer,
                result.explanation,
            )

        # Update buttons
        self._submit_btn.setVisible(False)
        self._next_btn.setVisible(True)

        # Show Hilfe button if answer was wrong and help is available
        if not result.is_correct and self._current_question:
            topic_id = self._current_question.topic_id
            pdf_path = get_pdf_path(topic_id, "Hilfen")
            self._hilfe_btn.setVisible(pdf_path is not None)
        else:
            self._hilfe_btn.setVisible(False)

    def _on_submit(self) -> None:
        """Handle submit button."""
        if not self._current_question:
            return

        renderer = self._renderers.get(self._current_question.qtype)
        if renderer and renderer.is_answer_ready():
            answer = renderer.get_answer()
            self.answer_submitted.emit(answer)

    def _on_next(self) -> None:
        """Handle next button."""
        self._hilfe_panel.setVisible(False)
        self._hilfe_btn.setVisible(False)
        self.next_requested.emit()

    def _on_hilfe_clicked(self) -> None:
        """Handle Hilfe button click - show help panel."""
        if not self._current_question:
            return

        topic_id = self._current_question.topic_id
        pdf_path = get_pdf_path(topic_id, "Hilfen")

        if pdf_path:
            self._hilfe_viewer.load_pdf(pdf_path)
            self._hilfe_panel.setVisible(True)
            self._hilfe_btn.setText("Hilfe ausblenden")
            self._hilfe_btn.clicked.disconnect()
            self._hilfe_btn.clicked.connect(self._on_hilfe_closed)

    def _on_hilfe_closed(self) -> None:
        """Handle Hilfe panel close."""
        self._hilfe_panel.setVisible(False)
        self._hilfe_btn.setText("Hilfe anzeigen")
        self._hilfe_btn.clicked.disconnect()
        self._hilfe_btn.clicked.connect(self._on_hilfe_clicked)

    def set_content_pack_path(self, path: Path) -> None:
        """Set the content pack path for image resolution."""
        for renderer in self._renderers.values():
            if hasattr(renderer, "set_content_pack_path"):
                renderer.set_content_pack_path(path)

    def reset(self) -> None:
        """Reset all renderers."""
        for renderer in self._renderers.values():
            renderer.reset()
        self._current_question = None
        self._is_feedback_shown = False
        self._hilfe_panel.setVisible(False)
        self._hilfe_btn.setVisible(False)
