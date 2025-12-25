import styles from "../Button/button.module.css"

export function Button({ children, ...props }) {
    return (
        <div>
            <button className={styles.content}{...props}>
                {children}
            </button>
        </div>
    )

}