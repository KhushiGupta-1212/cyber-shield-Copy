const submitQuiz = document.getElementById("submitQuiz");
const quizResult = document.getElementById("quizResult");

submitQuiz.addEventListener("click", function () {

    const answers = {
        q1: "b",
        q2: "b",
        q3: "c",
        q4: "a",
        q5: "c"
    };

    let score = 0;

    for (let question in answers) {

        const selected = document.querySelector(
            `input[name="${question}"]:checked`
        );

        if (selected && selected.value === answers[question]) {
            score++;
        }
    }

    let message = "";

    if (score === 5) {
        message = "Excellent! You have a strong understanding of cyber safety.";
    } 
    else if (score >= 3) {
        message = "Good job! You know the basics, but there is still more to learn.";
    } 
    else {
        message = "Keep learning! Review the Cyber Safety Guide and try again.";
    }

    quizResult.innerHTML = `
        <h3>Your Score: ${score} / 5</h3>
        <p>${message}</p>
    `;
});