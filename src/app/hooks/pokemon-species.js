
import { useState, useEffect } from "react"
import { useEndpoint } from "./endpoint"

export function usePokemonSpecies(name) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    const { endpoints } = useEndpoint()

    useEffect(() => {
        async function fetchUrl() {
            try {
                setLoading(true)
                const fetchUrl = await fetch(`${endpoints["pokemon-species"]}${name}`)
                const result = await fetchUrl.json()
                const description = result.flavor_text_entries
                    .find((entry) => {
                        return entry.language.name === "en" &&
                            entry.version.name === "red"
                    })?.flavor_text
                setData(description)
            } catch (error) {
                setError(error.message)
            } finally {
                setLoading(false)
            }
        }
        fetchUrl()
    }, [name, endpoints])

    return { data, error, loading }
}



