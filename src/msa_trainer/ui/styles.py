"""QSS stylesheets and color constants for MSA Trainer."""

# Color palette
COLORS = {
    # Ampel (traffic light) colors
    "ampel_red": "#E53935",
    "ampel_red_light": "#FFCDD2",
    "ampel_yellow": "#FFC107",
    "ampel_yellow_light": "#FFF8E1",
    "ampel_green": "#43A047",
    "ampel_green_light": "#C8E6C9",
    # Subject colors
    "math": "#1E88E5",
    "math_light": "#BBDEFB",
    "german": "#8E24AA",
    "german_light": "#E1BEE7",
    "english": "#00897B",
    "english_light": "#B2DFDB",
    # UI colors
    "primary": "#1976D2",
    "primary_dark": "#1565C0",
    "primary_light": "#42A5F5",
    "secondary": "#455A64",
    "background": "#FAFAFA",
    "surface": "#FFFFFF",
    "error": "#D32F2F",
    "success": "#388E3C",
    "text_primary": "#212121",
    "text_secondary": "#757575",
    "border": "#E0E0E0",
    "disabled": "#BDBDBD",
}

# Font sizes
FONT_SIZES = {
    "h1": 28,
    "h2": 24,
    "h3": 20,
    "body": 16,
    "small": 14,
    "caption": 12,
}

# Base stylesheet
BASE_STYLESHEET = f"""
QMainWindow {{
    background-color: {COLORS["background"]};
}}

QWidget {{
    font-family: "Segoe UI", "Arial", sans-serif;
    font-size: {FONT_SIZES["body"]}px;
    color: {COLORS["text_primary"]};
}}

QLabel {{
    color: {COLORS["text_primary"]};
}}

QPushButton {{
    background-color: {COLORS["primary"]};
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px 20px;
    font-size: {FONT_SIZES["body"]}px;
    font-weight: bold;
}}

QPushButton:hover {{
    background-color: {COLORS["primary_dark"]};
}}

QPushButton:pressed {{
    background-color: {COLORS["primary_light"]};
}}

QPushButton:disabled {{
    background-color: {COLORS["disabled"]};
    color: white;
}}

QPushButton.secondary {{
    background-color: {COLORS["surface"]};
    color: {COLORS["primary"]};
    border: 2px solid {COLORS["primary"]};
}}

QPushButton.secondary:hover {{
    background-color: {COLORS["primary_light"]};
    color: white;
}}

QLineEdit, QTextEdit {{
    background-color: {COLORS["surface"]};
    border: 2px solid {COLORS["border"]};
    border-radius: 4px;
    padding: 8px;
    font-size: {FONT_SIZES["body"]}px;
}}

QLineEdit:focus, QTextEdit:focus {{
    border-color: {COLORS["primary"]};
}}

QComboBox {{
    background-color: {COLORS["surface"]};
    border: 2px solid {COLORS["border"]};
    border-radius: 4px;
    padding: 8px;
    font-size: {FONT_SIZES["body"]}px;
}}

QComboBox:focus {{
    border-color: {COLORS["primary"]};
}}

QComboBox::drop-down {{
    border: none;
    width: 30px;
}}

QRadioButton {{
    font-size: {FONT_SIZES["body"]}px;
    spacing: 8px;
}}

QRadioButton::indicator {{
    width: 20px;
    height: 20px;
}}

QCheckBox {{
    font-size: {FONT_SIZES["body"]}px;
    spacing: 8px;
}}

QCheckBox::indicator {{
    width: 20px;
    height: 20px;
}}

QProgressBar {{
    border: none;
    border-radius: 4px;
    background-color: {COLORS["border"]};
    height: 8px;
    text-align: center;
}}

QProgressBar::chunk {{
    background-color: {COLORS["primary"]};
    border-radius: 4px;
}}

QScrollArea {{
    border: none;
    background-color: transparent;
}}

QScrollBar:vertical {{
    background-color: {COLORS["background"]};
    width: 12px;
    margin: 0;
}}

QScrollBar::handle:vertical {{
    background-color: {COLORS["border"]};
    border-radius: 6px;
    min-height: 30px;
}}

QScrollBar::handle:vertical:hover {{
    background-color: {COLORS["secondary"]};
}}

QScrollBar::add-line:vertical, QScrollBar::sub-line:vertical {{
    height: 0;
}}
"""

# Subject-specific button styles
SUBJECT_BUTTON_STYLES = {
    "MATH": f"""
        QPushButton {{
            background-color: {COLORS["math"]};
        }}
        QPushButton:hover {{
            background-color: #1565C0;
        }}
    """,
    "DE": f"""
        QPushButton {{
            background-color: {COLORS["german"]};
        }}
        QPushButton:hover {{
            background-color: #6A1B9A;
        }}
    """,
    "EN": f"""
        QPushButton {{
            background-color: {COLORS["english"]};
        }}
        QPushButton:hover {{
            background-color: #00695C;
        }}
    """,
}

# Ampel indicator styles
AMPEL_STYLES = {
    "RED": f"""
        background-color: {COLORS["ampel_red"]};
        border-radius: 10px;
    """,
    "YELLOW": f"""
        background-color: {COLORS["ampel_yellow"]};
        border-radius: 10px;
    """,
    "GREEN": f"""
        background-color: {COLORS["ampel_green"]};
        border-radius: 10px;
    """,
}

# Feedback styles
FEEDBACK_CORRECT_STYLE = f"""
    background-color: {COLORS["ampel_green_light"]};
    border: 2px solid {COLORS["ampel_green"]};
    border-radius: 8px;
    padding: 16px;
"""

FEEDBACK_INCORRECT_STYLE = f"""
    background-color: {COLORS["ampel_red_light"]};
    border: 2px solid {COLORS["ampel_red"]};
    border-radius: 8px;
    padding: 16px;
"""

# Card style
CARD_STYLE = f"""
    background-color: {COLORS["surface"]};
    border: 1px solid {COLORS["border"]};
    border-radius: 8px;
    padding: 16px;
"""
