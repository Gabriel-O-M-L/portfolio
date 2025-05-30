import Image from "next/image";
import {useState} from "react";
import Mail from "@/components/Application/Mail";

export default function SleepButton() {
    const [sleep, setSleep] = useState(false)

    const toggleSleep = () => {
        setSleep(!sleep)
    }

    return (
        <>
            <button onClick={toggleSleep}>
                <Image src={"/icons/Sleep.png"} width={172} height={172} alt={"sleep"}/>
            </button>
        </>
    );
}