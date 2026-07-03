from pydantic import BaseModel, ConfigDict
from uuid import UUID

class LoginRequest(BaseModel):
    email: str
    password: str

class TokenResponse(BaseModel):
    access_token: str
    token_type: str

class UserBase(BaseModel):
    full_name: str
    email: str


class UserCreate(UserBase):
    password: str


class UserResponse(UserBase):
    id: UUID
    role: str

    model_config = ConfigDict(from_attributes=True)