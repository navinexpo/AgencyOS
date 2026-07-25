import {Link} from "react-router-dom"
import { SignedIn, SignedOut, useOrganization, CreateOrganization } from "@clerk/clerk-react"
//  Home Page Component
function HomePage()
{
    const {organization} = useOrganization()
   // The HomePage component is the landing page of the application. It displays a title, subtitle, and buttons for signing up or signing in. If the user is signed in, it shows a link to the dashboard or a component to create an organization based on the user's organization status.
    return <div className={"home-container"}>
        <h1 className={"home-title"}>
            From lead discovery to project delivery—
            <span className={"home-title-accent"}>AgencyOS does the heavy lifting.</span>
        </h1>
        <p className={"home-subtitle"}>
            Automate lead generation, client outreach, proposals, meetings, CRM updates, and invoicing—all from one intelligent platform.
        </p>
// SignedOut component is used to show the buttons only when the user is not signed in
        <SignedOut>
            <div  className={"home-buttons"}>
                <Link to={"/sign-up"} className={"btn btn-primary btn-lg"}>
                    Get Started for Free !! 
                </Link>

                <Link to={"/sign-in"} className={"btn btn-outline btn-lg"}>
                    Sign In
                </Link>

            </div>
        </SignedOut>
       // Implementing the SignedIn component to show the dashboard link or create organization component based on the user's organization status
        <SignedIn>
            {organization ? (
                <Link to={"/dashboard"} className={"btn btn-primary btn-lg"}>
                    Go to Dashboard
                </Link>
            ) : 
            <div className={"home-create-org"}>
                <CreateOrganization afterCreateOrganizationUrl={"/dashboard"} />
            </div>}
        </SignedIn>
    </div>
}

export default HomePage