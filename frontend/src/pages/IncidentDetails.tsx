import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import type { Incident } from "../types/incident"
import { getIncidentById } from "../services/incident"
import AIAnalysisPanel from "../components/AIAnalysisPanel"

function IncidentDetails() {
  const { id } = useParams()
  const [incident, setIncident] = useState<Incident | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchIncident() {
      if (!id) return

      try {
        const data = await getIncidentById(id)
        setIncident(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    fetchIncident()
  }, [id])

  if (loading) {
    return <p>Loading incident...</p>
  }

  if (!incident) {
    return <p>Incident not found</p>
  }

  return (
    <div>
        <div className="mb-6">
            <h1 className="text-3xl font-bold">
                Incident Details
            </h1>

            <p className="text-slate-400 mt-2">
                AI-powered incident investigation workspace
            </p>
        </div>

    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 space-y-4">
            <div>
                <p className="text-slate-400">Title</p>
                <p className="text-lg font-semibold">{incident.title}</p>
            </div>

            <div>
                <p className="text-slate-400">Description</p>
                <p>{incident.description}</p>
            </div>

            <div>
                <p className="text-slate-400">Severity</p>
                <p>{incident.severity}</p>
            </div>

            <div>
            <p className="text-slate-400">Status</p>
            <p>{incident.status}</p>
            </div>

        </div>
        
        <AIAnalysisPanel incidentId={incident.id} />
        
    </div>
    </div>
  )
}

export default IncidentDetails