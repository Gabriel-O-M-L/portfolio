import Mail from "@/components/Application/Mail";
import Resume from "@/components/Application/Resume";
import Icon from "@/components/Icons/IconMail";
import IconMail from "@/components/Icons/IconMail";
import IconResume from "@/components/Icons/IconResume";
import IconProject from "@/components/Icons/IconProject";

export default function Desktop() {
    return (
        <div className="bg-tertiary w-screen h-screen flex flex-col">
            <div className="flex flex-col justify-start h-full">
                <IconMail/>
                <IconResume/>
                <IconProject/>
            </div>
        </div>
    )
}