"""PDF viewer widget for displaying help cards."""

from pathlib import Path
from typing import Optional

from PySide6.QtCore import Qt, Signal
from PySide6.QtGui import QFont
from PySide6.QtWidgets import (
    QComboBox,
    QHBoxLayout,
    QLabel,
    QPushButton,
    QScrollArea,
    QVBoxLayout,
    QWidget,
)

# Try to import QtPdf - it may not be available on all systems
try:
    from PySide6.QtPdf import QPdfDocument
    from PySide6.QtPdfWidgets import QPdfView

    PDF_SUPPORT = True
except ImportError:
    PDF_SUPPORT = False


class PdfViewerWidget(QWidget):
    """Widget for viewing PDF help cards.

    Falls back to a message if QtPdf is not available.
    """

    closed = Signal()
    page_changed = Signal(int)  # Emits current page number

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._current_path: Path | None = None
        self._setup_ui()

    def _setup_ui(self) -> None:
        """Set up the UI."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(0, 0, 0, 0)
        layout.setSpacing(8)

        # Header with title and close button
        header = QWidget()
        header.setStyleSheet(
            """
            background-color: #E3F2FD;
            border-bottom: 1px solid #BBDEFB;
            padding: 8px;
            """
        )
        header_layout = QHBoxLayout(header)
        header_layout.setContentsMargins(12, 8, 12, 8)

        self._title_label = QLabel("Hilfe")
        self._title_label.setStyleSheet("font-size: 16px; font-weight: bold; color: #1565C0;")
        header_layout.addWidget(self._title_label)

        header_layout.addStretch()

        close_btn = QPushButton("Schließen")
        close_btn.setStyleSheet(
            """
            QPushButton {
                background-color: #BBDEFB;
                color: #1565C0;
                border: none;
                border-radius: 4px;
                padding: 6px 12px;
                font-weight: bold;
            }
            QPushButton:hover {
                background-color: #90CAF9;
            }
            """
        )
        close_btn.clicked.connect(self.closed.emit)
        header_layout.addWidget(close_btn)

        layout.addWidget(header)

        # Navigation bar
        nav_bar = QWidget()
        nav_layout = QHBoxLayout(nav_bar)
        nav_layout.setContentsMargins(12, 4, 12, 4)

        self._prev_btn = QPushButton("← Zurück")
        self._prev_btn.clicked.connect(self._go_prev)
        self._prev_btn.setStyleSheet(
            """
            QPushButton {
                background-color: #F5F5F5;
                border: 1px solid #E0E0E0;
                border-radius: 4px;
                padding: 4px 12px;
            }
            QPushButton:hover { background-color: #EEEEEE; }
            QPushButton:disabled { color: #BDBDBD; }
            """
        )
        nav_layout.addWidget(self._prev_btn)

        self._page_label = QLabel("Seite 1 / 1")
        self._page_label.setAlignment(Qt.AlignmentFlag.AlignCenter)
        nav_layout.addWidget(self._page_label, 1)

        self._next_btn = QPushButton("Weiter →")
        self._next_btn.clicked.connect(self._go_next)
        self._next_btn.setStyleSheet(self._prev_btn.styleSheet())
        nav_layout.addWidget(self._next_btn)

        layout.addWidget(nav_bar)

        # PDF content area
        if PDF_SUPPORT:
            self._pdf_doc = QPdfDocument(self)
            self._pdf_view = QPdfView(self)
            self._pdf_view.setDocument(self._pdf_doc)
            self._pdf_view.setPageMode(QPdfView.PageMode.SinglePage)
            self._pdf_view.setZoomMode(QPdfView.ZoomMode.FitToWidth)
            layout.addWidget(self._pdf_view, 1)

            # Connect page navigation
            nav = self._pdf_view.pageNavigator()
            nav.currentPageChanged.connect(self._on_page_changed)
        else:
            # Fallback message
            self._fallback_widget = QWidget()
            fallback_layout = QVBoxLayout(self._fallback_widget)

            msg = QLabel(
                "PDF-Anzeige nicht verfügbar.\n\n"
                "Bitte installiere PySide6-Addons:\n"
                "pip install PySide6-Addons"
            )
            msg.setAlignment(Qt.AlignmentFlag.AlignCenter)
            msg.setStyleSheet("color: #757575; font-size: 14px;")
            fallback_layout.addWidget(msg)

            # Button to open externally
            self._open_external_btn = QPushButton("PDF extern öffnen")
            self._open_external_btn.clicked.connect(self._open_external)
            fallback_layout.addWidget(
                self._open_external_btn, alignment=Qt.AlignmentFlag.AlignCenter
            )

            layout.addWidget(self._fallback_widget, 1)

        self._update_nav_buttons()

    def load_pdf(self, path: Path, page: int = 0) -> bool:
        """Load a PDF file.

        Args:
            path: Path to the PDF file
            page: Initial page to display (0-indexed)

        Returns:
            True if loaded successfully
        """
        if not path.exists():
            return False

        self._current_path = path

        # Update title
        name = path.stem.replace("MSA_Station_-_", "").replace(" - Hilfen", "")
        self._title_label.setText(f"Hilfe: {name}")

        if PDF_SUPPORT:
            self._pdf_doc.load(str(path))
            if page > 0 and page < self._pdf_doc.pageCount():
                self._pdf_view.pageNavigator().jump(page, self._pdf_view.pos())
            self._update_nav_buttons()
            return True
        else:
            self._update_nav_buttons()
            return True

    def _go_prev(self) -> None:
        """Go to previous page."""
        if PDF_SUPPORT:
            nav = self._pdf_view.pageNavigator()
            if nav.currentPage() > 0:
                nav.jump(nav.currentPage() - 1, self._pdf_view.pos())

    def _go_next(self) -> None:
        """Go to next page."""
        if PDF_SUPPORT:
            nav = self._pdf_view.pageNavigator()
            if nav.currentPage() < self._pdf_doc.pageCount() - 1:
                nav.jump(nav.currentPage() + 1, self._pdf_view.pos())

    def _on_page_changed(self, page: int) -> None:
        """Handle page change."""
        self._update_nav_buttons()
        self.page_changed.emit(page)

    def _update_nav_buttons(self) -> None:
        """Update navigation button states."""
        if PDF_SUPPORT and hasattr(self, "_pdf_doc"):
            nav = self._pdf_view.pageNavigator()
            current = nav.currentPage()
            total = self._pdf_doc.pageCount()

            self._prev_btn.setEnabled(current > 0)
            self._next_btn.setEnabled(current < total - 1)
            self._page_label.setText(f"Seite {current + 1} / {total}")
        else:
            self._prev_btn.setEnabled(False)
            self._next_btn.setEnabled(False)
            self._page_label.setText("Seite 1 / 1")

    def _open_external(self) -> None:
        """Open the PDF in the system's default viewer."""
        import subprocess
        import sys

        if self._current_path and self._current_path.exists():
            if sys.platform == "win32":
                subprocess.run(["start", "", str(self._current_path)], shell=True)
            elif sys.platform == "darwin":
                subprocess.run(["open", str(self._current_path)])
            else:
                subprocess.run(["xdg-open", str(self._current_path)])


class HilfenBrowserWidget(QWidget):
    """Widget for browsing and selecting help topics."""

    hilfe_selected = Signal(str, Path)  # topic_name, pdf_path

    def __init__(self, parent: QWidget | None = None) -> None:
        super().__init__(parent)
        self._setup_ui()
        self._load_topics()

    def _setup_ui(self) -> None:
        """Set up the UI."""
        layout = QVBoxLayout(self)
        layout.setContentsMargins(16, 16, 16, 16)
        layout.setSpacing(12)

        # Title
        title = QLabel("Hilfe-Themen")
        title.setStyleSheet("font-size: 20px; font-weight: bold; color: #1565C0;")
        layout.addWidget(title)

        # Topic selector
        selector_layout = QHBoxLayout()

        label = QLabel("Thema wählen:")
        selector_layout.addWidget(label)

        self._topic_combo = QComboBox()
        self._topic_combo.setMinimumWidth(250)
        self._topic_combo.currentIndexChanged.connect(self._on_topic_changed)
        selector_layout.addWidget(self._topic_combo, 1)

        layout.addLayout(selector_layout)

        # PDF viewer
        self._pdf_viewer = PdfViewerWidget()
        self._pdf_viewer.closed.connect(self._on_viewer_closed)
        layout.addWidget(self._pdf_viewer, 1)

    def _load_topics(self) -> None:
        """Load available topics."""
        from msa_trainer.content.hilfen_mapper import get_all_hilfen_pdfs

        self._topics = get_all_hilfen_pdfs()

        self._topic_combo.clear()
        for name, _ in self._topics:
            self._topic_combo.addItem(name)

        if self._topics:
            self._topic_combo.setCurrentIndex(0)

    def _on_topic_changed(self, index: int) -> None:
        """Handle topic selection change."""
        if 0 <= index < len(self._topics):
            name, path = self._topics[index]
            self._pdf_viewer.load_pdf(path)
            self.hilfe_selected.emit(name, path)

    def _on_viewer_closed(self) -> None:
        """Handle viewer close request."""
        self.hide()

    def show_topic(self, topic_id: str) -> bool:
        """Show help for a specific topic.

        Args:
            topic_id: The topic ID to show help for

        Returns:
            True if help was found and displayed
        """
        from msa_trainer.content.hilfen_mapper import get_hilfe_reference, get_pdf_path

        # Try to get specific help reference
        hilfe_ref = get_hilfe_reference(topic_id)
        if hilfe_ref:
            pdf_path = get_pdf_path(topic_id, "Hilfen")
            if pdf_path:
                self._pdf_viewer.load_pdf(pdf_path, hilfe_ref.page)
                self.show()
                return True

        # Fall back to generic topic help
        pdf_path = get_pdf_path(topic_id, "Hilfen")
        if pdf_path:
            self._pdf_viewer.load_pdf(pdf_path)
            self.show()
            return True

        return False
