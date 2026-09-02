"""Reusable UI widgets."""

from msa_trainer.ui.widgets.ampel_indicator import AmpelIndicator
from msa_trainer.ui.widgets.calculator_widget import CalculatorWidget
from msa_trainer.ui.widgets.pdf_viewer import HilfenBrowserWidget, PdfViewerWidget
from msa_trainer.ui.widgets.question_image import QuestionImageWidget, ZoomableImageDialog

__all__ = [
    "AmpelIndicator",
    "CalculatorWidget",
    "HilfenBrowserWidget",
    "PdfViewerWidget",
    "QuestionImageWidget",
    "ZoomableImageDialog",
]
