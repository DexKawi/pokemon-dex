import styles from "@/app/page.module.css";

export default async function PokemonDetail({ params }) {
    const { slug } = await params

    return (
        <div className={styles.page}>
            <main className={styles.main}>
                <p>{slug}</p>
            </main>
        </div>
    )
}