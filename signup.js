
const signupForm = document.getElementById("signupForm");
const signupMessage = document.getElementById("signupMessage");

signupForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const name = document.getElementById("fullName").value.trim();
    const email = document.getElementById("signupEmail").value.trim();
    const password = document.getElementById("signupPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (password !== confirmPassword) {
        signupMessage.textContent = "Passwords do not match.";
        return;
    }

    if (password.length < 8) {
        signupMessage.textContent =
            "Password must contain at least 8 characters.";
        return;
    }

    signupMessage.textContent = "Creating your account...";

    try {
        const response = await fetch("http://localhost:3000/api/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name, email, password })
        });

        const data = await response.json();
        signupMessage.textContent = data.message;

    } catch (error) {
        signupMessage.textContent =
            "Could not connect to the server. Please check whether the backend is running.";
        console.error("Signup error:", error);
    }
});
