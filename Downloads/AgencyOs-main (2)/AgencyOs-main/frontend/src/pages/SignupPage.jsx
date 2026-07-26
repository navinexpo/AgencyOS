import {SignUp} from "@clerk/clerk-react"
// SignupPage component is used to render the sign-up page of the application. It uses the SignUp component from Clerk to handle user registration. The routing prop is set to "path" to enable path-based routing, and the path prop is set to "/sign-up" to specify the URL for the sign-up page. The signInUrl prop is set to "/sign-in" to provide a link for users who want to sign in instead of signing up.
function SignupPage()
{
    return <div className={"auth-container"}>
        <SignUp routing={"path"} path={"/sign-up"} signInUrl={"/sign-in"} />

    </div>
}

export default SignupPage