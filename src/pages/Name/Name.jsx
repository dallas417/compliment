import "./Name.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function App() {
    const navigate = useNavigate(); 
    const [name, setName] = useState(null);
    const [text, setText] = useState(null);
    const [nameInputDisabled, setNameInputDisabled] = useState(false);

    useEffect(() => {
        if (!name || name === "") return setText("");
        setText("Press enter to continue");
    }, [name]);

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            setNameInputDisabled(true);
            localStorage.setItem("userName", name);
            navigate("/");
        }
    }

    document.addEventListener("keypress", handleKeyPress)

    return (
        <div className="name-page"> 
            <p> {text} </p>
            <input 
                placeholder="Enter your name" 
                onChange={(e) => setName(e.target.value)}
                disabled={nameInputDisabled}
                maxLength={12}
            />
        </div>
    )
}