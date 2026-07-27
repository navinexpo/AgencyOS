import {Routes, Route} from "react-router-dom"
import { SignedIn, SignedOut, RedirectToSignIn } from "@clerk/clerk-react";
import Layout from "./components/Layout.jsx";
import HomePage from "./pages/HomePage.jsx"
import SigninPage from "./pages/SigninPage.jsx"
import SignupPage from "./pages/SignupPage.jsx"
import DashboardPage from "./pages/DashboardPage.jsx"
import PricingPage from "./pages/PricingPage.jsx"
// The ProtectedRoute component is a wrapper that checks if the user is signed in. If the user is signed in, it renders the children components. If the user is signed out, it redirects them to the sign-in page using the RedirectToSignIn component from Clerk.
function ProtectedRoute({children}) {
  return<>
    <SignedIn>{children}</SignedIn>
    <SignedOut>
      <RedirectToSignIn />
    </SignedOut>
  </>
}
// The App component defines the routing structure of the application. It uses the Routes and Route components from react-router-dom to define different routes for the application. The Layout component is used as a wrapper for all routes, providing a consistent layout across different pages. The ProtectedRoute component is used to protect the dashboard route, ensuring that only signed-in users can access it.
function App() {
  return<Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={"sign-in/*"} element={<SigninPage />}/>
      <Route path={"sign-up/*"} element={<SignupPage />}/>
      <Route path={"pricing"} element={<PricingPage />}/>
      <Route 
      // The dashboard route is protected by the ProtectedRoute component. If the user is signed in, they will be able to access the DashboardPage component. If they are signed out, they will be redirected to the sign-in page.
        path={"dashboard"} 
        element={
        <ProtectedRoute>
          <DashboardPage />
        </ProtectedRoute>
        }
        />
    </Route>
  </Routes>
}


export default App



/*


function App() {
  return<Routes>
    <Route path="/" element={<Layout />}>
      <Route index element={<HomePage />} />
      <Route path={"sign-in/*"} element={<SigninPage />}/>
      <Route path={"sign-up/*"} element={<SignupPage />}/>
      <Route path={"pricing"} element={<PricingPage />}/>
      <Route 
        path={"dashboard"} 
        element={
          <DashboardPage />
        }
        />
    </Route>
  </Routes>
}
*/