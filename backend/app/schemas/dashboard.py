from pydantic import BaseModel

class DashboardStatsResponse(BaseModel):
    active_incidents: int
    critical_alerts: int
    resolved_today: int
    system_health: int

class IncidentChartItem(BaseModel):
    severity: str
    count: int