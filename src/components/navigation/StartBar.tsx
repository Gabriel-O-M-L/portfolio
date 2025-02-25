export default function StartBar() {
    return (
        <div className="z-[20] fixed">
            <div className="bg-quinary fixed bottom-12 w-[20%] h-4/6 z-[-5]">
            </div>
            <div className="fixed bottom-6 w-[20%] left-2 z-[-10] h-4/6 bg-primary" />
        </div>
    );
}