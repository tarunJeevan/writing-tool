import useAuth from './useAuth'
import axios from '../api/axios'

export default function useRefreshToken() {
    const { setAuth } = useAuth()

    const refresh = async () => {
        const response = await axios.get('/refresh', {
            withCredentials: true
        })
        setAuth(prev => {
            return { ...prev,username: response.data.username, accessToken: response.data.accessToken }
        })
        return response.data.accessToken
    }

    return refresh
}
