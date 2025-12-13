"use client";

import styles from "./page.module.css";
import { PokemonCards } from "./components/pokemon-cards";
import { usePokemon } from "./hooks/pokemon-data";

export default function Home() {

  const { data, error, loading } = usePokemon()

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PokemonCards />
      </main>
    </div>
  );
}
