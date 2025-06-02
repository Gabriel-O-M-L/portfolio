import Image from "next/image";
import {useState} from "react";
import Resume from "@/components/Application/Resume";

export default function IconResume() {
    const [resume, setResume] = useState(false)

    const toggleResume = () => {
        setResume(!resume)
    }

    return (
        <>
            <button onClick={toggleResume} className="w-fit">
                <Image src={"/icons/Resume.png"} width={172} height={172} alt={"Resume"}/>
            </button>
            {resume && <Resume toggleResume={toggleResume} />}
        </>
    );
}