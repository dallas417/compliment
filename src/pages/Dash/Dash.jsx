import "./Dash.css";
import "../../assets/animate.css";
import compliments from "../../data/compliments.json";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate(); 
    const [text, setText] = useState(null);
    const [ready, setReady] = useState(false);
    const textRef = useRef(null);
    const fadeOutTimeoutRef = useRef(null);
    const savedNameRef = useRef(localStorage.getItem("userName"));

    useEffect(() => {
        if (!savedNameRef.current) return navigate("/name");
        setReady(true);
    }, []);

    useEffect(() => {
        setDisplayedCompliment(savedNameRef.current); 

        const intervalId = setInterval(setDisplayedCompliment, 7500, savedNameRef.current);

        return () => { 
            clearInterval(intervalId); 
            clearTimeout(fadeOutTimeoutRef.current);
        };
    }, [ready])

    const setDisplayedCompliment = (nameToUse) => {
        if (!textRef.current) return;

        textRef.current.style.animation = "fadeIn 1s";
        const randomIndex = Math.floor(Math.random() * compliments.length);
        const rawCompliment = compliments[randomIndex];
        const personalCompliment = rawCompliment.replace("${name}", nameToUse); 
        setText(personalCompliment);

        fadeOutTimeoutRef.current = setTimeout(() => {
            textRef.current?.style && (textRef.current.style.animation = "fadeOut 1s forwards");
        }, 6400);
    };

    const changeName = () => navigate("/name");

    if (!ready) return null; 
    return (
        <div className="app">
            <button onClick={changeName}> Change Name </button> 
            <p ref={textRef}> {text} </p>
        </div>
    )
}