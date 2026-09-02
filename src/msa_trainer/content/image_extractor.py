"""
Image extraction from MSA PDF materials.

Extracts diagrams and figures from PDF exercise sheets for use in questions.
"""

import os
from pathlib import Path
from typing import Optional
import pypdfium2 as pdfium
from PIL import Image


def extract_page_region(
    pdf_path: str | Path,
    page_num: int,
    output_path: str | Path,
    bbox: Optional[tuple[float, float, float, float]] = None,
    scale: float = 2.0
) -> Path:
    """
    Extract a region from a PDF page as an image.

    Args:
        pdf_path: Path to PDF file
        page_num: Page number (0-indexed)
        output_path: Where to save the image
        bbox: Optional (x0, y0, x1, y1) in PDF coordinates to crop
        scale: Render scale (2.0 = 144 DPI)

    Returns:
        Path to saved image
    """
    pdf_path = Path(pdf_path)
    output_path = Path(output_path)
    output_path.parent.mkdir(parents=True, exist_ok=True)

    pdf = pdfium.PdfDocument(str(pdf_path))
    page = pdf[page_num]

    # Render page at higher resolution
    bitmap = page.render(scale=scale)
    pil_image = bitmap.to_pil()

    # Crop if bbox specified
    if bbox:
        # Convert PDF coordinates to pixel coordinates
        width, height = page.get_size()
        img_width, img_height = pil_image.size

        x0, y0, x1, y1 = bbox
        # PDF coordinates are bottom-up, PIL is top-down
        px0 = int(x0 * scale)
        py0 = int((height - y1) * scale)
        px1 = int(x1 * scale)
        py1 = int((height - y0) * scale)

        pil_image = pil_image.crop((px0, py0, px1, py1))

    pil_image.save(str(output_path))
    return output_path


def extract_full_page(
    pdf_path: str | Path,
    page_num: int,
    output_dir: str | Path,
    prefix: str = "page",
    scale: float = 2.0
) -> Path:
    """
    Extract a full PDF page as an image.

    Args:
        pdf_path: Path to PDF file
        page_num: Page number (0-indexed)
        output_dir: Directory to save images
        prefix: Filename prefix
        scale: Render scale

    Returns:
        Path to saved image
    """
    output_path = Path(output_dir) / f"{prefix}_{page_num + 1}.png"
    return extract_page_region(pdf_path, page_num, output_path, scale=scale)


def extract_all_pages(
    pdf_path: str | Path,
    output_dir: str | Path,
    prefix: str = "page",
    scale: float = 2.0
) -> list[Path]:
    """
    Extract all pages from a PDF as images.

    Returns:
        List of paths to saved images
    """
    pdf_path = Path(pdf_path)
    output_dir = Path(output_dir)
    output_dir.mkdir(parents=True, exist_ok=True)

    pdf = pdfium.PdfDocument(str(pdf_path))
    paths = []

    for i in range(len(pdf)):
        path = extract_full_page(pdf_path, i, output_dir, prefix, scale)
        paths.append(path)
        print(f"Extracted page {i + 1}/{len(pdf)}: {path.name}")

    return paths


def get_pdf_info(pdf_path: str | Path) -> dict:
    """Get info about a PDF file."""
    pdf = pdfium.PdfDocument(str(pdf_path))
    page = pdf[0]
    width, height = page.get_size()

    return {
        "pages": len(pdf),
        "width": width,
        "height": height,
    }


if __name__ == "__main__":
    # Test extraction
    import sys

    if len(sys.argv) < 2:
        # Default test with trigonometry PDF
        pdf_path = Path(__file__).parent.parent.parent.parent / "docs/MSA_Folien_als_PDF/MSA_Station_-_Trigonometrie_am_Dreieck - Aufgaben (GR).pdf"
        output_dir = Path(__file__).parent.parent.parent.parent / "content_packs/berlin_msa_v1/images/math/trig"
    else:
        pdf_path = Path(sys.argv[1])
        output_dir = Path(sys.argv[2]) if len(sys.argv) > 2 else Path("./extracted_images")

    print(f"Extracting from: {pdf_path}")
    print(f"Output to: {output_dir}")

    info = get_pdf_info(pdf_path)
    print(f"PDF info: {info}")

    paths = extract_all_pages(pdf_path, output_dir, prefix="trig", scale=2.0)
    print(f"\nExtracted {len(paths)} pages")
