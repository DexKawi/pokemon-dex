import { usePokemon } from "../../hooks/pokemon-lists"
import { useState } from "react"
import { Button } from "../Button/button"
import Image from "next/image"
import styles from "../PokemonCards/pokemon-cards.module.css"
import { capitalize } from "@/app/utils/util"
import Link from "next/link"
import { getPokemonId } from "@/app/utils/util"

export function PokemonCards() {
    const [currentURL, setCurrentURL] = useState("https://pokeapi.co/api/v2/pokemon?limit=20")

    const { data, error, loading } = usePokemon(currentURL)

    function nextPage() {
        if (data.next) {
            setCurrentURL(data.next)
        }
    }

    function previousPage() {
        if (data.previous) {
            setCurrentURL(data.previous)
        }
    }

    if (loading) return <p>Loading...</p>
    if (error) return <p>Error: {error}</p>

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.grid}>
                    {data.results.map((pokemon) => {
                        const id = getPokemonId(pokemon.url)
                        return (
                            <Link key={id} href={`/pokemon/${pokemon.name}`}>
                                <div key={id} className={styles.card} >
                                    <p className={styles.pokemonName}>{capitalize(pokemon.name)}</p>
                                    <Image
                                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
                                        width={96}
                                        height={96}
                                        alt={`Picture of ${pokemon.name}`}
                                        loading="eager"
                                    />
                                    <p className={styles.id}>{id}</p>
                                </div>
                            </Link>
                        )
                    })}
                </div>

                <div className={styles.button}>
                    <Button onClick={previousPage} disabled={!data.previous}>Previous</Button>
                    <Button onClick={nextPage} disabled={!data.next}>Next</Button>
                </div>
            </div>
        </div>
    )
}