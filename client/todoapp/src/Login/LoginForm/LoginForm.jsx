import styles from "./LoginForm.module.css";

export default function LoginForm() {
    return (
        <form className={styles.loginForm}>
            <h2 className={styles.subtitle}>Log In</h2>

            <div className={styles.signininputs}>
                <label className={styles.labels}>Username: </label><br/>
                <input className={styles.inputFields} type="text" placeholder="Username"/><br/>

                <label className={styles.labels}>Password: </label><br/>
                <input className={styles.inputFields} type="password" placeholder="Password"/>
            </div>

            <button className={styles.submitButton} type="submit">Log In</button>
        </form>
    );
}