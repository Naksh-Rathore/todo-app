import styles from "./ProjectCard.module.css";

import Todo from "../Todo/Todo.jsx";

export default function ProjectCard({ name, dateCreated, todos }) {
    return (
        <article className={styles.card}>
            <div className={styles.scrollArea}>
                {todos.map(todo => (
                    <div>
                        <Todo key={todo.id} text={todo.name} priority={todo.priority} isDone={todo.is_done} />
                    </div>
                ))}
            </div>

            <div className={styles.titleSection}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.date}>{dateCreated}</p>
            </div>
        </article>
    );
}