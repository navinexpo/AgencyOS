import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ClerkProvider } from '@clerk/clerk-react'
import { BrowserRouter } from "react-router-dom"
import './index.css'
import App from './App.jsx'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
// Throw an error if the Clerk Publishable Key is not set in the environment variables. This ensures that the application has the necessary configuration to use Clerk for authentication. If the key is missing, it prompts the developer to add it to the .env file.
if (!PUBLISHABLE_KEY) {
  throw new Error('Add your Clerk Publishable Key to the .env file')
}
// The code above is the entry point of the React application. It imports necessary modules and components, including StrictMode for highlighting potential problems in the application, createRoot for rendering the React component tree, ClerkProvider for integrating Clerk authentication, and BrowserRouter for handling routing. It also imports the main App component and a CSS file for styling.
createRoot(document.getElementById('root')).render(
  <StrictMode>
      <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
          <BrowserRouter>  <App />  </BrowserRouter>
      </ClerkProvider>
  </StrictMode>,
)
