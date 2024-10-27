

const answerType = [":checked", ":checked",  ":checked", ":checked", ""]
const corrects = ["Berlin", "true", "new", "public, protected, private", ""]
const requires = [false, true, true, true, false]

function hasAnswered(answerId, answerType) {
    const answerElements = document.querySelectorAll(`input[name=${answerId}]${answerType}`);
    const feedback = document.getElementById(answerId+ "_feedback");
    if(answerElements.length === 0) {
        feedback.innerHTML = "No answer given";
        feedback.className = "wrong";
        return false;
    }
    return true;
}

function checkAnswer(answerId, answerType, correct) {
    const feedback = document.getElementById(answerId + "_feedback");
    const answerElements = document.querySelectorAll(`input[name=${answerId}]${answerType}`);

    if(answerElements.length === 0) {
        feedback.innerHTML = "You have not answered this question yet.";
        feedback.className = "wrong";
        return false;
    }
    if(answerElements[0].type === "text") {
        if (answerElements[0].value.length > 0) {
            feedback.innerHTML = "Great opinion!";
            feedback.className = "correct";
            return true;
        } else {
            feedback.innerHTML = "You have not answered this question yet.";
            feedback.className = "wrong";
            return false;
        }
    }


    let answer =  Array.from(answerElements.values()).map( el => el.value).join(", ");

    if (correct === answer) {
        feedback.innerHTML = "You are correct!";
        feedback.className = "correct";
        return true;
    } else {
        feedback.innerHTML = "You are wrong! expected answer was " + correct;
        feedback.className = "wrong";
        return false;
    }
}

function  handleSubmit(event) {
    event.preventDefault();
    let validUser = true;
    if (!document.querySelector('input[name="firstname"]').validity.valid ) {
        document.getElementById('firstname_feedback').innerHTML = "Please enter your first name, only letters.";
        validUser = false;
    } else {
        document.getElementById('firstname_feedback').innerHTML = "";
    }
    if (!document.querySelector('input[name="lastname"]').validity.valid) {
        document.getElementById('lastname_feedback').innerHTML = "Please enter your last name, only letters.";
        validUser = false;
    } else
        document.getElementById('lastname_feedback').innerHTML = "";

    if (!document.querySelector('input[name="email"]').validity.valid) {
        document.getElementById('email_feedback').innerHTML = "Please enter your email";
        validUser = false;
    } else
        document.getElementById('email_feedback').innerHTML = "";

    if (!validUser)
        return false;

    let haveAnsweredAll = true;
    let correctAnswers = 0
    for (let i = 0; i < corrects.length; i++) {
        if( requires[i] && !hasAnswered("answer"+(i+1), answerType[i]) )
            haveAnsweredAll = false
    }

    if(!haveAnsweredAll) {
        document.getElementById("resultText").innerHTML = "You have not answered all questions yet.";
        document.getElementById("result").className = "not-answered"
        return false;
    }

    for (let i = 0; i < corrects.length; i++) {
        if(checkAnswer("answer"+(i+1), answerType[i], corrects[i]))
            correctAnswers++
        if( !hasAnswered("answer"+(i+1), answerType[i]) ){
            const feedback = document.getElementById("answer"+(i+1) + "_feedback");
            feedback.innerHTML = "No answer given";
            feedback.className = "wrong";
        }
    }

    document.getElementById("resultScoring").innerHTML = "You scored " + correctAnswers + " points";
    document.getElementById("resultText").innerHTML = "You have answered correctly on " + correctAnswers + " out of " + corrects.length + " possible questions. Thank you for your participation.";
    document.getElementById("result").className = "answered"

}

const quizForm = document.getElementById("quizForm");
quizForm.addEventListener("submit", handleSubmit);
quizForm.noValidate = true;

