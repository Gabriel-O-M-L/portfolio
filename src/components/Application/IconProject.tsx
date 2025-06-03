import Image from "next/image";
import {useState} from "react";
import Projects from "@/components/Application/Projects";
import SpectrogramInfo from "@/components/projectInfo/Spectrogram";

const componentMap: Record<string, React.FC<any>> = {
    SpectrogramInfo
};

export default function IconProject() {
    const [Project, setProject] = useState(false)
    const [Current, setCurrent] = useState("");
    const [showProjectFolder, setShowProjectFolder] = useState(false);
    const DynamicComponent = componentMap[Current];
    const toggleProject = () => {
        setProject(!Project)
    }
    const toggleProjectFolder = () => {
        setShowProjectFolder(!showProjectFolder);
    }
    const changeCurrent = (name: string) => {
        setCurrent(name);
    }


    return (
        <>
            <button onClick={toggleProject} className="w-fit">
                <Image src={"/icons/project_test.png"}  width={172} height={172} alt={"Projects"}/>
            </button>
            <div>
                {Project && <Projects changeProject={changeCurrent} toggleProjectFolder={toggleProjectFolder} toggleProject={toggleProject}  />}
                {showProjectFolder && Current && DynamicComponent && (
                    <DynamicComponent toggleSpectrogram={toggleProjectFolder} />
                )}
            </div>
        </>
    );
}