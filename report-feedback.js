const reportForm = document.getElementById("reportForm");
const reportMessageBox = document.getElementById("reportMessageBox");

reportForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const name = document.getElementById("reportName").value.trim();
    const type = document.getElementById("reportType").value;

    reportMessageBox.innerHTML = `
        <strong>Report Submitted Successfully!</strong>
        <br>
        Thank you, ${name}. Your ${type} report has been received.
    `;

    reportMessageBox.style.marginTop = "20px";
    reportMessageBox.style.padding = "15px";
    reportMessageBox.style.background = "#e8f5e9";
    reportMessageBox.style.borderRadius = "8px";

    reportForm.reset();

});