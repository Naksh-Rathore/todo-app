import styles from "./Todo.module.css";

import { useState, useEffect } from "react";

export default function Todo({ text, priority, isDone }) {
    const [isDoneState, setIsDoneState] = useState(isDone);

    return (
        <div className={styles.container}>
            <input type="checkbox" name="isDone" checked={isDoneState} onChange={e => { setIsDoneState(e.target.checked) }} />
            {text}
        </div>
    )
}