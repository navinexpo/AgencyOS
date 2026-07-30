from clerk_backend_api import Clerk
from app.core.config import settings
# Initialize the Clerk instance with the secret key from settings
clerk = Clerk(bearer_auth=settings.CLERK_SECRET_KEY)

