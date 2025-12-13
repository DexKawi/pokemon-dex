import { useState, useEffect } from "react"
import { useEndpoint } from "./endpoint"

export function usePokemonDetail() {

    const { endpoints } = useEndpoint()

    useEffect(() => {
        async function fetchPokemonDetail() {
            const endpoint = await fetch(endpoints.pokemon)
            const data = await endpoint.json()

            console.log(data)
        }
        fetchPokemonDetail()
    }, [])


}
