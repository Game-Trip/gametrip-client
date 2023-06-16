import { Link } from "react-router-dom";
import "./NotFoundPage.css";
import { useEffect, useRef } from "react";

export default function NotFound() {

  const blinkerRef = useRef<HTMLSpanElement>(null);
  const typeRef = useRef<HTMLSpanElement>(null);
  let typeText: any[] = [];

  const writeLetter = (letter: string) => {
    typeText = typeText.concat([letter]);
    typeRef.current!.innerHTML = typeText.join('').toLowerCase();
  }

  const deleteLetter = () => {
    typeText = typeText.slice(0, typeText.length - 1);
    typeRef.current!.innerHTML = typeText.join('').toLowerCase();
  }

  useEffect(() => {
    let switcher = true;

    const blink = setInterval(() => {
      blinkerRef.current!.style.visibility = switcher ? "visible" : "hidden";
      switcher = !switcher;
    }, 350);

    window.onkeydown = function (e) {
      const key = e.keyCode;
      const code = String.fromCharCode(96 <= key && key <= 105 ? key - 48 : key);
      console.log(e.key);
      switch (e.key) {
        case "Backspace":
          deleteLetter();
          break;

        case "Enter":
          console.log(e);
          // console.log(text);

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
    <div>
      <p><span className="username">[user@hacker]$</span> cd .{window.location.pathname}</p>
      <p className='error'>bash: 404: ".{window.location.pathname}" webpage not found</p>
      <p><span className="username">[user@hacker]$</span> <span id='type' ref={typeRef}>return</span><span ref={blinkerRef}>_</span></p>
    </div>
  )
}