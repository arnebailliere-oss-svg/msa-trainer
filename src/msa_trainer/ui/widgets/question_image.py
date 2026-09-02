"""Widget for displaying question images with optional cropping."""

from pathlib import Path
from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtGui import QPixmap, QPainter, QImage
from PySide6.QtWidgets import (
    QLabel,
    QVBoxLayout,
    QWidget,
    QScrollArea,
    QSizePolicy,
)


class QuestionImageWidget(QWidget):
    """
    Widget to display an image associated with a question.

    Supports:
    - Loading images from file paths
    - Optional cropping via image_region
    - Automatic scaling to fit container
    - Click to zoom (optional)
    """

    clicked = Signal()  # Emitted when image is clicked

    def __init__(self, parent: Optional[QWidget] = None):
        super().__init__(parent)
        self._setup_ui()
        self._current_pixmap: Optional[QPixmap] = None
        self._content_pack_path: Optional[Path] = None

    def _setup_ui(self) -> None:
        """Initialize the UI components."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)

        # Scrollable container for large images
        self._scroll_area = QScrollArea()
        self._scroll_area.setWidgetResizable(True)
        self._scroll_area.setHorizontalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAsNeeded)
        self._scroll_area.setVerticalScrollBarPolicy(Qt.ScrollBarPolicy.ScrollBarAsNeeded)
        self._scroll_area.setStyleSheet("""
            QScrollArea {
                border: 1px solid #ccc;
                border-radius: 4px;
                background-color: #f9f9f9;
            }
        """)

        # Image label
        self._image_label = QLabel()
        self._image_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        self._image_label.setSizePolicy(QSizePolicy.Policy.Expanding, QSizePolicy.Policy.Expanding)
        self._image_label.setStyleSheet("QLabel { background-color: transparent; }")

        self._scroll_area.setWidget(self._image_label)
        layout.addWidget(self._scroll_area)

        # Initially hidden
        self.setVisible(False)

    def set_content_pack_path(self, path: Path) -> None:
        """Set the base path for content pack (for resolving relative image paths)."""
        self._content_pack_path = path

    def load_image(
        self,
        image_path: str,
        region: Optional[tuple[int, int, int, int]] = None,
        display_width: int = 900,
        widget_height: int = 500,
        **kwargs  # ignore legacy params
    ) -> bool:
        """
        Load and display an image.

        Args:
            image_path: Path to image (relative to content pack or absolute)
            region: Optional (x0, y0, x1, y1) crop region in pixels
            display_width: Target display width (height scales proportionally)
            widget_height: Fixed height of the widget (scrollable for larger images)

        Returns:
            True if image loaded successfully
        """
        # Resolve path
        if self._content_pack_path and not Path(image_path).is_absolute():
            full_path = self._content_pack_path / image_path
        else:
            full_path = Path(image_path)

        if not full_path.exists():
            self.clear()
            return False

        # Load image
        pixmap = QPixmap(str(full_path))
        if pixmap.isNull():
            self.clear()
            return False

        # Crop if region specified
        if region:
            x0, y0, x1, y1 = region
            pixmap = pixmap.copy(x0, y0, x1 - x0, y1 - y0)

        # Scale to fit display width while maintaining aspect ratio
        if pixmap.width() > display_width:
            pixmap = pixmap.scaledToWidth(
                display_width,
                Qt.TransformationMode.SmoothTransformation
            )
        elif pixmap.width() < display_width * 0.8:
            # Scale up small images to be more readable
            pixmap = pixmap.scaledToWidth(
                display_width,
                Qt.TransformationMode.SmoothTransformation
            )

        self._current_pixmap = pixmap
        self._image_label.setPixmap(pixmap)
        self._image_label.setMinimumSize(pixmap.size())
        self.setVisible(True)
        self.setFixedHeight(widget_height)
        return True

    def clear(self) -> None:
        """Clear the displayed image."""
        self._current_pixmap = None
        self._image_label.clear()
        self.setVisible(False)

    def has_image(self) -> bool:
        """Check if an image is currently loaded."""
        return self._current_pixmap is not None

    def mousePressEvent(self, event) -> None:
        """Handle mouse click for zoom functionality."""
        if self._current_pixmap:
            self.clicked.emit()
        super().mousePressEvent(event)


class ZoomableImageDialog(QWidget):
    """A popup dialog for viewing images at full size."""

    def __init__(self, pixmap: QPixmap, parent: Optional[QWidget] = None):
        super().__init__(parent, Qt.WindowType.Dialog)
        self.setWindowTitle("Bild - Klicken zum Schließen")
        self.setMinimumSize(400, 300)

        layout = QVBoxLayout(self)

        scroll = QScrollArea()
        scroll.setWidgetResizable(True)

        label = QLabel()
        label.setPixmap(pixmap)
        label.setAlignment(Qt.AlignmentFlag.AlignCenter)

        scroll.setWidget(label)
        layout.addWidget(scroll)

        # Close on click
        label.mousePressEvent = lambda e: self.close()

    def keyPressEvent(self, event) -> None:
        """Close on Escape key."""
        if event.key() == Qt.Key.Key_Escape:
            self.close()
        super().keyPressEvent(event)
