import React, { useState, useEffect } from 'react';
import './quiz.css';
import Badge from '../../../components/Badge';

export default function Quiz() {
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(-1);
  const [totalPoints, setTotalPoints] = useState(0);
  const [badge, setBadge] = useState(null);

  // The question
  const question = {
    id: 1,
    question: 'What are fixed costs?',
    options: [
      'Costs that remain constant regardless of production level',
      'Costs that change over time',
      'Costs that vary with production level',
    ],
    correctAnswer: 0,
  };

  // Load saved data from localStorage
  useEffect(() => {
    const savedScore = localStorage.getItem('f1quizScore');
    const savedSelectedAnswer = localStorage.getItem('selectedAnswer');
    const savedTotalPoints = localStorage.getItem('totalPoints');

    if (savedScore) {
      setQuizScore(parseInt(savedScore));
      setQuizCompleted(true);
    }

    if (savedSelectedAnswer) {
      setSelectedAnswer(parseInt(savedSelectedAnswer));
    }

    if (savedTotalPoints) {
      setTotalPoints(parseInt(savedTotalPoints));
    }
  }, []);

  // Points awarded for correctly answering the quiz
  const f1quizPoints = 5;

  // Save user's answer
  const handleOptionClick = (index) => {
    setSelectedAnswer(index);
    localStorage.setItem('selectedAnswer', index.toString());
  };

  // Handle quiz completion
  const handleQuizClose = () => {
    // Update score and quiz commpletion status accordingly
    const score = selectedAnswer === question.correctAnswer ? 1 : 0;
    setQuizScore(score);
    setQuizCompleted(true);

    // Update points 
    if (score === 1) {
      setTotalPoints((prevPoints) => prevPoints + f1quizPoints);
      localStorage.setItem('totalPoints', (totalPoints + f1quizPoints).toString());
      window.dispatchEvent(new Event('points-updated'));
    }

    // Save in local storage
    localStorage.setItem('f1quizScore', score.toString());
    localStorage.setItem('F1QuizCompleted', 'true');
  };

  const handleQuizReset = () => {
    setQuizCompleted(false);
    setQuizScore(0);
    setSelectedAnswer(-1);
    setTotalPoints(0);
    localStorage.removeItem('f1quizScore');
    localStorage.removeItem('selectedAnswer');
    localStorage.removeItem('F1QuizCompleted');
    localStorage.removeItem('totalPoints');
    localStorage.removeItem('earnedBadges');
  };

  return (
    <div className="quiz-container">
      <Badge setBadge={setBadge} />
      {quizCompleted ? (
        <div className="quiz-result-container">
          {quizScore === 1 ? (
            <div>
              <button onClick={handleQuizReset}>Reset Quiz</button>
              <div className="quiz-wrapper" style={{ position: 'relative' }}>
                <div
                  className="total-points"
                  style={{
                    color: '#EFB616',
                    position: 'absolute',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    right: '50px',
                  }}
                >
                  <img
                    src="images/star.png"
                    alt=""
                    style={{ height: '30px', marginRight: '5px', marginTop: '-5px' }}
                  />
                  {totalPoints}
                </div>
                <h3 className="correct-text" style={{ color: '#37b33a', position: 'absolute', fontWeight: 'bold', right: '30px', marginTop: '40px' }}>
                  +{f1quizPoints} Points!
                </h3>
                <i className="fa-solid fa-circle-question fa-3x"></i>
                <h3>Well Done!</h3>
                <p>You answered correctly.</p>
                <div className="questions-container">
                  <div>
                    <img
                      src="images/tick.png"
                      alt=""
                      style={{ height: '40px', marginBottom: '20px', marginTop: '10px' }}
                    />
                    <h4>{question.question}</h4>
                    <div
                      style={{ backgroundColor: '#e7eee5' }}
                      className="options-container"
                    >
                      {question.options[question.correctAnswer]}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div>
              <div className="quiz-wrapper" style={{ position: 'relative' }}>
                <div
                  className="total-points"
                  style={{
                    color: '#EFB616',
                    position: 'absolute',
                    fontWeight: 'bold',
                    fontSize: '20px',
                    right: '50px',
                  }}
                >
                  <img
                    src="images/star.png"
                    alt=""
                    style={{ height: '30px', marginRight: '5px', marginTop: '-5px' }}
                  />
                  {totalPoints}
                </div>
                <i className="fa-solid fa-circle-question fa-3x"></i>
                <h3>Not Quite</h3>
                <p>You answered incorrectly.</p>
                <div className="questions-container">
                  <div>
                    <img
                      src="images/cancel1.png"
                      alt=""
                      style={{ height: '40px', marginBottom: '20px' }}
                    />
                    <h4>{question.question}</h4>
                    <div
                      style={{ backgroundColor: '#ed9b9b', marginBottom: '40px' }}
                      className="options-container"
                    >
                      {question.options[selectedAnswer]}
                    </div>
                    <button onClick={handleQuizReset}>Try again</button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="quiz-wrapper" style={{ position: 'relative' }}>
          <div
            className="total-points"
            style={{
              color: '#EFB616',
              position: 'absolute',
              fontWeight: 'bold',
              fontSize: '20px',
              right: '50px',
            }}
          >
            <img
              src="images/star.png"
              alt=""
              style={{ height: '30px', marginRight: '5px', marginTop: '-5px' }}
            />
            {totalPoints}
          </div>
          <i className="fa-solid fa-circle-question fa-3x"></i>
          <h3>It's time to take a quiz!</h3>
          <p>Test your knowledge to earn points.</p>
          <div className="questions-container">
            <div>
              <h4>{question.question}</h4>
              <div className="options-container">
                {question.options.map((option, index) => (
                  <div
                    key={index}
                    className={`option ${
                      selectedAnswer === index ? 'selected' : ''
                    }`}
                    onClick={() => handleOptionClick(index)}
                  >
                    <div className="option-text">{option}</div>
                  </div>
                ))}
              </div>
              <button onClick={handleQuizClose}>Check Answer</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}