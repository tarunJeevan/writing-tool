import axios from "../api/axios"
import useAuth from "./useAuth"

const SERVER_URL = ''

export default function useCreateProject() {
    const { auth } = useAuth()

    const createProject = async (name, parentFolder) => {
        const response = await axios.post(SERVER_URL,
            JSON.stringify({ username: auth.username, name: name, parent: parentFolder }),
            {
                headers: { 'Authorization': `Bearer ${auth?.accessToken}`, 'Content-Type': 'application/json' },
                withCredentials: true
            }
        )

        // Return the docs sent by the server
        return response.data.manuscripts
    }

    return createProject
}
