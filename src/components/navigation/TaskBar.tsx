import theme from "tailwindcss/defaultTheme";
import {useEffect, useState} from "react";
import StartBar from "@/components/navigation/StartBar";

export default function TaskBar() {
    const [menu, setMenu] = useState("");
    const [time, setTime] = useState(new Date().toLocaleTimeString());
    const [date, setDate] = useState(new Date().toLocaleDateString());

    function toggleMenu() {
        setMenu(menu === "hidden" ? "" : "hidden");
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setTime(new Date().toLocaleTimeString());
            setDate(new Date().toLocaleDateString());
        }, 1000);

        return () => clearInterval(interval);
    }, []);

    return (
        <>
        <div className="bg-quaternary fixed bottom-0 w-screen h-12 z-[50]">

            <button className="relative top-[10px] h-4/6 w-20 bg-quinary left-4" onClick={toggleMenu}>
                <div className="relative h-full w-full bg-quinary">
                    <div className="z-10 absolute bottom-[2px] right-0.5 h-full w-full bg-quinary shadow-lg" />
                    <div className="z-0 absolute h-full w-full bg-primary" />
                </div>
            </button>
            <div className="absolute right-64 bottom-2 bg-primary w-1 h-4/6" />
            <h1 className="absolute right-1 bottom-1 font-extrabold text-4xl">{date} {time}</h1>
        </div>
        {menu && <StartBar />}
    </>
    );
}
