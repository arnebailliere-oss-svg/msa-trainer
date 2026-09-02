"""Start screen - profile selection and creation."""

from typing import Callable, Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtWidgets import (
    QDialog,
    QHBoxLayout,
    QLabel,
    QLineEdit,
    QListWidget,
    QListWidgetItem,
    QPushButton,
    QVBoxLayout,
    QWidget,
)

from msa_trainer.core.models import User
from msa_trainer.ui.styles import CARD_STYLE, COLORS


class CreateProfileDialog(QDialog):
    """Dialog for creating a new profile."""

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self.setWindowTitle("Neues Profil erstellen")
        self.setModal(True)
        self.setMinimumWidth(300)

        self._setup_ui()
        self._name: str = ""

    def _setup_ui(self) -> None:
        """Set up dialog UI."""
        layout = QVBoxLayout(self)
        layout.setSpacing(16)

        # Name input
        label = QLabel("Name:")
        layout.addWidget(label)

        self._name_input = QLineEdit()
        self._name_input.setPlaceholderText("Dein Name...")
        layout.addWidget(self._name_input)

        # Buttons
        btn_layout = QHBoxLayout()
        btn_layout.addStretch()

        cancel_btn = QPushButton("Abbrechen")
        cancel_btn.clicked.connect(self.reject)
        btn_layout.addWidget(cancel_btn)

        create_btn = QPushButton("Erstellen")
        create_btn.clicked.connect(self._on_create)
        btn_layout.addWidget(create_btn)

        layout.addLayout(btn_layout)

    def _on_create(self) -> None:
        """Handle create button."""
        self._name = self._name_input.text().strip()
        if self._name:
            self.accept()

    def get_name(self) -> str:
        """Get entered name."""
        return self._name


class StartView(QWidget):
    """Start screen with profile selection."""

    profile_selected = Signal(str)  # Emits user_id
    new_profile_requested = Signal(str)  # Emits name for new profile

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._users: list[User] = []
        self._setup_ui()

    def _setup_ui(self) -> None:
        """Set up the UI."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(40, 40, 40, 40)
        layout.setSpacing(24)

        # Title - warm, inviting color
        title = QLabel("MSA Trainer Berlin")
        title.setStyleSheet(
            "font-size: 36px; font-weight: bold; color: #2E7D32;"  # Forest green
        )
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(title)

        subtitle = QLabel("Klasse 9 - Vorbereitung auf den MSA")
        subtitle.setStyleSheet("font-size: 16px; color: #546E7A;")  # Blue-grey
        subtitle.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(subtitle)

        layout.addSpacing(20)

        # Profile selection card
        card = QWidget()
        card.setStyleSheet(
            """
            background-color: white;
            border: 1px solid #CFD8DC;
            border-radius: 12px;
            padding: 20px;
            """
        )
        card_layout = QVBoxLayout(card)
        card_layout.setSpacing(16)

        card_title = QLabel("Wähle dein Profil:")
        card_title.setStyleSheet("font-size: 18px; font-weight: bold; color: #37474F;")
        card_layout.addWidget(card_title)

        # Profile list - softer selection colors
        self._profile_list = QListWidget()
        self._profile_list.setStyleSheet(
            """
            QListWidget {
                border: 1px solid #CFD8DC;
                border-radius: 8px;
                background-color: #FAFAFA;
                outline: none;
            }
            QListWidget::item {
                padding: 14px 16px;
                border-bottom: 1px solid #ECEFF1;
                color: #37474F;
                font-size: 16px;
            }
            QListWidget::item:selected {
                background-color: #E8F5E9;
                color: #2E7D32;
                border-left: 4px solid #43A047;
            }
            QListWidget::item:hover:!selected {
                background-color: #F5F5F5;
            }
            """
        )
        self._profile_list.itemDoubleClicked.connect(self._on_profile_selected)
        card_layout.addWidget(self._profile_list)

        # Buttons - clear, visible styling
        btn_layout = QHBoxLayout()
        btn_layout.setSpacing(12)

        new_btn = QPushButton("+ Neues Profil")
        new_btn.setStyleSheet(
            """
            QPushButton {
                background-color: #ECEFF1;
                color: #455A64;
                border: 2px solid #B0BEC5;
                border-radius: 8px;
                padding: 12px 20px;
                font-size: 14px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #CFD8DC;
                border-color: #78909C;
            }
            """
        )
        new_btn.clicked.connect(self._on_new_profile)
        btn_layout.addWidget(new_btn)

        btn_layout.addStretch()

        start_btn = QPushButton("Starten")
        start_btn.setStyleSheet(
            """
            QPushButton {
                background-color: #43A047;
                color: white;
                border: none;
                border-radius: 8px;
                padding: 12px 32px;
                font-size: 16px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #388E3C;
            }
            QPushButton:pressed {
                background-color: #2E7D32;
            }
            """
        )
        start_btn.clicked.connect(self._on_start)
        btn_layout.addWidget(start_btn)

        card_layout.addLayout(btn_layout)

        layout.addWidget(card)
        layout.addStretch()

    def set_users(self, users: list[User]) -> None:
        """Update the profile list."""
        self._users = users
        self._profile_list.clear()

        for user in users:
            item = QListWidgetItem(user.name)
            item.setData(Qt.ItemDataRole.UserRole, user.id)
            self._profile_list.addItem(item)

        if users:
            self._profile_list.setCurrentRow(0)

    def _on_profile_selected(self, item: QListWidgetItem) -> None:
        """Handle double-click on profile."""
        user_id = item.data(Qt.ItemDataRole.UserRole)
        self.profile_selected.emit(user_id)

    def _on_start(self) -> None:
        """Handle start button."""
        item = self._profile_list.currentItem()
        if item:
            user_id = item.data(Qt.ItemDataRole.UserRole)
            self.profile_selected.emit(user_id)

    def _on_new_profile(self) -> None:
        """Handle new profile button."""
        dialog = CreateProfileDialog(self)
        if dialog.exec() == QDialog.DialogCode.Accepted:
            name = dialog.get_name()
            if name:
                self.new_profile_requested.emit(name)
