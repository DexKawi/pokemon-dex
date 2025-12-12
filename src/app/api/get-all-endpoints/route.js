import { NextResponse } from "next/server";

export async function GET(params) {
    const POKE_API = "https://pokeapi.co/api/v2/pokemon"

    if (!POKE_API) {
        throw new Error("PokeAPI initialized improperly!")
    }

    const response = await fetch(POKE_API, { cache: 'force-cache' })

    if (!response.ok) {
        throw new Error("No response from the server!")
    }

    const data = await response.json()

    return NextResponse.json(data)
}