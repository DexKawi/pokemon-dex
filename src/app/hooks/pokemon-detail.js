import { useState, useEffect } from "react"

export function usePokemonDetail(name) {
    const [data, setData] = useState(null)

    useEffect(() => {
        async function fetchPokemonDetail() {
            const response = await fetch(`"https://pokeapi.co/api/v2/pokemon/${name}` || "https://pokeapi.co/api/v2/pokemon/1/")
            const result = await response.json()

            const pokemonDataStructure = {
                id: result?.id || null,
                name: result?.name || "Unknown",
                generation: result?.past_abilities.map(g => g.generation.name) || [],
                height: result?.height || 0,
                species: result?.species?.name || result?.species || "Unknown",
                sprites: {
                    front_default: result?.sprites.front_default || null,
                    back_default: result?.sprites.back_default || null
                },
                types: result?.types?.map(type => type.type.name) || [],
                stats: result?.stats || [],
            };

            setData(pokemonDataStructure)
        }
        fetchPokemonDetail()
    }, [id])

    return { data }
}