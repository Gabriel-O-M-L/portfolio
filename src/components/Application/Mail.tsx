import Application from "@/components/Application/Application";
import Image from "next/image";
import { useState } from "react";

interface Props {
    toggleMail: () => void;
}

export default function Mail({toggleMail}: Props) {
    const [resize, setResize] = useState({ width: 384, height: 384 });
    const [position, setPosition] = useState({ x: 50, y: 50 });

    const resizeWindow = () => {
        if (resize.width === 384) {
            setResize({ width: window.innerWidth, height: window.innerHeight - 48 });
            setPosition({ x: 0, y: 0 });
        } else {

            setResize({ width: 384, height: 384 });
            setPosition({ x: 50, y: 50 });
        }
    };

    return (
        <Application>
            <div
                className="bg-quaternary border-4"
                style={{
                    width: `${resize.width}px`,
                    height: `${resize.height}px`,
                    position: 'absolute',
                    top: `${position.y}px`,
                    left: `${position.x}px`
                }}
            >
                <div className="bg-primary flex w-full">
                    <h1 className="text-white left-2 relative text-2xl">Contacts</h1>
                    <div className="flex justify-center items-center ml-auto pr-0.5">
                        <div className="bg-quinary w-3 h-3 p-2 m-1">
                            <Image src={"/icons/options/Close.png"} width={172} height={172} alt="close" />
                        </div>
                        <div className="bg-quinary w-3 h-3 p-2 m-1" onClick={resizeWindow}></div>
                        <div className="bg-quinary w-3 h-3 p-2 m-1" onClick={toggleMail}>
                            <Image src={"/icons/options/Close.png"} width={30} height={30} alt="close" />
                        </div>
                    </div>
                </div>
            </div>
        </Application>
    );
}
