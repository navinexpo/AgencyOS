import httpx
from fastapi import Depends, HTTPException, Request, status
from clerk_backend_api.security import AuthenticateRequestOptions
from app.core.config import settings
from app.core.clerk import clerk
# Organization permissions for tasks
class AuthUser:
    def __init__(self, user_id: str, org_id: str, org_permissions: list):
        self.user_id = user_id
        self.org_id = org_id
        self.org_permissions = org_permissions
# Define a method to check if the user has a specific permission
    def has_permission(self, permision: str) -> bool:
        return permision in self.org_permissions
    
    @property 
    def can_view(self) -> bool:
        return self.has_permission("org:tasks:view")
    
    @property 
    def can_create(self) -> bool:
        return self.has_permission("org:tasks:create")
    # Define properties for each permission to make it easier to check them
    @property 
    def can_delete(self) -> bool:
        return self.has_permission("org:tasks:delete")
    
    @property 
    def can_edit(self) -> bool:
        return self.has_permission("org:tasks:edit")
    
# Convert FastAPI request to httpx request
def convert_to_httpx_request(fastapi_request: Request) -> httpx.Request:        #fastapi request object converted to httpx request object to use it directly with clerk model 
        return httpx.Request(
            method = fastapi_request.method,
            url = str(fastapi_request.url),
            headers = dict(fastapi_request.headers)
        )
# Define a dependency to get the current authenticated user
async def get_current_user(request: Request) -> AuthUser:
    httpx_request = convert_to_httpx_request(request)

    request_state = clerk.authenticate_request(
          httpx_request,
          AuthenticateRequestOptions(authorized_parties=[settings.FRONTEND_URL])
     )
# Check if the user is signed in
    if not request_state.is_signed_in:
          raise HTTPException(
               status_code = status.HTTP_401_UNAOTHORIZED, detail="Not authenticated"
          )
    

    claims = request_state.payload
    user_id = claims.get("sub")
    org_id = claims.get("org_id")
    org_permissions = claims.get("permissions") or claims.get("org_permissions") or []

# Check if the user is authenticated and has an organization selected
    if not user_id:
        raise HTTPException(
                status_code = status.HTTP_401_UNAUTHORIZED, detail="Not authenticated"
            )

    if not org_id:
        raise HTTPException(
                status_code = status.HTTP_400_BAD_REQUEST, detail="No organization selected"
            )

    return AuthUser(user_id=user_id, org_id=org_id, org_permissions=org_permissions)


# Define a dependency to require specific permissions for a route
def require_view(user: AuthUser = Depends(get_current_user)) -> AuthUser:
     if not user.can_view:
          raise HTTPException(
               status_code = status.HTTP_403_FORBIDDEN,
               detail = "view permisiion required"
          )
     return user



def require_create(user: AuthUser = Depends(get_current_user)) -> AuthUser:
     if not user.can_create:
          raise HTTPException(
               status_code = status.HTTP_403_FORBIDDEN,
               detail = "create permisiion required"
          )
     return user


def require_delete(user: AuthUser = Depends(get_current_user)) -> AuthUser:
     if not user.can_delete:
          raise HTTPException(
               status_code = status.HTTP_403_FORBIDDEN,
               detail = "delete permisiion required"
          )
     return user


def require_edit(user: AuthUser = Depends(get_current_user)) -> AuthUser:
     if not user.can_edit:
          raise HTTPException(
               status_code = status.HTTP_403_FORBIDDEN,
               detail = "edit permisiion required"
          )
     return user

