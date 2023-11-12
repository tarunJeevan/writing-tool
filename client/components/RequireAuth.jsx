import { Outlet } from "react-router-dom"
import useAuth from "../hooks/useAuth"
import Unauthorized from "../pages/Unauthorized"

export default function RequireAuth() {
    const { auth } = useAuth()

    return (
        auth?.accessToken
            ? <Outlet />
            : <Unauthorized />
    )
}