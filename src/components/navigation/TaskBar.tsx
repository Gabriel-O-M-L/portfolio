import theme from "tailwindcss/defaultTheme";
import { useEffect, useState } from "react";
import StartBar from "@/components/navigation/StartBar";
import Image from "next/image";

export default function TaskBar() {
    const [menu, setMenu] = useState("");
    const [time, setTime] = useState("");
    const [date, setDate] = useState("");

    function toggleMenu() {
        setMenu(menu === "hidden" ? "" : "hidden");
    }

    useEffect(() => {
        const updateDateTime = () => {
            setTime(
                new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
            );
            setDate(
                new Date().toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' })
            );
        };
        updateDateTime();
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <>
            <div className="bg-quaternary fixed bottom-0 w-screen h-12 z-[50]">
                <button className="relative top-[10px] h-4/6 w-20 bg-quinary left-4" onClick={toggleMenu}>
                    <div className="relative h-full w-full bg-quinary">
                        <div className="z-10 absolute bottom-[2px] right-0.5 h-full w-full bg-quinary shadow-lg flex flex-row items-center justify-evenly" >
                            <Image src="/icons/Logo.png" height={40} width={32} alt="logo" className="bg-secondary"/>
                            <h1 className="text-2xl">Menu</h1>
                        </div>
                        <div className="z-0 absolute h-full w-full bg-primary"/>
                    </div>
                </button>
                <div className="absolute right-64 bottom-2 bg-primary w-1 h-4/6" />
                <h1 className="absolute right-1 bottom-1 font-extrabold text-4xl">{date} {time}</h1>
            </div>
            {menu && <StartBar />}
        </>
    );
}