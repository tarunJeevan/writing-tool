import { useNavigate } from 'react-router-dom'
import useLogout from "../hooks/useLogout"

export default function Logout() {
    const logout = useLogout()
    const navigate = useNavigate()

    const signOut = async () => {
        await logout()
        navigate('/login')
    }

    signOut()
}
