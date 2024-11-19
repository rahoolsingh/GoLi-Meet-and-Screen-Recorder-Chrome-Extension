let isRecording = false;
let mediaRecorder;
let stream;

// Function to update button text based on the recording status
function updateButtonText(buttonTextElement) {
    if (isRecording) {
        buttonTextElement.innerText = "Stop Recording"; // If recording, change text to 'Stop Recording'
    } else {
        buttonTextElement.innerText = "Record with GoLi"; // If not recording, keep text as 'Record with GoLi'
    }
}

window.addEventListener("load", () => {
    const observer = new MutationObserver(() => {
        const targetDiv = document.querySelector(".tB5Jxf-xl07Ob-S5Cmsd");

        if (targetDiv) {
            const targetUl = targetDiv.querySelector("ul");

            if (targetUl && !document.getElementById("goli-record-button-li")) {
                const recordLi = document.createElement("li");
                recordLi.id = "goli-record-button-li";
                recordLi.className =
                    "W7g1Rb-rymPhb-ibnC6b W7g1Rb-rymPhb-ibnC6b-OWXEXe-hXIJHe W7g1Rb-rymPhb-ibnC6b-OWXEXe-SfQLQb-Woal0c-RWgCYc W7g1Rb-rymPhb-ibnC6b-OWXEXe-SfQLQb-M1Soyc-Bz112c O68mGe-OQAXze-OWXEXe-SfQLQb-Woal0c-RWgCYc mgUzuf";
                recordLi.setAttribute("role", "menuitem");
                recordLi.setAttribute("aria-label", "Record with GoLi");

                const iconSpan = document.createElement("span");
                iconSpan.className = "W7g1Rb-rymPhb-KkROqb";

                const iconContainer = document.createElement("span");
                iconContainer.className = "notranslate";
                iconContainer.setAttribute("aria-hidden", "true");

                const divWrapper = document.createElement("div");
                divWrapper.className = "TwcFUc";

                const icon = document.createElement("i");
                icon.className =
                    "google-material-icons notranslate Hdh4hc cIGbvc";
                icon.setAttribute("aria-hidden", "true");
                icon.innerText = "radio_button_checked";

                divWrapper.appendChild(icon);
                iconContainer.appendChild(divWrapper);
                iconSpan.appendChild(iconContainer);

                const textSpan = document.createElement("span");
                textSpan.className = "W7g1Rb-rymPhb-Gtdoyb";

                const mainText = document.createElement("span");
                mainText.className = "W7g1Rb-rymPhb-fpDzbe-fmcmS";
                mainText.innerText = "Record with GoLi"; // Initial text

                textSpan.appendChild(mainText);
                recordLi.appendChild(iconSpan);
                recordLi.appendChild(textSpan);

                updateButtonText(mainText);

                recordLi.addEventListener("click", async () => {
                    const meetingIdDiv = document.querySelector(".uBRSj");

                    const existingMessageDiv = meetingIdDiv.querySelector(
                        ".goli-recording-message"
                    );
                    if (existingMessageDiv) {
                        existingMessageDiv.remove();
                    }

                    if (isRecording) {
                        // Stop recording
                        mediaRecorder.stop();
                        const stopMessageDiv = document.createElement("div");
                        stopMessageDiv.className = "goli-recording-message";
                        stopMessageDiv.innerText =
                            "Recording stopped and saved.";
                        meetingIdDiv.appendChild(stopMessageDiv);

                        // Reset status
                        isRecording = false;
                        updateButtonText(mainText); // Update button text to 'Record with GoLi'
                        stream.getTracks().forEach((track) => track.stop()); // Stop the stream
                    } else {
                        try {
                            // Request display media with audio
                            stream =
                                await navigator.mediaDevices.getDisplayMedia({
                                    video: true,
                                    audio: {
                                        echoCancellation: true,
                                        noiseSuppression: true,
                                    },
                                    preferCurrentTab: true, // Suggests the current tab
                                });

                            mediaRecorder = new MediaRecorder(stream);
                            const chunks = [];

                            mediaRecorder.ondataavailable = (e) =>
                                chunks.push(e.data);
                            mediaRecorder.onstop = () => {
                                const blob = new Blob(chunks, {
                                    type: "video/webm",
                                });
                                const url = URL.createObjectURL(blob);

                                const a = document.createElement("a");
                                a.href = url;
                                a.download = `GoLi-Meet-Recording-${new Date().toISOString()}.webm`;
                                a.click();
                                URL.revokeObjectURL(url);
                            };

                            mediaRecorder.start();
                            isRecording = true;
                            updateButtonText(mainText); // Update button text to 'Stop Recording'

                            // Append message below meeting ID
                            const messageDiv = document.createElement("div");
                            messageDiv.className = "goli-recording-message";
                            messageDiv.innerText =
                                "Recording started. Click the button again to stop.";
                            meetingIdDiv.appendChild(messageDiv);
                        } catch (err) {
                            console.error(
                                "Error starting screen recording: ",
                                err
                            );
                            const errorMessageDiv =
                                document.createElement("div");
                            errorMessageDiv.className =
                                "goli-recording-message";
                            errorMessageDiv.innerText =
                                "Failed to start recording. Please allow screen sharing and select the Meet tab.";
                            meetingIdDiv.appendChild(errorMessageDiv);
                        }
                    }
                });

                targetUl.appendChild(recordLi);
            }
        }
    });

    observer.observe(document.body, { childList: true, subtree: true });
});
