import Mail from "@/components/Application/Mail";
import Resume from "@/components/Application/Resume";
import Icon from "@/components/Application/IconMail";
import IconMail from "@/components/Application/IconMail";
import IconResume from "@/components/Application/IconResume";

export default function Desktop() {
    return (
        <div className="bg-tertiary w-screen h-screen flex flex-col">
            <IconMail/>
            <IconResume/>
        </div>
    )
}