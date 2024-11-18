interface RecordButtonProps {
    isRecording: boolean;
    startRecording: () => void;
    stopRecording: () => void;
}

function RecordButton({
    isRecording,
    startRecording,
    stopRecording,
}: RecordButtonProps) {
    const handleClick = () => {
        if (isRecording) {
            stopRecording();
        } else {
            startRecording();
        }
    };

    return (
        <button
            onClick={handleClick}
            className="relative w-30 h-30 rounded-full"
        >
            <span
                className={`block p-5 bg-white/60 rounded-full ${
                    isRecording ? "animate-ping" : "animate-pulse"
                } duration-300 delay-500`}
            >
                <span className="block p-5 bg-white/60 rounded-full">
                    <span className="block p-8 bg-white/60 rounded-full"></span>
                </span>
            </span>
            <span
                className={`block w-8 h-8 bg-red-600 
                    ${isRecording ? "animate-pulse rounded-md" : "rounded-full"}
                    absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2`}
            ></span>
        </button>
    );
}

export default RecordButton;
