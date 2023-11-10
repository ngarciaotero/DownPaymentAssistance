// Sticky Navigation Menu JS Code
let nav = document.querySelector("nav");
let scrollBtn = document.querySelector(".scroll-button a");
console.log(scrollBtn);
let val;
window.onscroll = function () {
  if (document.documentElement.scrollTop > 20) {
    nav.classList.add("sticky");
    scrollBtn.style.display = "block";
  } else {
    nav.classList.remove("sticky");
    scrollBtn.style.display = "none";
  }
};

// Side NavIgation Menu JS Code
let body = document.querySelector("body");
let navBar = document.querySelector(".navbar");
let menuBtn = document.querySelector(".menu-btn");
let cancelBtn = document.querySelector(".cancel-btn");
menuBtn.onclick = function () {
  navBar.classList.add("active");
  menuBtn.style.opacity = "0";
  menuBtn.style.pointerEvents = "none";
  body.style.overflow = "hidden";
  scrollBtn.style.pointerEvents = "none";
};
cancelBtn.onclick = function () {
  navBar.classList.remove("active");
  menuBtn.style.opacity = "1";
  menuBtn.style.pointerEvents = "auto";
  body.style.overflow = "auto";
  scrollBtn.style.pointerEvents = "auto";
};

// Side Navigation Bar Close While We Click On Navigation Links
let navLinks = document.querySelectorAll(".menu li a");
for (var i = 0; i < navLinks.length; i++) {
  navLinks[i].addEventListener("click", function () {
    navBar.classList.remove("active");
    menuBtn.style.opacity = "1";
    menuBtn.style.pointerEvents = "auto";
  });
}

// Check Eligibility Button Click Functionality
let eligibilityButton = document.querySelector(".home .button button");

eligibilityButton.addEventListener("click", function () {
  // Scroll to the skills section
  document.querySelector("#skills").scrollIntoView({
    behavior: "smooth",
  });
});

function nextQuestion(currentQuestionId, nextQuestionId) {
  const currentQuestion = document.getElementById(currentQuestionId);
  const nextQuestion = document.getElementById(nextQuestionId);

  currentQuestion.style.display = "none";
  nextQuestion.style.display = "block";
}

function submitQuiz() {
  // Implement logic to process quiz results
  alert("Quiz submitted!");
}

// ------------Eligibility Quesionnaire----------------------
var currentQuestion = 1;
var eligiblePrograms = [];

function showNextQuestion(questionText, nextQuestionId) {
  var currentQuestionElement = document.getElementById(
    "question-" + currentQuestion
  );
  var nextQuestionElement = document.getElementById(nextQuestionId);

  if (currentQuestionElement) {
    currentQuestionElement.style.display = "none";
  }

  currentQuestion++;

  if (nextQuestionElement) {
    nextQuestionElement.style.display = "block";
    var questionTextElement = document.getElementById(
      "question-text-" + (currentQuestion - 1)
    );
    questionTextElement.innerText = questionText;
  } else {
    showEligibilityBasedOnEligiblePrograms();
  }
}

function showEligibilityMessage(message) {
  var eligibilityMessage = document.getElementById("eligibility-message");
  eligibilityMessage.innerText = message;
  eligibilityMessage.style.display = "block";
}

function showEligibilityBasedOnEligiblePrograms() {
  // After the last question, check the eligiblePrograms array
  if (eligiblePrograms.length === 0) {
    showEligibilityMessage(
      "You qualify for the Standard program for a $10,000 downpayment grant."
    );
  } else if (
    eligiblePrograms.includes("CHOICE") &&
    eligiblePrograms.includes("PEN")
  ) {
    showEligibilityMessage(
      "You qualify for either the Choice program for a $12,500 downpayment grant or the PEN program for a $12,500 downpayment grant."
    );
  } else if (eligiblePrograms.includes("CHOICE")) {
    showEligibilityMessage(
      "You qualify for the Choice program for a $12,500 downpayment grant."
    );
  } else if (eligiblePrograms.includes("PEN")) {
    showEligibilityMessage(
      "You qualify for the PEN program for a $12,500 downpayment grant."
    );
  }
}

function answerQuestion(answer) {
  switch (currentQuestion) {
    case 1:
      if (answer === "Yes") {
        showEligibilityMessage("Not eligible");
      } else {
        showNextQuestion(
          "Is your household income below the limit for your area based on household size?",
          "question-2"
        );
      }
      break;

    case 2:
      if (answer === "Yes") {
        showNextQuestion(
          "Do you meet credit requirements for a mortgage loan?",
          "question-3"
        );
      } else {
        showEligibilityMessage("Not eligible");
      }
      break;

    case 3:
      if (answer === "Yes") {
        showNextQuestion("Are you a first-time homebuyer?", "question-4");
      } else {
        showEligibilityMessage("Not eligible");
      }
      break;

    case 4:
      if (answer === "Yes") {
        // Add "CHOICE" to eligible programs
        eligiblePrograms.push("CHOICE");
        showNextQuestion(
          "Are you or anyone in your family have a disability?",
          "question-6"
        );
      } else {
        showNextQuestion(
          "Do you or anyone in your family have a disability?",
          "question-5"
        );
      }
      break;

    case 5:
      if (answer === "Yes") {
        // Add "CHOICE" to eligible programs
        eligiblePrograms.push("CHOICE");
        showNextQuestion(
          "Are you employed as a public protector, educator, healthcare worker, or active military?",
          "question-6"
        );
      } else {
        showNextQuestion(
          "Are you employed as a public protector, educator, healthcare worker, or active military?",
          "question-6"
        );
      }
      break;

    case 6:
      if (answer === "Yes") {
        // Add "PEN" to eligible programs
        eligiblePrograms.push("PEN");
      }
      showEligibilityBasedOnEligiblePrograms();
      break;

    default:
      break;
  }
}
