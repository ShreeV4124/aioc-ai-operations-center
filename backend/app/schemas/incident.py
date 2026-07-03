from pydantic import BaseModel, ConfigDict
from uuid import UUID

from app.models.incident import IncidentSeverity, IncidentStatus

from enum import Enum

class IncidentStatusEnum(str, Enum):
    OPEN = "OPEN"
    INVESTIGATING = "INVESTIGATING"
    MITIGATED = "MITIGATED"
    RESOLVED = "RESOLVED"
    CLOSED = "CLOSED"


class IncidentAssign(BaseModel):
    assigned_to: UUID


class IncidentStatusUpdate(BaseModel):
    status: IncidentStatusEnum


class IncidentBase(BaseModel):
    title: str
    description: str
    severity: IncidentSeverity


class IncidentCreate(BaseModel):
    title: str
    description: str
    severity: IncidentSeverity


class IncidentResponse(IncidentBase):
    id: UUID
    status: IncidentStatus
    created_by: UUID
    assigned_to: UUID | None = None

    model_config = ConfigDict(from_attributes=True)