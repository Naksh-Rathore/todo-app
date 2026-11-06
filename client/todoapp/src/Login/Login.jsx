import styles from "./Login.module.css";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";

export default function Login() {
    return (
        <div className={styles.container}>
            <div className={styles.headerWrapper}>
                <Header>
                    <h3 className={styles.text}>Sign In</h3>
                </Header>
            </div>

            <Footer/>
        </div>
    );
}