"""View navigation router using QStackedWidget."""

from typing import Callable, Optional

from PySide6.QtWidgets import QStackedWidget, QWidget


class Router:
    """Manages view navigation with history stack."""

    def __init__(self) -> None:
        self._stack = QStackedWidget()
        self._history: list[str] = []
        self._views: dict[str, QWidget] = {}
        self._factories: dict[str, Callable[[], QWidget]] = {}
        self._current_view: Optional[str] = None

    @property
    def widget(self) -> QStackedWidget:
        """Return the underlying stack widget for embedding in MainWindow."""
        return self._stack

    def register(self, name: str, view_factory: Callable[[], QWidget]) -> None:
        """Register a view by name with lazy instantiation."""
        self._factories[name] = view_factory

    def navigate(self, view_name: str, push_history: bool = True) -> None:
        """Switch to named view."""
        if view_name not in self._factories:
            raise ValueError(f"Unknown view: {view_name}")

        # Lazy instantiate if needed
        if view_name not in self._views:
            self._views[view_name] = self._factories[view_name]()
            self._stack.addWidget(self._views[view_name])

        # Push current to history
        if push_history and self._current_view is not None:
            self._history.append(self._current_view)

        # Switch view
        self._current_view = view_name
        self._stack.setCurrentWidget(self._views[view_name])

    def back(self) -> bool:
        """Return to previous view. Returns False if no history."""
        if not self._history:
            return False

        previous = self._history.pop()
        self.navigate(previous, push_history=False)
        return True

    def get_view(self, view_name: str) -> Optional[QWidget]:
        """Get instantiated view by name, or None if not yet created."""
        return self._views.get(view_name)

    def clear_history(self) -> None:
        """Clear navigation history."""
        self._history.clear()
