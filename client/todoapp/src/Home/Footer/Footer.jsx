import styles from "./Footer.module.css";

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <span className={styles.text}>{new Date().getFullYear()} Todo App</span>
            <a className={styles.githublink} href="https://github.com/Naksh-Rathore/todo-app" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
        </footer>
    );
};