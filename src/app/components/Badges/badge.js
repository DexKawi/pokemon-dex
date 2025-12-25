import Image from "next/image"
import { capitalize } from "@/app/utils/util"
import styles from "../Badges/badge.module.css"

const badgeIcons = {
    dark: "/types-logo/512px-Dark.png",
    electric: "/types-logo/512px-Electric.png",
    fairy: "/types-logo/512px-Fairy.png",
    fighting: "/types-logo/512px-Fighting.png",
    ice: "/types-logo/512px-Ice.png",
    normal: "/types-logo/512px-Normal.png",
    poison: "/types-logo/512px-Poison.png",
    psychic: "/types-logo/512px-Psychic.png",
    rock: "/types-logo/512px-Rock.png",
    steel: "/types-logo/512px-Steel.png",
    water: "/types-logo/512px-Water.png",
    grass: "/types-logo/512px-Grass.png",
    ghost: "/types-logo/512px-Ghost.png",
    flying: "/types-logo/512px-Flying.png",
    bug: "/types-logo/512px-Bug.png",
    ground: "/types-logo/512px-Ground.png",
    fire: "/types-logo/512px-Fire.png",
    dragon: "/types-logo/512px-Dragon.png",
}
export function Badge(props) {
    const badgeIcon = badgeIcons[props.badge]

    if (!badgeIcon) {
        return (
            <div className={styles.badgeName}>
                {capitalize(props.badge)}
            </div>
        );
    }

    return (
        <div className={styles.badge}>
            <Image
                src={badgeIcon}
                alt={capitalize(props.badge + `-type`)}
                width={20}
                height={20}
            />
            <span>{capitalize(props.badge)}</span>
        </div>
    )
}