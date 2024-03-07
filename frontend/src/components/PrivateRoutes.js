import { Outlet, Navigate } from "react-router-dom"
import { useUsersContext } from "../hooks/useUsersContext.js"

const PrivateRoutes = () => {
    const {state: user} = useUsersContext()
  return user ? <Outlet /> : <Navigate to='/login' replace />
}

export default PrivateRoutes
