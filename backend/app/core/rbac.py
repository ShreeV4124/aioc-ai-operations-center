from fastapi import Depends, HTTPException
from app.core.dependencies import get_current_user
from app.models.user import User


def require_roles(allowed_roles: list):
    def role_checker(current_user: User = Depends(get_current_user)):
        
        if current_user.role not in allowed_roles:
            raise HTTPException(
                status_code=403,
                detail="You do not have permission"
            )

        return current_user

    return role_checker