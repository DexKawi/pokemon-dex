"use client"

import styles from "./header.module.css"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { capitalize } from "@/app/utils/util"

function Breadcrumb() {
    const urlPath = usePathname()

    const segments = urlPath.split("/").filter(segment => segment !== "")

    const navigations = [
        // { label: "Home", href: "/" },
        ...segments.map((segment, index) => {
            const href = "/" + segments.slice(0, index + 1).join("/")
            console.log(segment)
            return {
                label: capitalize(segment),
                href: href
            }
        })
    ]



    if (segments.length === 0) {
        return <div><p>Home</p></div>
    }

    return (
        <div>
            {navigations.map((nav, index) => {
                const isLast = index === navigations.length - 1

                return (
                    <span key={nav.href}>
                        {isLast ? (
                            <span>{nav.label}</span>
                        ) : (
                            <>
                                <Link href={nav.href}>{nav.label}</Link>
                                <span> {`>`} </span>
                            </>
                        )}
                    </span>
                )
            })}
        </div>
    )
}

export function Header() {
    return (
        <div>

            <div className={styles.wrapper}>
                <div className={styles.navigation}>
                    <Breadcrumb />
                </div>
            </div>
        </div>
    )
}