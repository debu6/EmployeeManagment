import { SignInButton } from "@clerk/clerk-react"

const Login=()=>{
    return(
        <div className='login'>
        <h1>Employee Management</h1>
        <span>You are not authenticate, click sign in to authenticate</span>
        <SignInButton>
          <button className='btn btn-success'>
            Sign In
          </button>
        </SignInButton>
      </div>
    )
}

export default Login