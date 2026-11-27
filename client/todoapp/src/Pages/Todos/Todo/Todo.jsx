import styles from "./Todo.module.css";

import { useState } from "react";

export default function Todo({ text, priority = 1, isDone = false }) {
    const [isDoneState, setIsDoneState] = useState(isDone);
    const [priorityState, setPriorityState] = useState(priority);

    const cyclePriority = () => {
        setPriorityState(p => (p % priorityColours.length) + 1);
    };

    const priorityColours = [
        "#00cccc80", // 1: Low
        "#ffa60099", // 2: Medium
        "#cc0000a6", // 3: High
    ];

    return (
        <div className={styles.container} style={{ background: priorityColours[priorityState - 1] }} onClick={cyclePriority}>
            <input type="checkbox" name="isDone" checked={isDoneState} onChange={e => setIsDoneState(e.target.checked)} onClick={e => e.stopPropagation()}/>
            {text}
        </div>
    );
}