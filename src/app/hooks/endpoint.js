import { useState, useEffect } from "react"

export function useEndpoint() {
    const [endpoints, setEndpoints] = useState("/api/get-all-endpoints")

    useEffect(() => {
        async function fetchEndpoints() {
            const response = await fetch("/api/get-all-endpoints")
            const data = await response.json()
            setEndpoints(data)
        }
        fetchEndpoints()
    }, [])

    return { endpoints }
}
