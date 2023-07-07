import { Link, useNavigate } from "react-router-dom";
import "./NotFoundPage.css";
import { useEffect, useRef, useState } from "react";
import React from 'react';
import Localize from "../../components/Translations/TranslationConext";

const typeText: any[] = [];
export default function NotFound() {

  const typeRef = useRef<HTMLSpanElement>(null);
  const [error, setError] = useState(`bash: 404: ".${window.location.pathname}" webpage not found`);
  const [text, setText] = useState('');
  const naviagte = useNavigate();
  const localize = Localize();

  const writeLetter = (letter: string) => {
    setText((old) => old + letter.toLowerCase());
  }

  const deleteLetter = () => {
    setText((old) => old.slice(0, old.length - 1));
  }

  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible((old) => !old);
    }, 350);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {


    window.onkeydown = function (e: any) {
      const key = e.keyCode;
      const code = String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
      switch (e.key) {
        case "Backspace":
          deleteLetter();
          break;

        case "Enter":
          if (text.split(" ")[0] === "cd") {
            naviagte(text.slice(text.indexOf(" ") + 1, text.length))
          }
          else if (text === "return" || text === "back") { naviagte(-1) }
          else if (text === "dercraker") {
            setText("");
            setError(localize.translate("404.EasterEggDercraker"));
            setTimeout(() => window.open("https://www.twitch.tv/flexingseal", "_blank"), 2000);
          }
          else if (text === "mhd") {
            setText("");
            setError("Opening free discord nitro givaway...");
            setTimeout(() => window.open("https://www.youtube.com/watch?v=8CBjKLGwLqE", "_blank"), 2000);
          }
          else {
            setError(`${localize.translate("404.Bash")} : ${text.slice(text.indexOf(" ") + 1, text.length)}: ${localize.translate("404.NotFoundCommand")}`);
            setText("");
          }
          break;

        default:
          if (/[a-zA-Z0-9-_ ]/.test(code)) {
            writeLetter(code);
          }
          break;
      }


    };
  }, [deleteLetter, writeLetter]);


  return (
    <div className="notFoundContainer">
      <p><span className="username">[{localize.translate("404.Username")}]$</span> cd .{window.location.pathname}</p>
      <p className='error'>{error}</p>
      <p><span className="username">[{localize.translate("404.Username")}]$</span> <span id='type' ref={typeRef}>{text}</span>{isVisible && (<span >_</span>)}</p>
    </div>
  )
}