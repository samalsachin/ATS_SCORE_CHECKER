document.getElementById("resumeFile").addEventListener("change", function() {
    uploadResume();
});

function uploadResume() {
    const fileInput = document.getElementById("resumeFile");
    const file = fileInput.files[0];
    const loader = document.getElementById("loader");
    const scoreResult = document.getElementById("scoreResult");

    if (!file) {
        alert("Please upload a resume file.");
        return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    loader.style.display = "block"; // Show loading spinner
    scoreResult.innerText = "";

    fetch("http://localhost:3000/uploadResume", {
        method: "POST",
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        loader.style.display = "none"; // Hide loading spinner
        if (data.error) {
            alert(data.error);
        } else {
            scoreResult.innerText = `Your ATS Score: ${data.score}`;
        }
    })
    .catch(error => {
        console.error("Error:", error);
        loader.style.display = "none";
        alert("Error uploading file.");
    });
}
