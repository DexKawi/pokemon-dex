import { useState, useEffect } from "react"

export function usePokemon(url) {
    const [data, setData] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch("/api/get-all-endpoints")
                if (!response.ok) { throw new Error("Failed to fetch endpoints!") }
                const endpoints = await response.json()

                const pokemonURL = await fetch(url || endpoints.pokemon)
                const pokemonData = await pokemonURL.json()


                const pokemonDataStructure = {
                    next: pokemonData.next,
                    previous: pokemonData.previous,
                    results: pokemonData.results.map((res) => ({
                        name: res.name,
                        url: res.url
                    }))
                }
                setData(pokemonDataStructure)
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        }
        fetchData();
    }, [url]);

    return { data, loading, error };
}

