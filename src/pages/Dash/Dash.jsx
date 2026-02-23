import "./Dash.css";
import "../../assets/animate.css";
import compliments from "../../data/compliments.json";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { array as badwords } from "badwords-list"; 
import Swal from "sweetalert2";

export default function App() {
    const navigate = useNavigate(); 
    const [text, setText] = useState(null);
    const [ready, setReady] = useState(false);
    const [userHasInappropriateName, setUserHasInappropriateName] = useState(null);
    const textRef = useRef(null);
    const fadeOutTimeoutRef = useRef(null);
    const savedNameRef = useRef(localStorage.getItem("userName"));

    useEffect(() => {
        if (!savedNameRef.current) return navigate("/name");
        setReady(true);
    }, []);

    useEffect(() => { 
        checkNameAppropriate(savedNameRef.current);
    }, [ready])

    useEffect(() => {
        if (!ready || userHasInappropriateName === null) return;
        setDisplayedCompliment(savedNameRef.current);
        const intervalId = setInterval(setDisplayedCompliment, 7500, savedNameRef.current);
        
        return () => { 
            clearInterval(intervalId); 
            clearTimeout(fadeOutTimeoutRef.current);
        };
    }, [userHasInappropriateName])

    const checkNameAppropriate = (name) => {
        const lowerCaseName = name.toLowerCase();
        for (let i = 0; i < badwords.length; i++) {
            if (lowerCaseName.includes(badwords[i])) {
                Swal.fire({
                    icon: "warning",
                    title: "Inappropriate Names DO NOT deserve compliments!",
                    toast: true,
                    position: "top-end",
                    timer: 4000,
                    timerProgressBar: true,
                    showConfirmButton: false,
                })
                navigate("/name");
                return false;
            }
        }
        setUserHasInappropriateName(false);
    }

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