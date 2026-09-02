"""Application bootstrap."""

import sys

from PySide6.QtWidgets import QApplication

from msa_trainer.app import MainWindow
from msa_trainer.ui.styles import BASE_STYLESHEET


def main() -> None:
    """Main entry point for the MSA Trainer application."""
    app = QApplication(sys.argv)
    app.setApplicationName("MSA Trainer Berlin")
    app.setApplicationVersion("0.1.0")
    app.setStyleSheet(BASE_STYLESHEET)

    window = MainWindow()
    window.show()

    sys.exit(app.exec())


if __name__ == "__main__":
    main()
