import Application, {ApplicationHandle} from "@/components/Application/Application";
import Image from "next/image";
import {useEffect, useRef} from "react";

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
            </div>
        </Application>
    );
}
