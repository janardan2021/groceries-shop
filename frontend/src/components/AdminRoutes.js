import { Outlet, Navigate } from "react-router-dom"
import { useUsersContext } from "../hooks/useUsersContext.js"

const AdminRoutes = () => {
    const {state: user} = useUsersContext()
  return user && user.isAdmin ? <Outlet /> : <Navigate to='/login' replace />
}

export default AdminRoutes
