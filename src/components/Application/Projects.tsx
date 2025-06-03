'use client';

import {useRef, useEffect, useState} from "react";
import Application, { ApplicationHandle } from "@/components/Application/Application";
import IconFile from "@/components/Icons/IconFile";
import Image from "next/image";
import SpectrogramInfo from "@/components/projectInfo/Spectrogram";

interface Props {
    toggleProject: () => void;
    toggleProjectFolder : () => void;
    changeProject?: (name: string) => void;
}

export default function Projects({ toggleProject, toggleProjectFolder,changeProject }: Props) {
    const appRef = useRef<ApplicationHandle>(null);

    useEffect(() => {
        appRef.current?.resize(400, 400);
    }, []);

    return (
         <>
            <Application ref={appRef} initialPos={{ x: 100, y: 200 }} className="relative">
                <div className="bg-quaternary w-full h-full border-4 flex flex-col">
                    <div className="bg-primary flex w-full">
                        <h1 className="text-white left-2 relative text-2xl">Projects</h1>
                        <div className="flex justify-center items-center ml-auto pr-0.5">
                            <div className="flex bg-quinary w-[20px] h-[20px] justify-center items-center m-1" onClick={toggleProject}>
                                <Image src="/icons/options/Close.png" width={16} height={16} alt="close" />
                            </div>
                        </div>
                    </div>
                    <div onClick={() => changeProject?.("SpectrogramInfo")}>
                        <IconFile name="3D spectrogram" toggleProjectFolder={toggleProjectFolder} />
                    </div>
                </div>
            </Application>

        </>
    )}
