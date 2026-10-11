function showSteps(type) {

    let stepsBox = document.getElementById(type);

    if (type === "account") {

        stepsBox.innerHTML = `
            <h4>Recommended Steps</h4>
            <ol>
                <li>Change your password immediately.</li>
                <li>Enable two-factor authentication.</li>
                <li>Check recent login activity.</li>
                <li>Sign out of unfamiliar devices.</li>
                <li>Contact the platform's official support if needed.</li>
            </ol>
        `;

    }

    else if (type === "payment") {

        stepsBox.innerHTML = `
            <h4>Recommended Steps</h4>
            <ol>
                <li>Contact your bank or payment provider immediately.</li>
                <li>Report the unauthorized transaction.</li>
                <li>Block the affected card or payment method if necessary.</li>
                <li>Keep screenshots and transaction details as evidence.</li>
                <li>Report the incident through the appropriate official cybercrime channel.</li>
            </ol>
        `;

    }

    else if (type === "phishing") {

        stepsBox.innerHTML = `
            <h4>Recommended Steps</h4>
            <ol>
                <li>Do not provide any further information.</li>
                <li>Close the suspicious website.</li>
                <li>If you entered a password, change it immediately.</li>
                <li>Enable two-factor authentication.</li>
                <li>Monitor your accounts for unusual activity.</li>
            </ol>
        `;

    }

    else if (type === "phone") {

        stepsBox.innerHTML = `
            <h4>Recommended Steps</h4>
            <ol>
                <li>Use your device's official tracking or lock feature.</li>
                <li>Contact your mobile service provider.</li>
                <li>Change important account passwords.</li>
                <li>Sign out of accounts on the lost device when possible.</li>
                <li>Report the loss to the appropriate authorities if necessary.</li>
            </ol>
        `;

    }

    else if (type === "identity") {

        stepsBox.innerHTML = `
            <h4>Recommended Steps</h4>
            <ol>
                <li>Secure the affected account immediately.</li>
                <li>Change compromised passwords.</li>
                <li>Enable two-factor authentication.</li>
                <li>Check your accounts for suspicious activity.</li>
                <li>Report suspected misuse through appropriate official channels.</li>
            </ol>
        `;

    }
}