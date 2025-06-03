import { useState } from "react";
import Image from "next/image";
import SpectrogramInfo from "@/components/projectInfo/Spectrogram";

interface FileIconProps {
    name: string;
    toggleProjectFolder : () => void;
    changeProject?: (name: string) => void;
}


export default function IconFile({name, toggleProjectFolder, changeProject}: FileIconProps) {
    const [show, setShow] = useState(false)
    const toggle = () => setShow(!show);

    return (
        <>
            <button onClick={toggleProjectFolder} className="w-fit">
                <Image src={"/icons/Folder.png"} width={100} height={100} alt={"Projects"} />
                <h1>{name}</h1>
            </button>
        </>
    );
}