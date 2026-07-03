from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.incident import Incident, IncidentSeverity, IncidentStatus
from app.schemas.dashboard import DashboardStatsResponse, IncidentChartItem
from app.core.dependencies import get_current_user

router = APIRouter()

@router.get("/stats", response_model=DashboardStatsResponse)
def get_dashboard_stats(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    incidents = db.query(Incident).all()

    active_incidents = len([
        i for i in incidents
        if i.status != IncidentStatus.RESOLVED
    ])

    critical_alerts = len([
        i for i in incidents
        if i.severity == IncidentSeverity.CRITICAL
    ])

    resolved_today = len([
        i for i in incidents
        if i.status == IncidentStatus.RESOLVED
    ])

    system_health = 98

    return {
        "active_incidents": active_incidents,
        "critical_alerts": critical_alerts,
        "resolved_today": resolved_today,
        "system_health": system_health
    }


@router.get("/incident-chart", response_model=list[IncidentChartItem])
def get_incident_chart(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):
    incidents = db.query(Incident).all()

    chart_data = [
        {
            "severity": "LOW",
            "count": len([
                i for i in incidents
                if i.severity == IncidentSeverity.LOW
            ])
        },
        {
            "severity": "MEDIUM",
            "count": len([
                i for i in incidents
                if i.severity == IncidentSeverity.MEDIUM
            ])
        },
        {
            "severity": "HIGH",
            "count": len([
                i for i in incidents
                if i.severity == IncidentSeverity.HIGH
            ])
        },
        {
            "severity": "CRITICAL",
            "count": len([
                i for i in incidents
                if i.severity == IncidentSeverity.CRITICAL
            ])
        }
    ]

    return chart_data