import Image from "next/image";
import {useState} from "react";
import Mail from "@/components/Application/Mail";

export default function PowerButton() {
    const [power, setPower] = useState(true)

    const togglePower = () => {
        setPower(!power)
    }

    return (
        <>
            <button onClick={togglePower}>
                <Image src={"/icons/On_Off.png"} width={172} height={172} alt={"power"}/>
            </button>
        </>
    );
}