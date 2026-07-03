from pydantic import BaseModel
from typing import List


class IntakeResult(BaseModel):
    summary: str
    keywords: List[str]
    category: str