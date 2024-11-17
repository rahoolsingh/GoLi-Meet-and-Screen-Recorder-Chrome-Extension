import { useState, useRef } from "react";

const Recorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [videoURL, setVideoURL] = useState<string | null>(null);
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
    };

    return (
        <div>
            <button onClick={isRecording ? stopRecording : startRecording}>
                {isRecording ? "Stop Recording" : "Start Recording"}
            </button>
            {videoURL && (
                <div>
                    <h3>Recorded Video:</h3>
                    <video src={videoURL} controls></video>
                    <a href={videoURL} download="recording.webm">
                        Download Video
                    </a>
                </div>
            )}
        </div>
    );
};

export default Recorder;
