import styles from "./Testimonials.module.css";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Testimonials() {
    const testimonials = useRef([]);
    const currentIndex = useRef(0);
    const [currentTestimonial, setCurrentTestimonial] = useState();

    useEffect(() => {
        axios.get('http://localhost:8000/api/testimonials')
            .then(response => {
                testimonials.current = response.data;
                setCurrentTestimonial(testimonials.current[currentIndex.current]);
            })
            .catch(error => {
                console.error('Request failed:', error.message);
            });
    }, []);

    return (
        <section className={styles.container}>
            <h2 className={styles.header}>Our Testimonials</h2>
            
            <article className={styles.testimonial}>
                <img src={currentTestimonial?.imageURL} className={styles.pfp}/>
                <h2 className={styles.name}>{currentTestimonial?.name}</h2>
                <p className={styles.review}>{currentTestimonial?.review}</p>
            </article>
        </section>
    )
}