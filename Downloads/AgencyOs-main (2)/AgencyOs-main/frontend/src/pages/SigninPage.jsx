import {SignIn, SignUp} from "@clerk/clerk-react"
// SigninPage component is used to render the sign-in page of the application. It uses the SignIn component from Clerk to handle user authentication. The routing prop is set to "path" to enable path-based routing, and the path prop is set to "/sign-in" to specify the URL for the sign-in page. The signUpUrl prop is set to "/sign-up" to provide a link for users who want to sign up instead of signing in.
function SigninPage()
{
    return <div className={"auth-container"}>
        <SignIn routing={"path"} path={"/sign-in"} signUpUrl={"/sign-up"} />

    </div>
}

export default SigninPage