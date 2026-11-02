import styles from "./Testimonials.module.css";
import Testimonial from "./Testimonial/Testimonial";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Testimonials() {
    const testimonials = useRef();

    useEffect(() => {
        axios.get('http://localhost:8000/api/testimonials')
            .then(response => {
                testimonials.current = response.data;
            })
            .catch(error => {
                console.error('Request failed:', error.message);
            });
    }, []);

    return (
        <section className={styles.container}>
            <h2 className={styles.header}>Our Testimonials</h2>
        </section>
    )
}