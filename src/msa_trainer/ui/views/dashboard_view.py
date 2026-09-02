"""Dashboard view - main training hub."""

from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import (
    QHBoxLayout,
    QLabel,
    QPushButton,
    QScrollArea,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.enums import AmpelState, Subject
from msa_trainer.core.models import MasteryState, Topic, User
from msa_trainer.ui.styles import CARD_STYLE, COLORS, SUBJECT_BUTTON_STYLES
from msa_trainer.ui.widgets.ampel_indicator import AmpelWithLabel


class DashboardView(QWidget):
    """Dashboard with subject buttons and topic overview."""

    quick_training_requested = Signal(Subject)  # Start quick training
    topic_training_requested = Signal(str)  # Start topic training (topic_id)
    parent_view_requested = Signal()

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._user: Optional[User] = None
        self._topics: list[Topic] = []
        self._mastery_states: dict[str, MasteryState] = {}
        self._setup_ui()

    def _setup_ui(self) -> None:
        """Set up the UI."""
        main_layout = QVBoxLayout(self)
        main_layout.setContentsMargins(24, 24, 24, 24)
        main_layout.setSpacing(20)

        # Header
        header = QHBoxLayout()

        self._welcome_label = QLabel("Willkommen!")
        self._welcome_label.setStyleSheet(
            f"font-size: 24px; font-weight: bold; color: {COLORS['text_primary']};"
        )
        header.addWidget(self._welcome_label)

        header.addStretch()

        parent_btn = QPushButton("Elternbereich")
        parent_btn.setProperty("class", "secondary")
        parent_btn.clicked.connect(self.parent_view_requested.emit)
        header.addWidget(parent_btn)

        main_layout.addLayout(header)

        # Subject buttons
        subject_layout = QHBoxLayout()
        subject_layout.setSpacing(16)

        for subject, name in [(Subject.MATH, "Mathe"), (Subject.DE, "Deutsch"), (Subject.EN, "Englisch")]:
            btn = QPushButton(name)
            btn.setMinimumHeight(60)
            btn.setStyleSheet(SUBJECT_BUTTON_STYLES[subject.value])
            btn.clicked.connect(lambda checked, s=subject: self.quick_training_requested.emit(s))
            subject_layout.addWidget(btn)

        main_layout.addLayout(subject_layout)

        # Quick training button
        quick_btn = QPushButton("Quick Training starten")
        quick_btn.setMinimumHeight(50)
        quick_btn.setStyleSheet(
            f"""
            QPushButton {{
                background-color: {COLORS['success']};
                font-size: 18px;
            }}
            QPushButton:hover {{
                background-color: #2E7D32;
            }}
            """
        )
        quick_btn.clicked.connect(lambda: self.quick_training_requested.emit(Subject.MATH))
        main_layout.addWidget(quick_btn)

        # Focus topics card
        focus_card = QWidget()
        focus_card.setStyleSheet(CARD_STYLE + f" QLabel {{ color: {COLORS['text_primary']}; }}")
        focus_layout = QVBoxLayout(focus_card)

        focus_title = QLabel("Top 3 Fokus-Themen")
        focus_title.setStyleSheet(f"font-size: 18px; font-weight: bold; color: {COLORS['text_primary']};")
        focus_layout.addWidget(focus_title)

        self._focus_container = QVBoxLayout()
        focus_layout.addLayout(self._focus_container)

        main_layout.addWidget(focus_card)

        # Topic overview
        overview_card = QWidget()
        overview_card.setStyleSheet(CARD_STYLE + f" QLabel {{ color: {COLORS['text_primary']}; }}")
        overview_layout = QVBoxLayout(overview_card)

        overview_title = QLabel("Themenübersicht")
        overview_title.setStyleSheet(f"font-size: 18px; font-weight: bold; color: {COLORS['text_primary']};")
        overview_layout.addWidget(overview_title)

        # Scrollable topic list
        scroll = QScrollArea()
        scroll.setWidgetResizable(True)
        scroll.setStyleSheet("QScrollArea { border: none; }")

        self._topic_container = QWidget()
        self._topic_layout = QVBoxLayout(self._topic_container)
        self._topic_layout.setSpacing(8)

        scroll.setWidget(self._topic_container)
        overview_layout.addWidget(scroll)

        main_layout.addWidget(overview_card, 1)

    def set_user(self, user: User) -> None:
        """Set current user."""
        self._user = user
        self._welcome_label.setText(f"Willkommen, {user.name}!")

    def set_topics(self, topics: list[Topic]) -> None:
        """Set available topics."""
        self._topics = topics
        self._update_topic_display()

    def set_mastery_states(self, states: dict[str, MasteryState]) -> None:
        """Set mastery states for all topics."""
        self._mastery_states = states
        self._update_topic_display()

    def _update_topic_display(self) -> None:
        """Update topic display with ampel indicators."""
        # Clear existing
        while self._topic_layout.count():
            item = self._topic_layout.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        while self._focus_container.count():
            item = self._focus_container.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        # Calculate ampel states and find focus topics
        topic_ampels: list[tuple[Topic, AmpelState]] = []

        for topic in self._topics:
            mastery = self._mastery_states.get(topic.id)
            if mastery:
                from msa_trainer.core.mastery_engine import MasteryEngine
                ampel = MasteryEngine.compute_ampel(mastery.mastery_score, mastery.stability)
            else:
                ampel = AmpelState.RED  # Unpracticed = red
            topic_ampels.append((topic, ampel))

        # Focus topics: top 3 red/yellow sorted by weakness
        focus_topics = [
            (t, a) for t, a in topic_ampels
            if a in (AmpelState.RED, AmpelState.YELLOW)
        ][:3]

        for topic, ampel in focus_topics:
            indicator = AmpelWithLabel(topic.name, ampel)
            self._focus_container.addWidget(indicator)

        if not focus_topics:
            no_focus = QLabel("Keine Fokus-Themen - weiter so!")
            no_focus.setStyleSheet(f"color: {COLORS['text_secondary']};")
            self._focus_container.addWidget(no_focus)

        # All topics
        for topic, ampel in topic_ampels:
            indicator = AmpelWithLabel(topic.name, ampel)
            self._topic_layout.addWidget(indicator)

        self._topic_layout.addStretch()
