type MetricCardProps = {
  title: string
  value: string
  valueColor?: string
}

function MetricCard({
  title,
  value,
  valueColor = "text-white",
}: MetricCardProps) {
  return (
    <div className="bg-slate-900 p-6 rounded-xl border border-slate-800">
      <p className="text-slate-400">{title}</p>

      <h2 className={`text-3xl font-bold mt-2 ${valueColor}`}>
        {value}
      </h2>
    </div>
  )
}

export default MetricCard