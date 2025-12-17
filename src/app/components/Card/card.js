import Image from "next/image"
import styles from "../Card/card.module.css"
import { useState } from "react"
import { Button } from "../Button/button"

export function Card(props) {
    const [imageType, setImageType] = useState(false)

    const normalImageType = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${props.id}.png`

    const shinyImageType = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/shiny/${props.id}.png`

    return (
        <div className={styles.wrapper}>
            <div className={styles.imageWrapper}>
                <Image
                    src={imageType ? shinyImageType : normalImageType}
                    width={128}
                    height={128}
                    alt={`Picture of ${props.name}`}
                    loading="eager" />
            </div>
            <Button onClick={() => { setImageType(false) }}>Normal</Button>
            <Button onClick={() => { setImageType(true) }}>Shiny</Button>
        </div>
    )
}