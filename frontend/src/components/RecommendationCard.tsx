type RecommendationCardProps = {
  message: string
}

function RecommendationCard({
  message,
}: RecommendationCardProps) {
  return (
    <div className="p-4 rounded-lg bg-slate-800 text-sm text-slate-300">
      {message}
    </div>
  )
}

export default RecommendationCard