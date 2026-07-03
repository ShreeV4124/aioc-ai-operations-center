from uuid import UUID
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.dependencies import get_current_user

from app.db.dependencies import get_db
from app.models.incident import Incident
from app.schemas.incident import IncidentCreate, IncidentResponse, IncidentStatusUpdate, IncidentAssign
from app.models.user import User, UserRole
from app.core.rbac import require_roles


router = APIRouter()


@router.post("/", response_model=IncidentResponse)
def create_incident(
    incident_data: IncidentCreate,
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles([
            UserRole.ADMIN,
            UserRole.ANALYST,
            UserRole.RESPONDER
        ])
    )
):
    new_incident = Incident(
        title=incident_data.title,
        description=incident_data.description,
        severity=incident_data.severity,
        created_by=current_user.id
    )

    db.add(new_incident)
    db.commit()
    db.refresh(new_incident)

    return new_incident


@router.get("/", response_model=list[IncidentResponse])
def get_incidents(db: Session = Depends(get_db), 
                  current_user: User = Depends(get_current_user)):
    return db.query(Incident).all()


@router.get("/{incident_id}", response_model=IncidentResponse)
def get_incident(incident_id: UUID, db: Session = Depends(get_db), current_user: User = Depends(get_current_user)):
    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    return incident


@router.patch("/{incident_id}/status", response_model=IncidentResponse)
def update_incident_status(
    incident_id: UUID,
    status_data: IncidentStatusUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles([
            UserRole.ADMIN,
            UserRole.RESPONDER
        ])
    )
):
    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    incident.status = status_data.status

    db.commit()
    db.refresh(incident)

    return incident


@router.patch("/{incident_id}/assign", response_model=IncidentResponse)
def assign_incident(
    incident_id: UUID,
    assign_data: IncidentAssign,
    db: Session = Depends(get_db),
    current_user = Depends(
        require_roles([
            UserRole.ADMIN,
            UserRole.RESPONDER
        ])
    )
):
    incident = db.query(Incident).filter(
        Incident.id == incident_id
    ).first()

    if incident is None:
        raise HTTPException(
            status_code=404,
            detail="Incident not found"
        )

    user = db.query(User).filter(
        User.id == assign_data.assigned_to
    ).first()

    if user is None:
        raise HTTPException(
            status_code=404,
            detail="Assigned user not found"
        )

    incident.assigned_to = assign_data.assigned_to

    db.commit()
    db.refresh(incident)

    return incident