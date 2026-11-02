import styles from "./Testimonial.module.css";

export default function Testimonial({ name, review, imageURL }) {
    return (
        <article className={styles.container}>
            <img src={`${imageURL}`}/>
            <h3>{name}</h3>
            <p>{review}</p>
        </article>
    )
}