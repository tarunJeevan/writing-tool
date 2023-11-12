import axios from '../api/axios'
import useAuth from './useAuth'

export default function useLogout() {
    const { setAuth } = useAuth()

    const logout = async () => {
        setAuth({})

        // Call the logout endpoint on the server
        try {
            const response = await axios.get('/logout', {
                withCredentials: true
            })
        } catch (error) {
            console.error(error)
        }
    }

    // Return the function
    return logout
}