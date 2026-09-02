"""Maps topics to PDF help files and specific pages."""

from pathlib import Path
from typing import NamedTuple


class HilfeReference(NamedTuple):
    """Reference to a specific help card in a PDF."""

    pdf_name: str  # e.g., "Prozentrechnung"
    page: int  # 0-indexed page number
    card_title: str  # e.g., "Prozentwert berechnen"


# Base path for PDF files
PDF_BASE_PATH = Path(__file__).parent.parent.parent.parent.parent / "docs" / "MSA_Folien_als_PDF"


# Mapping from topic_id to PDF topic name
TOPIC_TO_PDF = {
    # Prozentrechnung
    "math_prozent": "Prozentrechnung",
    "math_prozent_begriffe": "Prozentrechnung",
    "math_prozent_prozentwert": "Prozentrechnung",
    "math_prozent_prozentsatz": "Prozentrechnung",
    "math_prozent_grundwert": "Prozentrechnung",
    # Lineare Funktionen
    "math_lin_funk": "Lineare_Funktionen und Gleichungen",
    "math_lin_funk_graph": "Lineare_Funktionen und Gleichungen",
    "math_lin_funk_steigung": "Lineare_Funktionen und Gleichungen",
    "math_lin_funk_gleichung": "Lineare_Funktionen und Gleichungen",
    # Lineare Gleichungssysteme
    "math_lgs": "Lineare_Gleichungssysteme",
    "math_lgs_einsetzung": "Lineare_Gleichungssysteme",
    "math_lgs_gleichsetzung": "Lineare_Gleichungssysteme",
    "math_lgs_addition": "Lineare_Gleichungssysteme",
    # Quadratische Funktionen
    "math_quad_funk": "Quadratische_Funktionen und Gleichungen",
    "math_quad_funk_normalform": "Quadratische_Funktionen und Gleichungen",
    "math_quad_funk_scheitelpunkt": "Quadratische_Funktionen und Gleichungen",
    "math_quad_funk_nullstellen": "Quadratische_Funktionen und Gleichungen",
    # Pythagoras
    "math_pythagoras": "Satz_des_Pythagoras",
    "math_pythagoras_anwenden": "Satz_des_Pythagoras",
    # Trigonometrie
    "math_trigonometrie": "Trigonometrie_am_Dreieck",
    "math_trigonometrie_sinus": "Trigonometrie_am_Dreieck",
    "math_trigonometrie_cosinus": "Trigonometrie_am_Dreieck",
    "math_trigonometrie_tangens": "Trigonometrie_am_Dreieck",
    # Geometrie
    "math_geometrie": "Geometrie_in_der_Ebene",
    "math_geometrie_flaeche": "Geometrie_in_der_Ebene",
    "math_geometrie_umfang": "Geometrie_in_der_Ebene",
    # Körperberechnungen
    "math_koerper": "Korperberechnungen",
    "math_koerper_volumen": "Korperberechnungen",
    "math_koerper_oberflaeche": "Korperberechnungen",
    # Exponentielles Wachstum
    "math_exponentiell": "Exponentielles_Wachstum_und_Abnahme",
    "math_exponentiell_wachstum": "Exponentielles_Wachstum_und_Abnahme",
    "math_exponentiell_abnahme": "Exponentielles_Wachstum_und_Abnahme",
    # Wahrscheinlichkeit
    "math_wahrscheinlichkeit": "Wahrscheinlichkeit",
    "math_wahrscheinlichkeit_grundlagen": "Wahrscheinlichkeit",
    "math_wahrscheinlichkeit_baumdiagramm": "Wahrscheinlichkeit",
    # Daten/Statistik
    "math_statistik": "Daten",
    "math_statistik_mittelwert": "Daten",
    "math_statistik_median": "Daten",
    "math_statistik_diagramme": "Daten",
}

# Specific help card references (topic_id -> HilfeReference)
HILFE_CARDS = {
    # Prozentrechnung - detailed mapping
    "math_prozent_begriffe": HilfeReference("Prozentrechnung", 0, "Grundwert, Prozentwert und Prozentsatz erkennen"),
    "math_prozent_umrechnen": HilfeReference("Prozentrechnung", 0, "Prozente, Brüche und Dezimalzahlen"),
    "math_prozent_prozentwert": HilfeReference("Prozentrechnung", 2, "Prozentwert berechnen"),
    "math_prozent_prozentsatz": HilfeReference("Prozentrechnung", 2, "Prozentsatz berechnen"),
    "math_prozent_grundwert": HilfeReference("Prozentrechnung", 3, "Grundwert berechnen"),
}


def get_pdf_path(topic_id: str, file_type: str = "Hilfen") -> Path | None:
    """Get the path to a PDF file for a topic.

    Args:
        topic_id: The topic ID (e.g., "math_prozent")
        file_type: One of "Hilfen", "Aufgaben (GR)", "Aufgaben (ER)", "Lösungen"

    Returns:
        Path to the PDF file, or None if not found
    """
    pdf_topic = TOPIC_TO_PDF.get(topic_id)
    if not pdf_topic:
        # Try parent topic
        parts = topic_id.rsplit("_", 1)
        if len(parts) > 1:
            pdf_topic = TOPIC_TO_PDF.get(parts[0])

    if not pdf_topic:
        return None

    pdf_name = f"MSA_Station_-_{pdf_topic} - {file_type}.pdf"
    pdf_path = PDF_BASE_PATH / pdf_name

    if pdf_path.exists():
        return pdf_path
    return None


def get_hilfe_reference(topic_id: str) -> HilfeReference | None:
    """Get a specific help card reference for a topic."""
    return HILFE_CARDS.get(topic_id)


def get_available_topics() -> list[str]:
    """Get list of topics that have PDF help available."""
    available = []
    for topic_id in TOPIC_TO_PDF:
        if get_pdf_path(topic_id):
            available.append(topic_id)
    return available


def get_all_hilfen_pdfs() -> list[tuple[str, Path]]:
    """Get all available Hilfen PDFs with their display names."""
    result = []
    seen = set()

    for topic_id, pdf_topic in TOPIC_TO_PDF.items():
        if pdf_topic in seen:
            continue
        seen.add(pdf_topic)

        pdf_path = get_pdf_path(topic_id, "Hilfen")
        if pdf_path:
            # Create display name from PDF topic
            display_name = pdf_topic.replace("_", " ")
            result.append((display_name, pdf_path))

    return sorted(result, key=lambda x: x[0])
