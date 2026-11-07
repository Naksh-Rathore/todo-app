import styles from "./RegisterForm.module.css";

export default function RegisterForm() {
    return (
        <form className={styles.registerForm}>
            <h2 className={styles.subtitle}>Register</h2>

            <div className={styles.registerinputs}>
                <label className={styles.labels}>Username: </label><br/>
                <input className={styles.inputFields} type="text" placeholder="Username"/><br/>

                <label className={styles.labels}>Password: </label><br/>
                <input className={styles.inputFields} type="password" placeholder="Password"/><br/>


                <label className={styles.labels}>Re-enter Password: </label><br/>
                <input className={styles.inputFields} type="password" placeholder="Password"/>
            </div>

            <button className={styles.submitButton} type="submit">Register</button>
        </form>
    );
}