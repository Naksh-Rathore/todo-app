import styles from "./Hero.module.css";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.textContainer}>
                <h1>Todo App</h1>
                <h3>The app for the superior</h3>

                <button className={styles.signinbtn}>Sign In</button>
            </div>

            <img className={styles.img} src="/todo.jpg"/>
        </section>
    );
}