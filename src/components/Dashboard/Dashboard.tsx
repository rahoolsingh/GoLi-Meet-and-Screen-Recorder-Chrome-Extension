import { useRef, useState } from "react";
import RecordButton from "../RecordButton/RecordButton";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import ConfirmationPrompt from "../ConfirmationPrompt/ConfirmationPrompt";

function Dashboard() {
    const [isRecording, setIsRecording] = useState(false);
    const [videoURL, setVideoURL] = useState<string | null>(null);
    const [confirmationModalOpen, setConfirmationModalOpen] = useState(false);
    const [confirmationModalProps, setConfirmationModalProps] = useState({
        message: "",
        onConfirm: () => {},
        onCancel: () => {},
    });

    const mediaRecorderRef = useRef<MediaRecorder | null>(null);
    const recordedChunks = useRef<Blob[]>([]);

    const startRecording = async () => {
        try {
            const stream = await navigator.mediaDevices.getDisplayMedia({
                video: true,
                audio: true,
            });
            mediaRecorderRef.current = new MediaRecorder(stream);

            mediaRecorderRef.current.ondataavailable = (event) => {
                if (event.data.size > 0)
                    recordedChunks.current.push(event.data);
            };

            mediaRecorderRef.current.onstop = () => {
                const blob = new Blob(recordedChunks.current, {
                    type: "video/mp4",
                });
                setVideoURL(URL.createObjectURL(blob));
                recordedChunks.current = [];
            };

            mediaRecorderRef.current.start();
            setIsRecording(true);
        } catch (err) {
            console.error("Error accessing display media: ", err);
        }
    };

    const stopRecording = () => {
        if (mediaRecorderRef.current) {
            mediaRecorderRef.current.stop();
        }
        setIsRecording(false);

        // Stop all tracks of the screen capture stream
        if (mediaRecorderRef.current?.stream) {
            mediaRecorderRef.current.stream
                .getTracks()
                .forEach((track) => track.stop());
        }
    };

    const getFileName = () => {
        const date = new Date();
        return `GoLi-${date.toISOString()}.webm`;
    };

    const handleDiscard = () => {
        setConfirmationModalOpen(true);
        setConfirmationModalProps({
            message: "Are you sure you want to discard the video?",
            onConfirm: () => {
                setVideoURL(null);
                setConfirmationModalOpen(false);
            },
            onCancel: () => setConfirmationModalOpen(false),
        });
    };
    return (
        <div className="flex justify-between flex-col items-center h-full w-full">
            <Header />
            <div className="flex flex-col items-center gap-3">
                {!videoURL && (
                    <>
                        <RecordButton
                            isRecording={isRecording}
                            startRecording={startRecording}
                            stopRecording={stopRecording}
                        />

                        <p className="text-white text-lg mt-5">
                            {isRecording
                                ? "Recording..."
                                : "Click to start recording"}
                        </p>
                    </>
                )}

                {videoURL && (
                    <div>
                        <video
                            src={videoURL}
                            className="w-full max-w-2xl rounded-xl overflow-hidden bg-red-50 h-auto"
                            controls
                            autoPlay
                            muted
                        ></video>
                        <a
                            href={videoURL}
                            download={getFileName()}
                            className="text-white font-medium px-3 py-1 rounded-md mt-3"
                        >
                            <span className="fa fa-download mr-2"></span>
                            Download Video
                        </a>

                        <button
                            onClick={() => handleDiscard()}
                            className="text-white font-medium px-3 py-1 rounded-md mt-3"
                        >
                            <span className="fa fa-trash mr-2"></span>
                            Discard Video
                        </button>
                    </div>
                )}

                {confirmationModalOpen && (
                    <ConfirmationPrompt {...confirmationModalProps} />
                )}
            </div>

            <Footer />
        </div>
    );
}

export default Dashboard;
