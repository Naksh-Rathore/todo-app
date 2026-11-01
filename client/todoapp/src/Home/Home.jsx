import styles from "./Home.module.css";

import Header from "./Header/Header.jsx";
import Footer from "./Footer/Footer.jsx";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header/>

            <Footer/>
        </div>
    );
}