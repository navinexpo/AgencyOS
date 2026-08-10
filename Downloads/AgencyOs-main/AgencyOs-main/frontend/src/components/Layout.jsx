import {Outlet, Link} from "react-router-dom"
import {SignedIn, SignedOut, UserButton, OrganizationSwitcher, useOrganization} from "@clerk/clerk-react";
// Layout component for the main application layout
function Layout() {
    const Organization = useOrganization()

    return <div className={"layout"}>
        <div className={"nav"}>
            <div className={"nav-container"}>
                <Link to={"/"} className={"nav-logo"}>
                     AgencyOS
                </Link>
// Navigation links
                <div className={"nav-links"}>
                    <Link to={"/pricing"} className={"nav-link"}>
                        Pricing
                    </Link>

                    <SignedOut>
                    <Link to={"/sign-in"} className={"nav-link"}>
                        Sign In
                    </Link>
                    <Link to={"/sign-up"} className={"btn btn-primary"}>
                        Sign Up
                    </Link>
                    </SignedOut>
// Show organization switcher and user button only if the user is signed in
                <SignedIn>
                    <OrganizationSwitcher
                        hidePersonal
                        afterCreateOrganizationUrl={"dashboard"}
                        afterSelectOrganizationUrl={"dashboard"}
                        createOrganizationMode={"modal"}
                        appearance={{
                            elements: {
                                userPreviewMainIdentifierText__personalWorkspace: {color: "white"},
                                organizationPreviewMainIdentifier__organizationSwitcherTrigger: {color: "white"}
                            }
                        }}
                    />
                    // Show dashboard and leads links only if the user is part of an organization
                    {Organization && (
                         <>
                             <Link to={"/dashboard"} className={"nav-link"}>
                                      Dashboard
                            </Link>
// Show leads link only if the user is part of an organization
                             <Link to={"/leads"} className={"nav-link"}>
                                        Leads
                              </Link>
                         </>
                    )}

                    <UserButton />
                </SignedIn>
                </div>
            </div>
        </div>
// Main content area where the routed components will be rendered
        <main>
            <Outlet />
        </main>


    </div>

} 


export default Layout