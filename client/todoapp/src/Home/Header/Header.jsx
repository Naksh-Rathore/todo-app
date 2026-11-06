import styles from "./Header.module.css";

import { Link } from "react-router-dom";

export default function Header() {
    return (
        <header className={styles.header}>
            <h2 className={styles.text}>The Todo App For The Superior</h2>

            <button className={styles.signinbtn}>
                <Link to="/login" className={styles.signinlink}>Sign In</Link>
            </button>
        </header>
    )
}