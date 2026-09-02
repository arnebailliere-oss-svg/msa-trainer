"""
Batch extract images from all MSA PDF materials.

Run from project root:
    python scripts/extract_pdf_images.py
"""

import sys
from pathlib import Path

# Add src to path
sys.path.insert(0, str(Path(__file__).parent.parent / "src"))

from msa_trainer.content.image_extractor import extract_all_pages, get_pdf_info

# Mapping of PDF files to topic prefixes
PDF_TOPICS = {
    "MSA_Station_-_Trigonometrie_am_Dreieck - Aufgaben (GR).pdf": "trig",
    "MSA_Station_-_Korperberechnungen - Aufgaben (GR).pdf": "koerper",
    "MSA_Station_-_Geometrie_in_der_Ebene - Aufgaben (GR).pdf": "geo2d",
    "MSA_Station_-_Daten - Aufgaben (GR).pdf": "daten",
    "MSA_Station_-_Exponentielles_Wachstum_und_Abnahme - Aufgaben (GR).pdf": "exp",
    "MSA_Station_-_Lineare_Funktionen und Gleichungen - Aufgaben (GR).pdf": "linear",
    "MSA_Station_-_Quadratische_Funktionen und Gleichungen - Aufgaben (GR).pdf": "quad",
    "MSA_Station_-_Wahrscheinlichkeit - Aufgaben (GR).pdf": "prob",
    "MSA_Station_-_Pythagoras - Aufgaben (GR).pdf": "pyth",
    "MSA_Station_-_Prozentrechnung - Aufgaben (GR).pdf": "prozent",
    "MSA_Station_-_Lineare Gleichungssysteme - Aufgaben (GR).pdf": "lgs",
}


def main():
    project_root = Path(__file__).parent.parent
    pdf_dir = project_root / "docs" / "MSA_Folien_als_PDF"
    output_base = project_root / "content_packs" / "berlin_msa_v1" / "images" / "math"

    print(f"PDF directory: {pdf_dir}")
    print(f"Output base: {output_base}")
    print()

    extracted_count = 0
    skipped_count = 0

    for pdf_name, prefix in PDF_TOPICS.items():
        pdf_path = pdf_dir / pdf_name

        if not pdf_path.exists():
            print(f"[SKIP] {pdf_name} - not found")
            skipped_count += 1
            continue

        output_dir = output_base / prefix

        # Check if already extracted
        if output_dir.exists() and list(output_dir.glob("*.png")):
            existing = list(output_dir.glob("*.png"))
            print(f"[SKIP] {prefix}: Already has {len(existing)} images")
            continue

        print(f"[EXTRACT] {pdf_name}")
        try:
            info = get_pdf_info(pdf_path)
            print(f"  Pages: {info['pages']}, Size: {info['width']:.0f}x{info['height']:.0f}")

            paths = extract_all_pages(pdf_path, output_dir, prefix=prefix, scale=2.0)
            extracted_count += len(paths)
            print(f"  -> Saved {len(paths)} images to {output_dir.relative_to(project_root)}")
        except Exception as e:
            print(f"  ERROR: {e}")

        print()

    print(f"\nDone! Extracted {extracted_count} images, skipped {skipped_count} PDFs")

    # List all extracted images
    print("\nExtracted image directories:")
    for topic_dir in sorted(output_base.iterdir()):
        if topic_dir.is_dir():
            images = list(topic_dir.glob("*.png"))
            print(f"  {topic_dir.name}/: {len(images)} images")


if __name__ == "__main__":
    main()
