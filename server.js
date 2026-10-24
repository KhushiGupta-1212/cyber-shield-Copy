const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.get("/api/test", (req, res) => {
    res.json({
        message: "Cyber Shield backend is working!"
    });
});

app.post("/api/scam-check", (req, res) => {
    const message = req.body.message;

    if (!message || !message.trim()) {
        return res.status(400).json({
            success: false,
            message: "Please enter a message or link to check."
        });
    }

    const suspiciousPatterns = [
        /otp/i,
        /password/i,
        /urgent/i,
        /prize/i,
        /winner/i,
        /click here/i,
        /verify your account/i,
        /bank details/i
    ];

    const suspicious = suspiciousPatterns.some(pattern =>
        pattern.test(message)
    );

    res.json({
        success: true,
        result: suspicious ? "Suspicious" : "No common warning signs detected",
        warning: suspicious
            ? "This message contains words commonly found in scam attempts. Verify it independently."
            : "No listed warning patterns were detected. This does not guarantee the message is safe."
    });
});


app.post("/api/signup", (req, res) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please fill in all fields."
        });
    }

    res.json({
        success: true,
        message: "Demo signup successful! Welcome to Cyber Shield."
    });
});

app.post("/api/login", (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password."
        });
    }

    res.json({
        success: true,
        message: "Demo login successful! Welcome back to Cyber Shield."
    });
});



app.listen(PORT, () => {
    console.log(`Cyber Shield server running at http://localhost:${PORT}`);
});
