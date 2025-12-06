import { FaGithub } from "react-icons/fa";
import "./Nav.css";

export default function Nav() {
  return (
    <div className="nav-wrapper"> 
        <a 
        href="https://github.com/dallas417/compliment"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="View source on GitHub"
        >
        <FaGithub size={40} />
        </a>
    </div>
  );
};