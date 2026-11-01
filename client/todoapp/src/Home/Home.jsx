import styles from "./Home.module.css";

import Header from "./Header/Header.jsx"

export default function Home() {
    return (
        <div className={styles.container}>
            <Header/>
        </div>
    );
}