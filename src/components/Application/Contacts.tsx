import Application from "@/components/Application/Application";
export default function Contacts(){
    return(
        <Application>
            <div className="bg-quaternary w-96 h-96">
                <div className="bg-primary flex w-full">
                    <h1 className="text-white left-2 relative">Contacts</h1>
                    <div className="flex justify-center items-center ml-auto pr-0.5">
                        <div className="bg-quinary w-3 h-3 p-2 m-1"></div>
                        <div className="bg-quinary w-3 h-3 p-2 m-1"></div>
                        <div className="bg-quinary w-3 h-3 p-2 m-1"></div>
                    </div>
                </div>
            </div>
        </Application>
    )
}