import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import type { Incident } from "../types/incident"
import { getIncidents, createIncident } from "../services/incident"


function Incidents() {
  const [incidents, setIncidents] = useState<Incident[]>([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [severity, setSeverity] = useState("LOW")
  const navigate = useNavigate()
  

  async function fetchIncidents() {
    try {
      const data = await getIncidents()
      setIncidents(data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchIncidents()
  }, [])

  async function handleCreateIncident() {
      try {
        await createIncident({
          title,
          description,
          severity,
        })

        setTitle("")
        setDescription("")
        setSeverity("LOW")

        setShowModal(false)

        fetchIncidents()
      } catch (error) {
        console.error(error)
      }
  }

  if (loading) {
    return <p>Loading incidents...</p>
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
          <div>
              <h1 className="text-3xl font-bold">Incident Center</h1>
              <p className="text-slate-400 mt-2">
                Monitor and manage active incidents
              </p>
            </div>

            <button
              onClick={() => setShowModal(true)}
              className="bg-cyan-600 hover:bg-cyan-500 px-4 py-2 rounded-lg font-medium"
            >
              + New Incident
            </button>
       </div>

      <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-800">
            <tr>
              <th className="p-4 text-left">Title</th>
              <th className="p-4 text-left">Severity</th>
              <th className="p-4 text-left">Status</th>
            </tr>
          </thead>

          <tbody>
            {incidents.length === 0 ? (
              <tr>
                <td
                  colSpan={3}
                  className="p-6 text-center text-slate-400"
                >
                  No incidents found
                </td>
              </tr>
            ) : (
              incidents.map((incident) => (
                <tr
                  key={incident.id}
                  className="border-t border-slate-800 cursor-pointer hover:bg-slate-800 transition"
                  onClick={() => navigate(`/incidents/${incident.id}`)}
                >
                  <td className="p-4">{incident.title}</td>
                  <td className="p-4">{incident.severity}</td>
                  <td className="p-4">{incident.status}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-slate-900 w-full max-w-lg rounded-xl border border-slate-800 p-6">
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold">
                Create Incident
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4">

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
                placeholder="Eg. Payment service down"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
                rows={4}
                placeholder="Describe the incident..."
              />
            </div>

            <div>
              <label className="block mb-2 text-sm text-slate-300">
                Severity
              </label>
              <select
                value={severity}
                onChange={(e) => setSeverity(e.target.value)}
                className="w-full p-3 rounded-lg bg-slate-800 border border-slate-700"
              >
                <option value="LOW">LOW</option>
                <option value="MEDIUM">MEDIUM</option>
                <option value="HIGH">HIGH</option>
                <option value="CRITICAL">CRITICAL</option>
              </select>
            </div>

            <button
              onClick={handleCreateIncident}
              className="w-full bg-cyan-600 hover:bg-cyan-500 p-3 rounded-lg font-medium"
            >
              Create Incident
            </button>

          </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Incidents