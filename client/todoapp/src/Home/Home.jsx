import styles from "./Home.module.css";

import Header from "./Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Hero from "./Hero/Hero.jsx";
import Testimonials from "./Testimonials/Testimonials.jsx";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header/>

            <Hero/>
            <Testimonials/>

            <h3 className={styles.ending}>So start using Todo App today!</h3>

            <Footer/>
        </div>
    );
}