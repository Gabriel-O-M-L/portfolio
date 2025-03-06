import Image from "next/image";
import {useState} from "react";
import Resume from "@/components/Application/Resume";

export default function IconResume() {
    const [mail, setMail] = useState(false)

    const toggleMail = () => {
        setMail(!mail)
    }

    return (
        <>
            <button onClick={toggleMail}>
                <Image src={"/icons/Resume.png"} width={172} height={172} alt={"Mail"}/>
            </button>
            {mail && <Resume/>}
        </>
    );
}