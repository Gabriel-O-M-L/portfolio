import PowerButton from "@/components/navigation/PowerButton";
import SleepButton from "@/components/navigation/SleepButton";

export default function StartBar() {
    return (
        <div className="z-[20] fixed">
            <div className="bg-quinary min-w-[350px] fixed bottom-12 w-[20%] h-1/4 z-[-5] flex-col ">
                <div className="flex flex-row w-full h-[50%]">
                    <PowerButton />
                    <h1 className="justify-center items-center text-center w-full h-full flex  text-6xl">Power On/Off</h1>
                </div>
                <div className="flex flex-row w-full h-[50%]">
                    <SleepButton />
                    <h1 className="justify-center items-center text-center w-full h-full flex  text-6xl">Sleep</h1>
                </div>
            </div>
            <div className="fixed bottom-6 min-w-[350px] w-[20%] left-2 z-[-10] h-1/4 bg-primary" />
        </div>
    );
}