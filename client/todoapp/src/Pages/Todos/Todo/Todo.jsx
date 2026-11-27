import styles from "./Todo.module.css";

export default function Todo({ text, priority, isDone }) {
    return (
        <span className={styles.container}>
            {text}
        </span>
    )
}