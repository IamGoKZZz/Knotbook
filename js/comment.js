let questions = [];
const token = localStorage.getItem("jwt");

function displayQuestions() {
    const questionContainer = document.getElementById('questions');
    questionContainer.innerHTML = '';
    questions.slice().reverse().forEach(question => {
        const div = document.createElement('div');
        div.classList.add('question');
        let repliesHTML = '';
    if (question.replies && question.replies.length > 0) {
        repliesHTML = `
            <ul>
                ${question.replies.map(reply => `<li><strong style="font-family: Arial, sans-serif; font-style: italic;">${reply.repliedBy}:</strong> ${reply.reply}</li>`).join('')}
            </ul>
        `;
    } 

    div.innerHTML = `
        <strong style="font-family: Arial, sans-serif; font-style: italic;">${question.askedBy} : </strong> ${question.question}
        ${repliesHTML}
        <form class="answerForm" data-index="${questions.indexOf(question)}">
            <input type="text" placeholder="Your Answer" required>
            <button type="submit">Reply</button>
        </form>
    `;
        questionContainer.appendChild(div);
    });
}

// Function to fetch questions and answers from the server
function fetchQuestionsAndAnswers() {
    fetch('http://localhost:8002/adminuser/getQuestions', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error('Failed to fetch questions');
        }
    })
    .then(data => {
        questions = data; // Assuming data is an array of questions
        console.log("questions = "+questions)
        displayQuestions();
    })
    .catch(error => {
        console.error('Error:', error);
    });
}

// Call fetchQuestionsAndAnswers when the page loads
window.addEventListener('load', fetchQuestionsAndAnswers);
// Function to handle question submission
document.getElementById('questionForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const questionInput = document.getElementById('question');
    const questionText = questionInput.value.trim();
    if (questionText !== '') {
        // Make AJAX request to save the question
        fetch('http://localhost:8002/adminuser/saveQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                question: questionText,
                askedBy: localStorage.getItem("username")
            })
        })
        .then(response => {
            if (response.ok) {
                // If the request was successful, add the question to the UI
                return response.json();
            } else {
                throw new Error('Failed to save question');
            }
        })
        .then(data => {
            // Assuming the response contains the saved question data
            // You can update the questions array and display the question
            questions.push({ text: questionText, answers: [] });
            questionInput.value = '';
            fetchQuestionsAndAnswers();
            displayQuestions();
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

// Function to handle answer submission
document.addEventListener('submit', function(event) {
    event.preventDefault();
    if (event.target.classList.contains('answerForm')) {
        const answerInput = event.target.querySelector('input[type="text"]');
        const answerText = answerInput.value.trim();
        const questionIndex = parseInt(event.target.getAttribute('data-index'));

        if (answerText !== '') {
            const questionDto = {
                "questionId": questions[questionIndex].questionId // Assuming questionId is stored in the questions array
            };

            // Make AJAX request to save the reply
            fetch('http://localhost:8002/adminuser/saveReply', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    reply: answerText,
                    repliedBy: localStorage.getItem("username"),
                    questionDto: questionDto // Corrected typo: should be questionDto, not QuestionDto
                })
            })
            .then(response => {
                if (response.ok) {
                    // If the request was successful, update the UI with the new reply
                    return response.json();
                } else {
                    throw new Error('Failed to save reply');
                }
            })
            .then(data => {
                // Assuming the response contains the saved reply data
                // Update the UI to display the new reply
                if (!questions[questionIndex].replies) {
                    questions[questionIndex].replies = [];
                }
                questions[questionIndex].replies.push({ reply: answerText });
                answerInput.value = '';
                fetchQuestionsAndAnswers();
                displayQuestions(); // Update the UI
            })
            .catch(error => {
                console.error('Error:', error);
            });
        }
    }
});