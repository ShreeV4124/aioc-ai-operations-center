from sqlalchemy import Column, String, DateTime, Boolean, Text, Enum
from sqlalchemy.dialects.postgresql import UUID
from datetime import datetime
import uuid

from enum import Enum as PyEnum

class UserRole(str, PyEnum):
    ADMIN = "ADMIN"
    ANALYST = "ANALYST"
    RESPONDER = "RESPONDER"
    VIEWER = "VIEWER"

from app.db.base import Base


class User(Base):
    __tablename__ = "users"

    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    full_name = Column(String(100), nullable=False)
    email = Column(String(255), unique=True, nullable=False)
    password_hash = Column(Text, nullable=False)

    role = Column(Enum(UserRole, name="user_role"), default=UserRole.VIEWER)

    is_active = Column(Boolean, nullable=False, default=True)

    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow)