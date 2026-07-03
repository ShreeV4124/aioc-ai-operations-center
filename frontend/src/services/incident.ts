import api from "./api"
import type { Incident } from "../types/incident"

export async function getIncidents() {
  const response = await api.get<Incident[]>("/incidents")
  return response.data
}

export interface IncidentPayload {
  title: string
  description: string
  severity: string
}

export async function createIncident(data: IncidentPayload) {
  const response = await api.post(
    "/incidents",
    data
  )

  return response.data
}

export async function getIncidentById(id: string) {
  const response = await api.get(`/incidents/${id}`)
  return response.data
}