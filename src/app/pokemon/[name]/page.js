"use client"

import globalStyles from "@/app/page.module.css";
import styles from "../[name]/pokemon-detail.module.css"
import { useEffect, useState } from "react";
import { allCaps, formatPokemonGen, pokemonData } from "@/app/utils/util";
import { useParams } from "next/navigation";
import { Card } from "@/app/components/Card/card";
import { capitalize } from "@/app/utils/util";
import { Badge } from "@/app/components/Badges/badge";
import Link from "next/link";
import { usePokemonSpecies } from "@/app/hooks/pokemon-species";
import { Header } from "@/app/components/Header/header";

export default function PokemonDetail() {
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    const params = useParams()
    const { data: specData } = usePokemonSpecies(params.name)

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)
                const result = await response.json()
                const data = pokemonData(result);
                setPokemon(data);
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }

        if (params.name) {
            fetchData()
        }
    }, [params.name])

    if (loading) return <div className={styles.page}><main className={styles.main}><p>Loading...</p></main></div>
    if (error) return <div className={styles.page}><main className={styles.main}><p>Error: {error}</p></main></div>
    if (!pokemon) return <div className={styles.page}><main className={styles.main}><p>No data</p></main></div>

    return (
        <div className={globalStyles.page}>
            <main className={globalStyles.main}>
                <Header />
                <Link href={`/pokemon`}>Home</Link>
                <div className={styles.firstSection}>
                    <div className={styles.leftSectionWrapper}>
                        <h1 className={styles.pokemonName}>{capitalize(pokemon.name)}</h1>
                        <div className={styles.badgeSpacing}>
                            {pokemon.types.map((type, index) => {
                                return (
                                    <Badge key={index} badge={type} />
                                )
                            })}
                        </div>
                        <div className={styles.tableWrapper}>
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Pokemon ID</td>
                                        <td>#{pokemon.id}</td>
                                    </tr>
                                    <tr>
                                        <td>Introduced</td>
                                        <td>{formatPokemonGen(capitalize(pokemon.generation[0]))}</td>
                                    </tr>
                                    <tr>
                                        <td>Height</td>
                                        <td>{pokemon.height} cm</td>
                                    </tr>
                                    <tr>
                                        <td>Species</td>
                                        <td>{capitalize(pokemon.species)}</td>
                                    </tr>
                                    <tr>
                                        <td>Description</td>
                                        <td>{specData}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <Card id={pokemon.id} name={pokemon.name} image={pokemon.sprites.front_default} />
                </div>
                <div className={styles.stats}>
                    {pokemon.stats.map((p, index) => {
                        return (
                            <div key={index} className={styles.statsItem}>
                                <p>{allCaps(p.stat.name)}</p>
                                <p>{p.base_stat}</p>
                            </div>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}