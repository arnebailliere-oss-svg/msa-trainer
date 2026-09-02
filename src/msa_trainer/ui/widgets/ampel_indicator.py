"""Traffic light (Ampel) indicator widget."""

from PySide6.QtCore import Qt
from PySide6.QtWidgets import QLabel, QWidget

from msa_trainer.core.enums import AmpelState
from msa_trainer.ui.styles import AMPEL_STYLES, COLORS


class AmpelIndicator(QWidget):
    """A traffic light indicator showing mastery level."""

    def __init__(
        self, state: AmpelState = AmpelState.RED, size: int = 20, parent: QWidget | None = None
    ) -> None:
        super().__init__(parent)
        self._state = state
        self._size = size
        self._setup_ui()
        self._update_style()

    def _setup_ui(self) -> None:
        """Set up the indicator."""
        self._indicator = QLabel(self)
        self._indicator.setFixedSize(self._size, self._size)
        self._indicator.setAlignment(Qt.AlignmentFlag.AlignCenter)

    def set_state(self, state: AmpelState) -> None:
        """Update the indicator state."""
        self._state = state
        self._update_style()

    def get_state(self) -> AmpelState:
        """Get current state."""
        return self._state

    def _update_style(self) -> None:
        """Update the visual style based on state."""
        style = AMPEL_STYLES.get(self._state.value, AMPEL_STYLES["RED"])
        self._indicator.setStyleSheet(style)

    def sizeHint(self):
        """Return preferred size."""
        from PySide6.QtCore import QSize
        return QSize(self._size, self._size)


class AmpelWithLabel(QWidget):
    """Ampel indicator with topic name label."""

    def __init__(
        self,
        topic_name: str,
        state: AmpelState = AmpelState.RED,
        parent: QWidget | None = None,
    ) -> None:
        super().__init__(parent)
        self._setup_ui(topic_name, state)

    def _setup_ui(self, topic_name: str, state: AmpelState) -> None:
        """Set up the widget."""
        from PySide6.QtWidgets import QHBoxLayout

        layout = QHBoxLayout(self)
        layout.setContentsMargins(4, 4, 4, 4)
        layout.setSpacing(8)

        self._ampel = AmpelIndicator(state)
        layout.addWidget(self._ampel)

        self._label = QLabel(topic_name)
        self._label.setStyleSheet(f"color: {COLORS['text_primary']}; font-size: 14px;")
        layout.addWidget(self._label, 1)

    def set_state(self, state: AmpelState) -> None:
        """Update the ampel state."""
        self._ampel.set_state(state)

    def set_topic_name(self, name: str) -> None:
        """Update the topic name."""
        self._label.setText(name)
