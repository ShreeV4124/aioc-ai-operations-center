import os
from pathlib import Path

class Document:
    def __init__(self, title, content):
        self.title = title
        self.content = content


def load_documents():
    documents = []

    base_path = Path("knowledge/runbooks")

    for file in base_path.glob("*.md"):
        with open(file, "r", encoding="utf-8") as f:
            content = f.read()

        first_line = content.splitlines()[0]
        title = first_line.replace("Title:", "").strip()

        documents.append(
            Document(
                title=title,
                content=content
            )
        )

    return documents