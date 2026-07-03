import api from "./api"

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export async function loginUser(data: LoginPayload) {
  const response = await api.post<LoginResponse>(
    "/login",
    data
  )

  return response.data
}