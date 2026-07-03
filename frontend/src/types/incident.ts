export interface Incident {
  id: string
  title: string
  description: string
  severity: string
  status: string
  created_by: string
  assigned_to?: string
}