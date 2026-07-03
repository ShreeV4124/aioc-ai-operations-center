import api from "./api"
import type { AIAnalysis } from "../types/ai"

export async function getAIAnalysis(
  incidentId: string
) {
  const response = await api.get<AIAnalysis>(
    `/ai/analyze-incident/${incidentId}`
  )

  return response.data
}