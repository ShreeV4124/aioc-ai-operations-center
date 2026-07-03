import MetricCard from "../components/MetricCard"
import AlertBadge from "../components/AlertBadge"
import RecommendationCard from "../components/RecommendationCard"
import { useEffect, useState } from "react"
import { getDashboardStats } from "../services/dashboard"
import type { DashboardStats } from "../types/dashboard"
import IncidentChart from "../components/IncidentChart"
import { getIncidentChart } from "../services/dashboard"
import type { IncidentChartItem } from "../types/chart"


function Dashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [chartData, setChartData] = useState<IncidentChartItem[]>([])
    useEffect(() => {
    async function fetchStats() {
      try {
        const data = await getDashboardStats()
        setStats(data)
      } catch (error) {
        console.error(error)
      } finally {
        setLoading(false)
      }
    }

    async function fetchChart() {
      try {
        const data = await getIncidentChart()
        setChartData(data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchStats()
    fetchChart()
  }, [])

  if (loading || !stats) {
    return <p>Loading dashboard...</p>
  }

  return (
    
    <div className="space-y-8">
      {/* Page Title */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-slate-400 mt-2">
          Monitor incidents, alerts, and AI recommendations
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        <MetricCard title="Active Incidents" value={stats.active_incidents.toString()} />
        <MetricCard title="Critical Alerts" value={stats.critical_alerts.toString()} valueColor="text-red-400" />
        <MetricCard title="Resolved Today" value={stats.resolved_today.toString()} valueColor="text-green-400" />
        <MetricCard title="System Health" value={`${stats.system_health}%`} valueColor="text-cyan-400" />
      </div>

      {/* Middle Section */}
      <div className="grid grid-cols-2 gap-6">

        {/* AI Recommendations Panel */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-semibold mb-4">
            AI Recommendations
          </h2>

          <div className="space-y-4">
            <RecommendationCard message="Database latency spike detected. Check connection pool usage." />
            <RecommendationCard message="Repeated pod restarts detected in Kubernetes cluster." />
          </div>
        </div>

        {/* Recent Alerts Panel */}
        <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
          <h2 className="text-xl font-semibold mb-4">
            Recent Alerts
          </h2>

          <div className="space-y-3">
            <AlertBadge message="CRITICAL — API Gateway Down" severity="critical" />
            <AlertBadge message="HIGH — Memory Usage 92%" severity="high" />
            <AlertBadge message="MEDIUM — CPU Spike" severity="medium" />
          </div>
        </div>

      </div>
      {/* Bottom Section */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
        <h2 className="text-xl font-semibold mb-4">
          Incident Overview
        </h2>

        <IncidentChart data={chartData} />
      </div>
    </div>
  )
}

export default Dashboard