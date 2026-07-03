from pydantic import BaseModel
from typing import List


class AIAnalysisResponse(BaseModel):
    root_cause: str
    confidence: float
    recommendations: list[str]
    evidence: List[str] = []