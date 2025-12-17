export function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export function pokemonData(result) {
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

    return pokemonDataStructure
}

export function getPokemonId(url) {
    const parts = url.split('/')
    return parts[parts.length - 2]
}