from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.core.dependencies import get_current_user

from app.ai.service import analyze_incident
from app.ai.schemas import AIAnalysisResponse

router = APIRouter()


@router.get(
    "/analyze-incident/{incident_id}",
    response_model=AIAnalysisResponse
)
def analyze_incident_endpoint(
    incident_id: UUID,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    analysis = analyze_incident(
        incident_id,
        db
    )

    if analysis is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return analysis