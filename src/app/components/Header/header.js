"use client"

import styles from "./header.module.css"
import { usePathname } from "next/navigation"
import { capitalize } from "@/app/utils/util"

function Breadcrumb() {
    const urlPath = usePathname()
    const splitUrl = urlPath.split("/")
    const navigations = [{
        label: "Pokemon",
        href: "/pokemon"
    },
    {
        label: capitalize(splitUrl.findLast()),
        href: `/${splitUrl.findLast()}`
    }]

    return (
        <div>
            <p>{formatSlash}</p>
        </div>
    )
}

export function Header() {

    return (
        <div>
            <div className={styles.wrapper}>
                <p>Test</p>
                <p>Test 2</p>
            </div>
            <div>
                <Breadcrumb />
            </div>

        </div>
    )
}