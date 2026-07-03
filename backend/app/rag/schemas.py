from pydantic import BaseModel
from typing import List


class KnowledgeDocument(BaseModel):
    id: str
    title: str
    content: str


class RetrievalResult(BaseModel):
    title: str
    content: str
    score: float