import styles from "./Header.module.css";

export default function Header() {
    return (
        <header className={styles.header}>
            <h2 className={styles.text}>The Todo App For The Superior</h2>
            <button className={styles.signinbtn}>Sign In</button>
        </header>
    )
}