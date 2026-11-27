// To Do: Make a card component for each project
// When that is done, work on the todos in each project
// To represent the priority, have a colour around the checkbox on each todo

import styles from "./Todos.module.css"

import Header from "../../Header/Header.jsx";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuthProvider } from "../../AuthProvider.jsx";

import ProjectCard from "./ProjectCard/ProjectCard.jsx";

export default function Todos() {
    const [username, setUsername] = useState("");
    const { isAuthenticated, isLoading, logout } = useAuthProvider();

    const [todoData, setTodoData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        if (isLoading || !isAuthenticated) return;

        const fetchUsername = async () => {
            const { data } = await axios.get("http://localhost:8000/api/accounts/user/");
            setUsername(data.username);
        };

        const fetchTodos = async () => {
            const { data: todos } = await axios.get("http://localhost:8000/api/todos/projects/");
            setTodoData(todos);
        };

        fetchUsername();
        fetchTodos();
    }, [isLoading, isAuthenticated]);

    useEffect(() => {
        if (!isAuthenticated && !isLoading) {
            navigate("/login");
        }
    }, [isLoading, isAuthenticated, navigate]); // isLoading is in the dependency array since the first time we render is it almost always true

    const signOut = async () => {
        await logout();
        navigate("/");
    };

    return (
        <div className={styles.container}>
            <div className={styles.headerContainer}>
                <Header className={styles.header}>
                    <h2 className={styles.welcomeText}>Welcome {username}</h2>
                    <button className={styles.signOutBtn} onClick={signOut}>Sign Out</button>
                </Header>
            </div>

            <div className={styles.projectGrid}>
                {todoData.map(project => (
                    <ProjectCard key={project.id} name={project.name} dateCreated={new Date(project.date_created).toLocaleDateString("en-CA")} todos={project.todos}/>
                ))}
            </div>
        </div>
    );
}