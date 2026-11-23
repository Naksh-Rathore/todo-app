import styles from "./LoginForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthProvider } from "../../../AuthProvider.jsx";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [loginMsg, setLoginMsg] = useState("");

    const navigate = useNavigate();

    const { login, isAuthenticated, isLoading } = useAuthProvider();

    const submitForm = async e => {
        e.preventDefault();
        
        try {
            await login({ "username": username, "password": password });
            navigate("/todos");
        }

        catch (error) {
            setLoginMsg("Could not log in");
        }
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

            {!isAuthenticated && !isLoading && <button className={styles.submitButton} type="submit">Log In</button>}
            <p className={styles.loginMsg}>{loginMsg}</p>
        </form>
    );
}