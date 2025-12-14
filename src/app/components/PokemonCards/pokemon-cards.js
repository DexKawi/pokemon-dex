import { usePokemon } from "../../hooks/pokemon-lists"
import { useState, useEffect } from "react"
import { Button } from "../Button/button"
import { usePokemonDetail } from "@/app/hooks/pokemon-detail"
import Image from "next/image"

export function PokemonCards() {
    const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")
    const [pokemonIdURL, setPokemonIdURL] = useState(null)

    const { data, error, loading } = usePokemon(currentURL)
    const { data: pokemonDetail } = usePokemonDetail(pokemonIdURL)

    function nextPage() {
        if (data.next) setCurrentURL(data.next)
    }

    function previousPage() {
        if (data.previous) setCurrentURL(data.previous)
    }

    // function pokemonImage(imageURL, id) {
    //     const result = imageURL.split("/")
    //     const dissectedResult = result.pop()
    //     return result.join("/") + "/" + id + ".png"
    // }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div>
            {data.results.map((p, i) => (
                <div key={i} onClick={() => { setPokemonIdURL(p.url) }}>
                    <p className="grid-col-5">{p.name}</p>
                    <Image
                        src={pokemonDetail.sprites.front_default}
                        width={50}
                        height={50}
                        alt={`Picture of ${p.name}`}
                        loading="eager" />
                </div>
            ))}
            <p>This name is from pokemonDetail: {pokemonDetail.name}</p>
            <Button><a onClick={previousPage} disabled={!data.next}>Sebelumnya</a></Button>
            <Button><a onClick={nextPage} disabled={!data.next}>Selanjutnya</a></Button>
        </div>

    )
}