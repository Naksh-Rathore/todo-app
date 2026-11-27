import styles from "./ProjectCard.module.css";

export default function ProjectCard({ name, dateCreated }) {
    return (
        <article className={styles.card}>
            <div className={styles.scrollArea}>
                {/* todos will go here later */}
            </div>

            <div className={styles.titleSection}>
                <h3 className={styles.name}>{name}</h3>
                <p className={styles.date}>{dateCreated}</p>
            </div>
        </article>
    );
}