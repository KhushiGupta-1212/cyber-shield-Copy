
const myIpBtn = document.getElementById("myIpBtn");
const myIpResult = document.getElementById("myIpResult");
const lookupForm = document.getElementById("lookupForm");
const ipInput = document.getElementById("ipInput");
const lookupResult = document.getElementById("lookupResult");

// Check whether the address is a valid IPv4 address.
function isValidIPv4(ip) {
    const parts = ip.split(".");

    return parts.length === 4 && parts.every(part =>
        /^\d{1,3}$/.test(part) &&
        Number(part) >= 0 &&
        Number(part) <= 255
    );
}

// Check whether the address is a valid IPv6 address.
function isValidIPv6(ip) {
    if (!ip.includes(":") || /[^0-9a-fA-F:.]/.test(ip)) {
        return false;
    }

    if ((ip.match(/::/g) || []).length > 1) {
        return false;
    }

    // Support IPv4 addresses embedded at the end of IPv6.
    if (ip.includes(".")) {
        const lastColon = ip.lastIndexOf(":");

        if (lastColon < 0 || !isValidIPv4(ip.slice(lastColon + 1))) {
            return false;
        }

        ip = ip.slice(0, lastColon) + ":v4";
    }

    const validPart = part =>
        part === "v4" || /^[0-9a-fA-F]{1,4}$/.test(part);

    const countParts = parts =>
        parts.reduce((total, part) => total + (part === "v4" ? 2 : 1), 0);

    if (ip.includes("::")) {
        const [left, right] = ip.split("::");
        const leftParts = left ? left.split(":") : [];
        const rightParts = right ? right.split(":") : [];
        const allParts = [...leftParts, ...rightParts];

        return allParts.every(validPart) &&
            countParts(allParts) < 8;
    }

    const parts = ip.split(":");

    return parts.every(validPart) && countParts(parts) === 8;
}

// Check the IP format before requesting information.
function isValidIP(ip) {
    return isValidIPv4(ip) || isValidIPv6(ip);
}

// Display public information returned by the lookup service.
async function showIPInformation(ip, resultElement) {
    resultElement.textContent = "Loading IP information...";

    try {
        const response = await fetch(
            `https://ipapi.co/${ip}/json/`
        );

        if (!response.ok) {
            throw new Error("The lookup service is unavailable.");
        }

        const data = await response.json();

        if (data.error) {
            throw new Error(
                data.reason || "Information is not available for this IP."
            );
        }

        resultElement.replaceChildren();

        const heading = document.createElement("h3");
        heading.textContent = "IP Information";
        resultElement.appendChild(heading);

        const details = [
            ["IP Address", data.ip || ip],
            ["Version", data.version || "Not available"],
            ["City", data.city || "Not available"],
            ["Region", data.region || "Not available"],
            ["Country", data.country_name || "Not available"],
            ["Timezone", data.timezone || "Not available"],
            ["Network / ISP", data.org || "Not available"]
        ];

        details.forEach(([label, value]) => {
            const line = document.createElement("p");
            line.textContent = `${label}: ${value}`;
            resultElement.appendChild(line);
        });

    } catch (error) {
        resultElement.textContent =
            "Could not retrieve IP information. Please try again later.";
        console.error("IP lookup error:", error);
    }
}

// Find the public IP visible to an external internet service.
myIpBtn.addEventListener("click", async () => {
    myIpResult.textContent = "Finding your public IP...";

    try {
        const response = await fetch(
            "https://api.ipify.org?format=json"
        );

        if (!response.ok) {
            throw new Error("Could not retrieve public IP.");
        }

        const data = await response.json();

        myIpResult.textContent = `Your public IP address is: ${data.ip}`;

        await showIPInformation(data.ip, myIpResult);

    } catch (error) {
        myIpResult.textContent =
            "Unable to find your public IP. Check your internet connection and try again.";
        console.error("Public IP error:", error);
    }
});

// Validate the entered IP and then look up its public information.
lookupForm.addEventListener("submit", async event => {
    event.preventDefault();

    const ip = ipInput.value.trim();

    if (!isValidIP(ip)) {
        lookupResult.textContent =
            "Invalid IP address. Please enter a valid IPv4 or IPv6 address.";
        return;
    }

    await showIPInformation(ip, lookupResult);
});
