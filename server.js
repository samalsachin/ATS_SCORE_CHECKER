const express = require("express");
const multer = require("multer");
const cors = require("cors");
const pdfParse = require("pdf-parse");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Multer storage for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// API to handle resume file upload
app.post("/uploadResume", upload.single("resume"), async (req, res) => {
    if (!req.file) {
        return res.status(400).json({ error: "No file uploaded" });
    }

    try {
        const fileBuffer = req.file.buffer;

        // Extract text from PDF
        const data = await pdfParse(fileBuffer);
        const extractedText = data.text.toLowerCase();

        console.log("Extracted Resume Text:", extractedText); // Debugging

        // Generate ATS Score (Basic Example)
        let score = Math.floor(Math.random() * 100);

        console.log(`Generated ATS Score: ${score}`); // Debugging

        res.json({ score: score });
    } catch (error) {
        console.error("Error processing resume:", error);
        res.status(500).json({ error: "Failed to process the resume" });
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
