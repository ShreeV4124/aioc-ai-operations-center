import api from "./api"
import type { DashboardStats } from "../types/dashboard"
import type { IncidentChartItem } from "../types/chart"

export async function getDashboardStats() {
  const response = await api.get<DashboardStats>(
    "/dashboard/stats"
  )

  return response.data
}

export async function getIncidentChart() {
  const response = await api.get<IncidentChartItem[]>(
    "/dashboard/incident-chart"
  )

  return response.data
}