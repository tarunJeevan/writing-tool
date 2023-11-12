import axios from "../api/axios"
import useAuth from "./useAuth"

export default function usePopulateDocs() {
    const { auth } = useAuth()

    const populateDocs = async () => {
        const response = await axios.post('/docs',
            JSON.stringify({ username: auth.username }),
            {
                headers: { 'Authorization': `Bearer ${auth?.accessToken}`, 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )

        // Return the docs sent by the server
        return response.data.manuscripts
    }

    return populateDocs
}
