from pydantic import BaseModel
from typing import List


class AIAnalysisResponse(BaseModel):
    root_cause: str
    confidence: int
    recommendations: List[str]
    evidence: List[str] = []