"""Database schema migrations."""

from msa_trainer.persistence.database import Database

SCHEMA_VERSION = 2

MIGRATIONS: dict[int, str] = {
    1: """
    -- Users table (student profiles)
    CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT NOT NULL,
        pin_hash TEXT,
        created_at TEXT NOT NULL
    );

    -- Topics table (curriculum topics)
    CREATE TABLE IF NOT EXISTS topics (
        id TEXT PRIMARY KEY,
        subject TEXT NOT NULL CHECK (subject IN ('MATH', 'DE', 'EN')),
        code TEXT NOT NULL,
        name TEXT NOT NULL,
        parent_id TEXT,
        pack_id TEXT NOT NULL,
        FOREIGN KEY (parent_id) REFERENCES topics(id)
    );
    CREATE INDEX IF NOT EXISTS idx_topics_subject ON topics(subject);
    CREATE INDEX IF NOT EXISTS idx_topics_parent ON topics(parent_id);

    -- Questions table
    CREATE TABLE IF NOT EXISTS questions (
        id TEXT PRIMARY KEY,
        subject TEXT NOT NULL CHECK (subject IN ('MATH', 'DE', 'EN')),
        topic_id TEXT NOT NULL,
        difficulty INTEGER NOT NULL CHECK (difficulty BETWEEN 1 AND 5),
        qtype TEXT NOT NULL CHECK (qtype IN ('MCQ', 'CLOZE', 'MATCH', 'SHORT')),
        prompt TEXT NOT NULL,
        payload_json TEXT NOT NULL,
        solution_json TEXT NOT NULL,
        explanation TEXT NOT NULL,
        tags_json TEXT NOT NULL,
        variants_json TEXT,
        pack_id TEXT NOT NULL,
        FOREIGN KEY (topic_id) REFERENCES topics(id)
    );
    CREATE INDEX IF NOT EXISTS idx_questions_topic ON questions(topic_id);
    CREATE INDEX IF NOT EXISTS idx_questions_subject ON questions(subject);
    CREATE INDEX IF NOT EXISTS idx_questions_difficulty ON questions(difficulty);

    -- Attempts table (answer log)
    CREATE TABLE IF NOT EXISTS attempts (
        id TEXT PRIMARY KEY,
        user_id TEXT NOT NULL,
        question_id TEXT NOT NULL,
        variant_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        is_correct INTEGER NOT NULL CHECK (is_correct IN (0, 1)),
        response_time_ms INTEGER NOT NULL,
        answer_json TEXT NOT NULL,
        created_at TEXT NOT NULL,
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (question_id) REFERENCES questions(id),
        FOREIGN KEY (topic_id) REFERENCES topics(id)
    );
    CREATE INDEX IF NOT EXISTS idx_attempts_user_topic ON attempts(user_id, topic_id);
    CREATE INDEX IF NOT EXISTS idx_attempts_user_created ON attempts(user_id, created_at DESC);

    -- Mastery table (mastery state per user+topic)
    CREATE TABLE IF NOT EXISTS mastery (
        user_id TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        mastery_score REAL NOT NULL DEFAULT 0.0,
        stability REAL NOT NULL DEFAULT 0.0,
        last_practiced_at TEXT,
        streak_days INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (user_id, topic_id),
        FOREIGN KEY (user_id) REFERENCES users(id),
        FOREIGN KEY (topic_id) REFERENCES topics(id)
    );

    -- Variant counters (for deterministic seeding)
    CREATE TABLE IF NOT EXISTS variant_counters (
        user_id TEXT NOT NULL,
        subject TEXT NOT NULL,
        topic_id TEXT NOT NULL,
        mode_key TEXT NOT NULL,
        date_key TEXT NOT NULL,
        counter INTEGER NOT NULL DEFAULT 0,
        PRIMARY KEY (user_id, subject, topic_id, mode_key, date_key)
    );

    -- Schema version tracking
    CREATE TABLE IF NOT EXISTS schema_version (
        version INTEGER PRIMARY KEY
    );
    INSERT INTO schema_version (version) VALUES (1);
    """,
    2: """
    -- Add image fields to questions table
    ALTER TABLE questions ADD COLUMN image TEXT;
    ALTER TABLE questions ADD COLUMN image_region TEXT;

    -- Update schema version
    INSERT OR REPLACE INTO schema_version (version) VALUES (2);
    """
}


class MigrationRunner:
    """Runs database migrations."""

    def __init__(self, db: Database) -> None:
        self._db = db

    def get_current_version(self) -> int:
        """Get current schema version, or 0 if not initialized."""
        try:
            with self._db.cursor() as cursor:
                cursor.execute("SELECT version FROM schema_version ORDER BY version DESC LIMIT 1")
                row = cursor.fetchone()
                return row["version"] if row else 0
        except Exception:
            return 0

    def run(self) -> None:
        """Apply pending migrations."""
        current = self.get_current_version()

        for version in sorted(MIGRATIONS.keys()):
            if version > current:
                self._db.executescript(MIGRATIONS[version])

    def is_up_to_date(self) -> bool:
        """Check if schema is at latest version."""
        return self.get_current_version() >= SCHEMA_VERSION
