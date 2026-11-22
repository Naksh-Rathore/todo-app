import styles from "./LoginForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthProvider } from "../../../AuthProvider.jsx";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();

    const { isAuthenticated, tokenRef, login } = useAuthProvider();

    const submitForm = async e => {
        e.preventDefault();
        await login({ "username": username, "password": password });

        navigate("/todos");
    }

    return (
        <form className={styles.loginForm} onSubmit={submitForm}>
            <h2 className={styles.subtitle}>Log In</h2>

            <div className={styles.signininputs}>
                <label className={styles.labels}>Username: </label><br />
                <input className={styles.inputFields} type="text" placeholder="Username" value={username} onChange={e => { setUsername(e.target.value) }} /><br />

                <label className={styles.labels}>Password: </label><br />
                <input className={styles.inputFields} type="password" placeholder="Password" value={password} onChange={e => { setPassword(e.target.value) }} />
            </div>

            <button className={styles.submitButton} type="submit">Log In</button>
        </form>
    );
}