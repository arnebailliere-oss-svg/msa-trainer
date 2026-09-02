"""Result view - session summary and recommendations."""

from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import (
    QHBoxLayout,
    QLabel,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.models import SessionStats
from msa_trainer.ui.styles import CARD_STYLE, COLORS


class ResultView(QWidget):
    """Session results and recommendations."""

    continue_training = Signal()
    return_to_dashboard = Signal()

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._setup_ui()

    def _setup_ui(self) -> None:
        """Set up the UI."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(40, 40, 40, 40)
        layout.setSpacing(24)

        # Title
        title = QLabel("Training abgeschlossen!")
        title.setStyleSheet(
            f"font-size: 28px; font-weight: bold; color: {COLORS['primary']};"
        )
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(title)

        # Stats card
        stats_card = QWidget()
        stats_card.setStyleSheet(CARD_STYLE)
        stats_layout = QVBoxLayout(stats_card)

        self._stats_title = QLabel("Deine Ergebnisse")
        self._stats_title.setStyleSheet("font-size: 18px; font-weight: bold;")
        stats_layout.addWidget(self._stats_title)

        # Stats grid
        self._stats_container = QVBoxLayout()
        stats_layout.addLayout(self._stats_container)

        layout.addWidget(stats_card)

        # Recommendations card
        rec_card = QWidget()
        rec_card.setStyleSheet(CARD_STYLE)
        rec_layout = QVBoxLayout(rec_card)

        rec_title = QLabel("Empfehlung")
        rec_title.setStyleSheet("font-size: 18px; font-weight: bold;")
        rec_layout.addWidget(rec_title)

        self._recommendation_label = QLabel()
        self._recommendation_label.setWordWrap(True)
        self._recommendation_label.setStyleSheet(f"color: {COLORS['text_secondary']};")
        rec_layout.addWidget(self._recommendation_label)

        layout.addWidget(rec_card)

        layout.addStretch()

        # Buttons
        btn_layout = QHBoxLayout()

        dashboard_btn = QPushButton("Zurück zum Dashboard")
        dashboard_btn.setProperty("class", "secondary")
        dashboard_btn.clicked.connect(self.return_to_dashboard.emit)
        btn_layout.addWidget(dashboard_btn)

        btn_layout.addStretch()

        continue_btn = QPushButton("Weiter trainieren")
        continue_btn.clicked.connect(self.continue_training.emit)
        btn_layout.addWidget(continue_btn)

        layout.addLayout(btn_layout)

    def show_results(self, stats: SessionStats) -> None:
        """Display session statistics."""
        # Clear existing stats
        while self._stats_container.count():
            item = self._stats_container.takeAt(0)
            if item.widget():
                item.widget().deleteLater()

        # Calculate hit rate
        hit_rate = (stats.correct_count / stats.total_questions * 100) if stats.total_questions > 0 else 0

        # Format time
        minutes = stats.total_time_ms // 60000
        seconds = (stats.total_time_ms % 60000) // 1000

        # Add stats
        stats_data = [
            ("Richtige Antworten", f"{stats.correct_count} / {stats.total_questions}"),
            ("Trefferquote", f"{hit_rate:.0f}%"),
            ("Zeit", f"{minutes}:{seconds:02d} min"),
            ("Themen geübt", str(len(stats.topics_practiced))),
        ]

        for label, value in stats_data:
            row = QHBoxLayout()
            label_widget = QLabel(label)
            label_widget.setStyleSheet(f"color: {COLORS['text_secondary']};")
            row.addWidget(label_widget)

            row.addStretch()

            value_widget = QLabel(value)
            value_widget.setStyleSheet("font-weight: bold;")
            row.addWidget(value_widget)

            self._stats_container.addLayout(row)

        # Recommendation
        if hit_rate >= 80:
            rec = "Super gemacht! Du bist auf einem guten Weg. Versuche, die schwierigeren Themen zu üben."
        elif hit_rate >= 50:
            rec = "Gut! Wiederhole die Themen, bei denen du unsicher warst."
        else:
            rec = "Übe weiter! Konzentriere dich auf die Grundlagen und wiederhole die Themen öfter."

        if stats.weak_topics:
            rec += f"\n\nFokussiere dich auf: {', '.join(stats.weak_topics[:2])}"

        self._recommendation_label.setText(rec)
