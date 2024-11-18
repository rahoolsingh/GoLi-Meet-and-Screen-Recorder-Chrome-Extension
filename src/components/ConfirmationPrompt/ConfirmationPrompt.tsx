interface ConfirmationPromptProps {
    onConfirm: () => void;
    onCancel: () => void;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

function ConfirmationPrompt({
    onConfirm,
    onCancel,
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
}: ConfirmationPromptProps) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
            <div className="bg-slate-700 p-8 rounded-lg shadow-lg">
                <p className="text-lg">{message}</p>
                <div className="flex justify-end mt-4">
                    <button
                        onClick={onCancel}
                        className="px-4 py-2 text-white bg-red-600 rounded-md"
                    >
                        {cancelText}
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-4 py-2 ml-4 text-white bg-green-600 rounded-md"
                    >
                        {confirmText}
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ConfirmationPrompt;
