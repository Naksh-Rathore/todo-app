import styles from "./Home.module.css";

import Header from "../Header/Header.jsx";
import Footer from "../Footer/Footer.jsx";
import Hero from "./Hero/Hero.jsx";
import Testimonials from "./Testimonials/Testimonials.jsx";

import { Link } from "react-router-dom";

export default function Home() {
    return (
        <div className={styles.container}>
            <Header>
                <h2 className={styles.text}>The Todo App For The Superior</h2>

                <button className={styles.signinbtn}>
                    <Link to="/login" className={styles.signinlink}>Sign In</Link>
                </button>
            </Header>

            <Hero/>
            <Testimonials/>

            <h3 className={styles.ending}>So start using Todo App today!</h3>

            <Footer/>
        </div>
    );
}