import { useEffect, useState } from "react"

import { getAIAnalysis } from "../services/ai"
import type { AIAnalysis } from "../types/ai"

type AIAnalysisPanelProps = {
  incidentId: string
}

function AIAnalysisPanel({
  incidentId,
}: AIAnalysisPanelProps) {
  const [analysis, setAnalysis] =
    useState<AIAnalysis | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchAnalysis() {
      try {
        const data = await getAIAnalysis(
          incidentId
        )

        setAnalysis(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [incidentId])

  if (loading) {
    return (
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        Loading AI analysis...
      </div>
    )
  }

  if (!analysis) {
    return (
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        AI analysis unavailable
      </div>
    )
  }

  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
      <h2 className="text-xl font-semibold text-cyan-400">
        AI Root Cause Analysis
      </h2>

      <div>
        <p className="text-slate-400">Possible Cause</p>
        <p className="mt-1">
          {analysis.root_cause}
        </p>
      </div>

      <div>
        <p className="text-slate-400">Confidence</p>
        <p className="text-green-400 font-semibold">
          {Math.round(analysis.confidence)}%
        </p>
      </div>

      <div>
        <p className="text-slate-400 mb-2">
          Recommended Actions
        </p>

        <ul className="list-disc list-inside space-y-2">
          {analysis.recommendations.map(
            (recommendation, index) => (
              <li key={index}>
                {recommendation}
              </li>
            )
          )}
        </ul>
      </div>

      <div>
        <p className="text-slate-400 mb-2">
          Retrieved Evidence
        </p>

        <ul className="list-disc list-inside space-y-2">
          {analysis.evidence.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default AIAnalysisPanel