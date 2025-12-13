"use client";

import styles from "./page.module.css";
import { PokemonCards } from "./components/PokemonCards/pokemon-cards";

export default function Home() {

  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <PokemonCards />
      </main>
    </div>
  );
}
