import { usePokemon } from "../../hooks/pokemon-lists"
import { useState, useEffect } from "react"
import { Button } from "../Button/button"

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
                <div key={i}>
                    <p className="grid-col-5">{p.name}</p>
                </div>
            ))}
            <Button><a onClick={previousPage} disabled={!data.next}>Sebelumnya</a></Button>
            <Button><a onClick={nextPage} disabled={!data.next}>Selanjutnya</a></Button>
        </div>

    )
}