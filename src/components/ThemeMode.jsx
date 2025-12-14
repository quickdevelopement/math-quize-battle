import { useState } from "react";


export default function ThemeMode() {
    const [dark, setDark] = useState(false);

    const handleDark = () => {
        // On page load or when changing themes, best to add inline in `head` to avoid FOUC
        document.documentElement.classList.toggle(
            "dark",
            localStorage.theme === "dark" ||
            (!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
        );
        setDark(!dark);
      

        localStorage.theme = dark ? "dark" : "light";
    
    }

    return(
        <button onClick={handleDark} className="px-2 py-1 w-12 h-12 border rounded">{dark ? "☀️" : "🌙"}</button>
    )
}