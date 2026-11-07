import styles from "./Register.module.css";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

import RegisterForm from "./RegisterForm/RegisterForm.jsx";

export default function Register() {
    return (
        <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <Header>
                    <h3 className={styles.text}>Register</h3>
                </Header>
            </div>

            <RegisterForm />

            <Footer />
        </div>
    );
}