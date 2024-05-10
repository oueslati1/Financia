import React, { useState } from 'react';

export default function FAQSection() {
  const [isOpen, setIsOpen] = useState([]);

  const toggleAnswer = (index) => {
    const updatedOpenState = [...isOpen];
    updatedOpenState[index] = !updatedOpenState[index];
    setIsOpen(updatedOpenState);
  };

  return (
    <section className="faq">
      <div className="section-header">
        <h1>FAQ</h1>
        <h2>Frequently asked <br/>questions.</h2>
      </div>
      <div className="faq-container">
        <div className={`faq-box ${isOpen[1] ? 'opened' : ''}`}>
          <div className="question" onClick={() => toggleAnswer(1)}>
            How long does each course take to complete? <span className={`marker ${isOpen[1] ? 'rotate' : ''}`}>+</span>
          </div>
          <div className={`answer ${isOpen[1] ? 'show' : ''}`}>
            Our courses are self-paced, so this varies from person to person. However, you should expect to spend 30 minutes to an hour on each topic.
          </div>
        </div>
        <div className={`faq-box ${isOpen[2] ? 'opened' : ''}`}>
          <div className="question" onClick={() => toggleAnswer(2)}>
            Are the courses free? <span className={`marker ${isOpen[2] ? 'rotate' : ''}`}>+</span>
          </div>
          <div className={`answer ${isOpen[2] ? 'show' : ''}`}>
            Yes, all of our courses are free to use.
          </div>
        </div>
        <div className={`faq-box ${isOpen[3] ? 'opened' : ''}`}>
          <div className="question" onClick={() => toggleAnswer(3)}>
            Who are these courses aimed at? <span className={`marker ${isOpen[3] ? 'rotate' : ''}`}>+</span>
          </div>
          <div className={`answer ${isOpen[3] ? 'show' : ''}`}>
            Anyone can use our courses to improve their financial knowledge; however, our content is mainly aimed at aspiring business owners in London.
          </div>
        </div>
      </div>
    </section>
  );
}