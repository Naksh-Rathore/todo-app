import styles from "./Hero.module.css";

import { Link } from "react-router-dom";

export default function Hero() {
    return (
        <section className={styles.hero}>
            <div className={styles.textContainer}>
                <h1>Todo App</h1>
                <h3>Take notes brilliantly</h3>

                <button className={styles.signupbtn}>
                    <Link to="/register" className={styles.signuplink}>Sign Up</Link>
                </button>
            </div>

            <img className={styles.img} src="/todo.jpg"/>
        </section>
    );
}