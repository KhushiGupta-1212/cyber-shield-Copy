
const exploreBtn = document.getElementById("exploreBtn");

if (exploreBtn) {
    exploreBtn.addEventListener("click", function () {
        window.location.href = "safety-guide.html";
    });
}

async function testBackendConnection() {
    try {
        const response = await fetch("http://localhost:3000/api/test");
        const data = await response.json();

        console.log("Backend response:", data.message);
    } catch (error) {
        console.error("Backend connection failed:", error);
    }
}

testBackendConnection();
