type AlertBadgeProps = {
  message: string
  severity: "critical" | "high" | "medium"
}

function AlertBadge({ message, severity }: AlertBadgeProps) {
  const styles = {
    critical: "bg-red-500/20 text-red-300",
    high: "bg-orange-500/20 text-orange-300",
    medium: "bg-yellow-500/20 text-yellow-300",
  }

  return (
    <div className={`${styles[severity]} px-4 py-3 rounded-lg`}>
      {message}
    </div>
  )
}

export default AlertBadge