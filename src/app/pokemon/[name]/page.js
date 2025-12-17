"use client"

import styles from "@/app/page.module.css";
import { useEffect, useState } from "react";
import { pokemonData } from "@/app/utils/util";
import { useParams } from "next/navigation";
import { Card } from "@/app/components/Card/card";

export default function PokemonDetail() {
    const [pokemon, setPokemon] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)
    const params = useParams()

    useEffect(() => {
        async function fetchData() {
            try {
                setLoading(true)
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${params.name}`)

                if (!response.ok) throw new Error('Pokemon not found')

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
        <div className={styles.page}>
            <main className={styles.main}>
                <Card id={pokemon.id} name={pokemon.name} image={pokemon.sprites.front_default} />
            </main>
        </div>
    )
}