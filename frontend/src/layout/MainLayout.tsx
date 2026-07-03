import { Link, Outlet, useNavigate } from "react-router-dom"
import { removeToken } from "../services/token"

function MainLayout() {
  const navigate = useNavigate()
  function handleLogout() {
    removeToken()
    navigate("/")
  }
  return (
    <div className="flex min-h-screen bg-slate-950 text-white">

      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 border-r border-slate-800 p-6">
        <h1 className="text-3xl font-bold text-cyan-400 mb-10">
          AIOC
        </h1>

        <nav className="flex flex-col gap-4">
          <Link
            to="/dashboard"
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Dashboard
          </Link>

          <Link
            to="/incidents"
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Incidents
          </Link>

          <Link
            to="/assistant"
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            AI Assistant
          </Link>

          <Link
            to="/logs"
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Logs
          </Link>

          <Link
            to="/deployments"
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Deployments
          </Link>

          <Link
            to="/knowledge-base"
            className="px-4 py-3 rounded-lg hover:bg-slate-800 transition"
          >
            Knowledge Base
          </Link>
        </nav>
      </aside>

      {/* Right Section */}
      <div className="flex-1 flex flex-col">

        {/* Navbar */}
        <header className="h-16 border-b border-slate-800 bg-slate-900 px-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold">
            AI Operations Center
          </h2>

          <div className="flex items-center gap-4">
            <span className="text-sm text-slate-400">
              Welcome, Shriraj
            </span>

            <button
              onClick={handleLogout}
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-500 text-sm font-medium transition"
            >
              Logout
            </button>
          </div>
        </header>

        {/* Main Page Content */}
        <main className="flex-1 p-6 bg-slate-950">
          <Outlet />
        </main>

      </div>
    </div>
  )
}

export default MainLayout