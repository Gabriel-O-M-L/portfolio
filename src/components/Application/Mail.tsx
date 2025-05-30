import Application, {ApplicationHandle} from "@/components/Application/Application";
import Image from "next/image";
import {useEffect, useRef} from "react";
import Link from "next/link";

interface Props {
    toggleMail: () => void;
}

export default function Mail({toggleMail}: Props) {
    const appRef = useRef<ApplicationHandle>(null);

    useEffect(() => {
        appRef.current?.resize(400, 400); //
    }, []);

    return (
        <Application ref={appRef}>
            <div className="bg-quaternary w-full h-full border-4">
                <div className="bg-primary flex w-full">
                    <h1 className="text-white left-2 relative text-2xl">Contacts</h1>
                    <div className="flex justify-center items-center ml-auto pr-0.5">
                        <div className="flex bg-quinary w-[20px] h-[20px] justify-center items-center m-1" onClick={toggleMail}>
                            <Image src="/icons/options/Close.png" width={16} height={16} alt="close" />
                        </div>
                    </div>
                </div>
                <div className="flex flex-col">
                    <div className="flex flex-row justify-between items-center ">
                        <Link className="flex flex-row justify-between items-center" href="https://www.linkedin.com/in/gabriel-o-m-l/" target="_blank" rel="noopener noreferrer">
                            <Image src="/icons/external/linkedin.png" width={75} height={50} alt="linkedin" />
                            <h1 className="text-xl font-bold relative left-2">https://www.linkedin.com/in/gabriel-o-m-l/</h1>
                        </Link>
                    </div>
                    <button className="flex flex-row justify-between items-center m-2">
                        <Link className="flex flex-row justify-between items-center" href="https://github.com/Gabriel-O-M-L" target="_blank" rel="noopener noreferrer">
                            <Image className="relative right-2" src="/icons/external/github.svg" width={75} height={50} alt="github" />
                            <h1 className="text-2xl font-bold left-4 relative">https://github.com/Gabriel-O-M-L/</h1>
                        </Link>
                    </button>
                    <div className="flex flex-row justify-center items-center relative right-1 bottom-10">
                        <Image className="relative right-1" src="/icons/external/Mail.png" width={145} height={150} alt="mail"/>
                        <h1 className="text-2xl relative right-6">gabrieloliveiramouralima2001@gmail.com</h1>
                    </div>
                </div>
            </div>
        </Application>
    );
}
