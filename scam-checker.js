

const checkScamBtn = document.getElementById("checkScamBtn");
const messageInput = document.getElementById("messageInput");
const resultBox = document.getElementById("resultBox");

checkScamBtn.addEventListener("click", async function () {
    const message = messageInput.value.trim();

    if (message === "") {
        resultBox.textContent = "Please paste a message first.";
        return;
    }

    checkScamBtn.disabled = true;
    resultBox.textContent = "Checking message...";

    try {
       const response = await fetch("https://cyber-shield-copy.onrender.com/api/scam-check", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ message: message })
        });

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Unable to check the message.");
        }

        resultBox.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = data.result;
        resultBox.appendChild(heading);

        const explanation = document.createElement("p");
        explanation.textContent = data.warning;
        resultBox.appendChild(explanation);

    } catch (error) {
        resultBox.textContent =
            "Could not connect to the backend. Please make sure the server is running.";
        console.error("Scam Checker error:", error);
    } finally {
        checkScamBtn.disabled = false;
    }
});
