import { useState } from "react"
import { loginUser } from "../services/auth"
import { saveToken } from "../services/token"
import { useNavigate } from "react-router-dom"

function Login() {
  const navigate = useNavigate()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const handleLogin = async (
    e: React.FormEvent
  ) => {
    e.preventDefault()

    try {
      const data = await loginUser({
        email,
        password,
      })

      saveToken(data.access_token)

      navigate("/dashboard")
    } catch (error: any) {
      console.log(error.response)
      setError("Login failed")
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950">
      <form
        onSubmit={handleLogin}
        className="bg-slate-900 p-8 rounded-xl w-96 border border-slate-800"
      >
        <h1 className="text-2xl font-bold mb-6 text-white">
          AIOC Login
        </h1>

        {error && (
          <p className="text-red-400 mb-4">
            {error}
          </p>
        )}

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          value={email}
          onChange={(e) =>
            setEmail(e.target.value)
          }
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 rounded bg-slate-800 text-white"
          value={password}
          onChange={(e) =>
            setPassword(e.target.value)
          }
        />

        <button
          className="w-full bg-cyan-500 hover:bg-cyan-600 p-3 rounded font-semibold"
        >
          Login
        </button>
      </form>
    </div>
  )
}

export default Login