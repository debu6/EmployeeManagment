import { SignOutButton, UserButton } from "@clerk/clerk-react"

const MainContainer = ({ children }) => {
    return (
        <div className=" bg-light vh-100 m-0  p-3 p-md-3">
            <div className=" border border-secondary rounded pt-5 pt-md-3 m-3 p-4 p-md-5 h-95">
              <div className="profile-position">
                <UserButton/>
          
              </div>
              <div className="px-md-3 pt-3 pt-md-5">
              {children}
              </div>
            </div>
        </div>
    )
}

export default MainContainer 