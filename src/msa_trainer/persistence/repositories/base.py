"""Base repository abstract class."""

from abc import ABC, abstractmethod
from typing import Generic, Optional, TypeVar

T = TypeVar("T")


class BaseRepository(ABC, Generic[T]):
    """Abstract base class for repositories."""

    @abstractmethod
    def create(self, entity: T) -> None:
        """Insert a new entity."""
        ...

    @abstractmethod
    def get_by_id(self, entity_id: str) -> Optional[T]:
        """Get entity by ID, or None if not found."""
        ...

    @abstractmethod
    def get_all(self) -> list[T]:
        """Get all entities."""
        ...

    @abstractmethod
    def update(self, entity: T) -> None:
        """Update an existing entity."""
        ...

    @abstractmethod
    def delete(self, entity_id: str) -> None:
        """Delete entity by ID."""
        ...
