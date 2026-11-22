import styles from "./LoginForm.module.css";

import { useState, useEffect } from "react";

import { useAuthProvider } from "../../../AuthProvider.jsx";
import axios from "axios";

export default function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const { token, login } = useAuthProvider();

    const submitForm = async e => {
        e.preventDefault();
        await login({ "username": username, "password": password });

        try {
            const response = await axios.get("http://localhost:8000/api/accounts/user/");
            console.log(response.data);
        }

        catch (err) {
            console.error(err.response?.status, err.response?.data); 
        }
    }

    useEffect(() => {
        console.log(token);
    }, [token]);

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