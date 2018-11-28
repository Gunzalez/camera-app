// Set constraints for the video stream
let constraints = { video: { facingMode: "user" }, audio: false };

// Define constants
const cameraView = document.querySelector("#camera--view"),
    cameraOutput = document.querySelector("#camera--output"),
    cameraSensor = document.querySelector("#camera--sensor"),
    cameraTrigger = document.querySelector("#camera--trigger"),
    cameraActions = document.querySelector("#camera-actions");

// Access the device camera and stream to cameraView
function cameraStart() {
    navigator.mediaDevices.getUserMedia(constraints)
        .then(function(stream) {
            track = stream.getTracks()[0];
            cameraView.srcObject = stream;
        })
        .catch(function(error) {
            console.error("Oops. Something is broken.", error);
        });
}

function showActionsHideTrigger(){
    cameraActions.classList.remove('hidden');
    cameraTrigger.classList.add('hidden');
}

function hideActionsShowTrigger(){
    cameraActions.classList.add('hidden');
    cameraTrigger.classList.remove('hidden');
}

// Take a picture when cameraTrigger is tapped
cameraTrigger.onclick = function() {
    cameraSensor.width = cameraView.videoWidth;
    cameraSensor.height = cameraView.videoHeight;
    cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
    cameraOutput.src = cameraSensor.toDataURL("image/webp");
    cameraOutput.classList.add("taken");
    showActionsHideTrigger()
};

// Start the video stream when the window loads
window.addEventListener("load", cameraStart, false);