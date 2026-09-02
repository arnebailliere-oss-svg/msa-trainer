"""SQLite database connection management."""

import sqlite3
from contextlib import contextmanager
from pathlib import Path
from typing import Generator, Optional


class Database:
    """SQLite connection manager with WAL mode support."""

    def __init__(self, db_path: Path | str) -> None:
        """Initialize database with path. Use ':memory:' for in-memory DB."""
        self._path = str(db_path)
        self._conn: Optional[sqlite3.Connection] = None

    @property
    def connection(self) -> sqlite3.Connection:
        """Get the current connection, raising if not connected."""
        if self._conn is None:
            raise RuntimeError("Database not connected. Call connect() first.")
        return self._conn

    def connect(self) -> None:
        """Open database connection with optimized settings."""
        self._conn = sqlite3.connect(self._path)
        self._conn.row_factory = sqlite3.Row

        # Enable WAL mode for better concurrency (except for in-memory)
        if self._path != ":memory:":
            self._conn.execute("PRAGMA journal_mode=WAL")

        # Enable foreign keys
        self._conn.execute("PRAGMA foreign_keys=ON")

    def close(self) -> None:
        """Close database connection safely."""
        if self._conn is not None:
            self._conn.close()
            self._conn = None

    @contextmanager
    def transaction(self) -> Generator[sqlite3.Cursor, None, None]:
        """Provide transactional cursor with auto-commit/rollback."""
        cursor = self.connection.cursor()
        try:
            yield cursor
            self.connection.commit()
        except Exception:
            self.connection.rollback()
            raise
        finally:
            cursor.close()

    @contextmanager
    def cursor(self) -> Generator[sqlite3.Cursor, None, None]:
        """Provide a cursor for read operations (no transaction)."""
        cursor = self.connection.cursor()
        try:
            yield cursor
        finally:
            cursor.close()

    def execute(self, sql: str, params: tuple = ()) -> sqlite3.Cursor:
        """Execute a single SQL statement."""
        return self.connection.execute(sql, params)

    def executemany(self, sql: str, params_list: list[tuple]) -> sqlite3.Cursor:
        """Execute SQL with multiple parameter sets."""
        return self.connection.executemany(sql, params_list)

    def executescript(self, sql: str) -> None:
        """Execute multiple SQL statements."""
        self.connection.executescript(sql)
        self.connection.commit()
