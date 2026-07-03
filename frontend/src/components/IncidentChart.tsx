import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts"

import type { IncidentChartItem } from "../types/chart"

type IncidentChartProps = {
  data: IncidentChartItem[]
}

function IncidentChart({ data }: IncidentChartProps) {
  return (
    <div className="w-full h-80">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
            <CartesianGrid stroke="#334155" strokeDasharray="3 3" />

            <XAxis
                dataKey="severity"
                tick={{ fill: "#cbd5e1" }}
            />

            <YAxis
                tick={{ fill: "#cbd5e1" }}
            />

            <Tooltip />

            <Bar
                dataKey="count"
                fill="#06b6d4"
                radius={[6, 6, 0, 0]}
            />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default IncidentChart