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