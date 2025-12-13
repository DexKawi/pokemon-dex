import { usePokemon } from "../hooks/pokemon-data"
import { useState, useEffect } from "react"
import Link from "next/link"

export function PokemonCards() {
    const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

    const { data, error, loading } = usePokemon(currentURL)

    function nextPage() {
        if (data.next) setCurrentURL(data.next)
    }

    function previousPage() {
        if (data.previous) setCurrentURL(data.previous)
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {data.results.map((p, i) => (
                <p key={i} className="grid-col-5">{p.name}</p>
            ))}
            <button onClick={previousPage} disabled={!data.next}>Sebelumnya</button>
            <button onClick={nextPage} disabled={!data.next}>Selanjutnya</button>
        </div>


    )
}