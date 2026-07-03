from fastapi import FastAPI, Depends, HTTPException
from sqlalchemy import text
import app.models
from app.db.database import engine
from fastapi.middleware.cors import CORSMiddleware

from sqlalchemy.orm import Session

from app.db.dependencies import get_db
from app.models.user import User
from app.core.dependencies import get_current_user

from app.schemas.user import TokenResponse, LoginRequest
from app.core.security import verify_password
from app.core.auth import create_access_token

from app.rag.vector_store import build_vector_store

from app.api import users, incidents, dashboard, ai

from fastapi.security import OAuth2PasswordRequestForm

app = FastAPI(
    title="AIOC API",
    version="1.0.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
def startup_event():
    print("Building vector store...")
    build_vector_store()
    print("Vector store ready")



@app.post("/login", response_model=TokenResponse)
def login(
    login_data: LoginRequest,
    db: Session = Depends(get_db)
):
    
    user = db.query(User).filter(
        User.email == login_data.email
    ).first()

    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    if not verify_password(
        login_data.password,
        user.password_hash
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid email or password"
        )

    access_token = create_access_token(
        data={"sub": user.email}
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }


@app.get("/")
def root():
    return {"message": "AIOC Backend Running Successfully"}


@app.get("/db-test")
def test_db():
    with engine.connect() as connection:
        result = connection.execute(text("SELECT 1"))
        return {"database_response": result.scalar()}
    


app.include_router(users.router, prefix="/users", tags=["Users"])
app.include_router(incidents.router, prefix="/incidents", tags=["Incidents"])
app.include_router(
    dashboard.router,
    prefix="/dashboard",
    tags=["Dashboard"]
)

app.include_router(ai.router, prefix="/ai", tags=["AI"])


