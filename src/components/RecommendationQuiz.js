import React, { useEffect } from 'react';
import './recommendationQuiz.css'

const RecommendationQuiz = () => {
  useEffect(() => {
    const openModal = () => {
      document.getElementById('myModal').style.display = 'block';
      document.body.classList.add('modal-open');

      // Reset the form
      document.getElementById('questionnaireForm').reset();

      // Clear any previous recommendation
      document.getElementById('recommendation').innerHTML = '';

      // Generate the questions dynamically
      const questions = [
        'Question 1: Are you a business owner, if so since when?',
        'Question 2: What area are you looking to gain knowledge in?',
        'Question 3: Which aspect of costs do you find most interesting?',
        'Question 4: What would you like to improve your understanding of?',
        'Question 5: Which concept would you like to learn more about?',
      ];

      const questionContainer = document.getElementById('questionContainer');
      questionContainer.innerHTML = '';

      questions.forEach((questionText, index) => {
        const questionNumber = index + 1;

        const questionHeading = document.createElement('h3');
        questionHeading.textContent = questionText;
        questionContainer.appendChild(questionHeading);

        const buttonContainer = document.createElement('div');
        buttonContainer.classList.add('button-container');

        const button1 = document.createElement('button');
        button1.type = 'button';
        button1.name = 'question' + questionNumber;
        button1.value = 'Starting Cost';
        button1.textContent = questionNumber === 1 ? 'No' : questionNumber === 2 ? 'Branding' : questionNumber === 3 ? 'Registration fees': questionNumber === 4 ? "Types of businesses" : "Business identity";
        buttonContainer.appendChild(button1);

        const button2 = document.createElement('button');
        button2.type = 'button';
        button2.name = 'question' + questionNumber;
        button2.value = 'Fixed Cost';
        button2.textContent = questionNumber === 1 ? 'Yes for less than a year' : questionNumber === 2 ? 'Staff wages' : questionNumber === 3 ? 'Stepped fixed costs': questionNumber === 4 ? "Break-Even Point" : "Costs Formulas";
        buttonContainer.appendChild(button2);

        const button3 = document.createElement('button');
        button3.type = 'button';
        button3.name = 'question' + questionNumber;
        button3.value = 'Variable Cost';
        button3.textContent = questionNumber === 1 ? 'Yes for over a year' : questionNumber === 2 ? 'Contribution margins' : questionNumber === 3 ? 'Semi-Variable Cost': questionNumber === 4 ? "Economies of scale " : "Scalability";
        buttonContainer.appendChild(button3);

        questionContainer.appendChild(buttonContainer);
      });
    };

    const closeModal = () => {
      document.getElementById('myModal').style.display = 'none';
      document.body.classList.remove('modal-open');

      // Reset the submit button
      const submitButton = document.getElementById('questionnaireForm').querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.style.display = 'block';
      }
    };

    const handleButtonClick = (event) => {
      const target = event.target;
      if (target.tagName === 'BUTTON') {
        const buttons = document.getElementsByName(target.name);
        Array.from(buttons).forEach((button) => {
          button.classList.remove('selected');
        });
        target.classList.add('selected');
      }
    };

    const handleFormSubmit = (event) => {
      event.preventDefault(); // Prevent the default form submission

      const buttons = document.getElementsByClassName('selected');
      const serviceCounts = {};

      // Count the selected services
      for (let i = 0; i < buttons.length; i++) {
        const selectedService = buttons[i].value;
        if (serviceCounts[selectedService]) {
          serviceCounts[selectedService]++;
        } else {
          serviceCounts[selectedService] = 1;
        }
      }

      // Find the most selected service
      let recommendedServices = [];
      let maxCount = 0;

      for (const service in serviceCounts) {
        if (serviceCounts[service] > maxCount) {
          recommendedServices = [service];
          maxCount = serviceCounts[service];
        } else if (serviceCounts[service] === maxCount) {
          recommendedServices.push(service);
        }
      }

      // Clear the previous recommendation
      const recommendationContainer = document.getElementById('recommendation');
      recommendationContainer.innerHTML = '';

      // Display the recommendation
      const recommendationText = '\n\nRecommended Course: ' + recommendedServices.join(' + ');
      const recommendationElement = document.createElement('p');
      recommendationElement.textContent = recommendationText;
      recommendationContainer.appendChild(recommendationElement);

      // Hide the submit button
      const submitButton = event.target.querySelector("button[type='submit']");
      if (submitButton) {
        submitButton.style.display = 'none';
      }
    };

    document.getElementById('openModal').addEventListener('click', openModal);
    document.getElementsByClassName('close')[0].addEventListener('click', closeModal);
    window.addEventListener('click', (event) => {
      if (event.target === document.getElementById('myModal')) {
        closeModal();
      }
    });
    document.getElementById('questionContainer').addEventListener('click', handleButtonClick);
    document.getElementById('questionnaireForm').addEventListener('submit', handleFormSubmit);
  }, []);

  return (
    <>
      {/* Recommendation Questionnaire */}
      <button id="openModal" type="button" className="topics-button">
        Not sure where to start?
      </button>
      {/* The Modal */}
      <div id="myModal" className="modal">
        {/* Modal content */}
        <div className="modal-content">
          <span className="close">&times;</span>
          <div id="questionContainer" className="question-container"></div>
          <form id="questionnaireForm">
            <button type="submit" className="submit-button">
              Submit
            </button>
          </form>
          <div id="recommendation" className="recommendation-container"></div>
        </div>
      </div>
    </>
  );
};

export default RecommendationQuiz;