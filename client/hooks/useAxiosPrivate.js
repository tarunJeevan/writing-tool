import { axiosPrivate } from "../api/axios"
import { useEffect } from "react"
import useRefreshToken from "./useRefreshToken"
import useAuth from "./useAuth"

export default function useAxiosPrivate() {
    const refresh = useRefreshToken()
    const { auth } = useAuth()

    useEffect(() => {
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                // If the request doesn't already have the access token, then use the one from auth, i.e., the current user
                if (!config.headers['Authorization'])
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`

                // There's no need to change anything so return config as is
                return config
            }, error => Promise.reject(error)
        )

        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async error => {
                const prevRequest = error?.config
                if (error?.response?.status === 403 && !prevRequest?.sent) {
                    // Set 'sent' to true so a request is only sent twice
                    prevRequest.sent = true
                    // Create new access token and update the previous request with it
                    const newAccessToken = await refresh()
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`
                    // Send the updated previous request
                    return axiosPrivate(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        // Remove interceptors before unmounting so it doesn't get all clogged up
        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept)
            axiosPrivate.interceptors.response.eject(responseIntercept)
        }
    }, [auth, refresh])

    // Returns an instance of axiosPrivate that has interceptors added on to it to handle access token expiration and refreshing
    return axiosPrivate
}