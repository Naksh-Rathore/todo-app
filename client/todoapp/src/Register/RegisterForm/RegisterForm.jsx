import styles from "./RegisterForm.module.css";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function RegisterForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [retypedPassword, setRetypedPassword] = useState("");

    const [registerMsg, setRegisterMsg] = useState("");
    const [registerMsgColor, setRegisterMsgColor] = useState("#000000");

    const navigate = useNavigate();

    const registerUser = async e => {
        e.preventDefault(); // Prevents page from refreshing when submitting

        if (password !== retypedPassword) {
            setRegisterMsgColor("#FF0000");
            setRegisterMsg("Passwords did not match");
            setRetypedPassword(""); // Not resetting password as well because that is very annoying

            return;
        }

        const url = "http://localhost:8000/api/accounts/register/";
        const payload = {
            "username": username,
            "email": "placeholder@placeholder.com", // Placeholder email (if not obvious)
            "password": password,
        };

        try {
            await axios.post(url, payload);

            setRegisterMsgColor("#000000");
            setRegisterMsg("Successfuly registered user. Taking to sign in...");

            navigate("/login");
        }

        catch (error) {
            setRegisterMsgColor("#FF0000");
            setRegisterMsg("Could not register user. Try again.");
        }

    };

    return (
        <form className={styles.registerForm} onSubmit={registerUser}>
            <h2 className={styles.subtitle}>Register</h2>

            <div className={styles.registerinputs}>
                <label className={styles.labels}>Username: </label><br />
                <input className={styles.inputFields} value={username} onChange={e => { setUsername(e.target.value) }} type="text" placeholder="Username" /><br />

                <label className={styles.labels}>Password: </label><br />
                <input className={styles.inputFields} value={password} onChange={e => { setPassword(e.target.value) }} type="password" placeholder="Password" /><br />


                <label className={styles.labels}>Retype Password: </label><br />
                <input className={styles.inputFields} value={retypedPassword} onChange={e => { setRetypedPassword(e.target.value) }} type="password" placeholder="Retype Password" />
            </div>

            <button className={styles.submitButton} type="submit">Register</button>
            <p className={styles.registerMsg} style={{ color: registerMsgColor }}>{registerMsg}</p>
        </form>
    );
}