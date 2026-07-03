import { BrowserRouter, Routes, Route } from "react-router-dom"
import ProtectedRoute from "./ProtectedRoute"
import IncidentDetails from "../pages/IncidentDetails"

import Login from "../pages/Login"
import Dashboard from "../pages/Dashboard"
import Incidents from "../pages/Incidents"
import AIAssistant from "../pages/AIAssistant"
import Logs from "../pages/Logs"
import Deployments from "../pages/Deployments"
import KnowledgeBase from "../pages/KnowledgeBase"
import MainLayout from "../layout/MainLayout"

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          element={
            <ProtectedRoute>
              <MainLayout />
            </ProtectedRoute>
          }
        >
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/incidents" element={<Incidents />} />
          <Route path="/assistant" element={<AIAssistant />} />
          <Route path="/logs" element={<Logs />} />
          <Route path="/deployments" element={<Deployments />} />
          <Route path="/knowledge-base" element={<KnowledgeBase />} />
          <Route path="/incidents/:id" element={<IncidentDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes