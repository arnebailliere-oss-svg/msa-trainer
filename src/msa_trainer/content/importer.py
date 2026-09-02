"""Import content packs into the database."""

from pathlib import Path

from msa_trainer.content.pack_loader import ContentPackLoader
from msa_trainer.core.models import ContentPack, ValidationError
from msa_trainer.persistence.database import Database
from msa_trainer.persistence.repositories.question_repo import QuestionRepository
from msa_trainer.persistence.repositories.topic_repo import TopicRepository


class ContentImporter:
    """Imports validated content packs into the database."""

    def __init__(
        self,
        db: Database,
        schema_path: Path | None = None,
    ) -> None:
        self._db = db
        self._loader = ContentPackLoader(schema_path)
        self._topic_repo = TopicRepository(db)
        self._question_repo = QuestionRepository(db)

    def import_pack(
        self, pack_dir: Path, replace_existing: bool = True
    ) -> tuple[bool, list[ValidationError]]:
        """
        Import a content pack from directory.

        Args:
            pack_dir: Path to content pack directory
            replace_existing: If True, delete existing pack data before import

        Returns:
            Tuple of (success, errors)
        """
        # Load and validate
        pack, errors = self._loader.load_pack(pack_dir)

        if errors or pack is None:
            return False, errors

        # Import into database
        try:
            if replace_existing:
                self._delete_pack(pack.pack_id)

            self._import_pack_data(pack)
            return True, []

        except Exception as e:
            return False, [
                ValidationError(
                    path="database",
                    message=f"Database import failed: {e}",
                )
            ]

    def _delete_pack(self, pack_id: str) -> None:
        """Delete all data for a pack."""
        # Delete in correct order for foreign keys
        self._question_repo.delete_by_pack(pack_id)
        self._topic_repo.delete_by_pack(pack_id)

    def _import_pack_data(self, pack: ContentPack) -> None:
        """Import pack data into database."""
        # Import topics first (questions reference them)
        self._topic_repo.create_many(pack.topics)

        # Import questions
        self._question_repo.create_many(pack.questions)

    def get_pack_summary(self, pack_dir: Path) -> dict:
        """Get summary info about a pack without importing."""
        pack, errors = self._loader.load_pack(pack_dir)

        if errors or pack is None:
            return {
                "valid": False,
                "errors": [{"path": e.path, "message": e.message} for e in errors],
            }

        return {
            "valid": True,
            "pack_id": pack.pack_id,
            "title": pack.title,
            "version": pack.version,
            "subjects": [s.value for s in pack.subjects],
            "topic_count": len(pack.topics),
            "question_count": len(pack.questions),
        }
