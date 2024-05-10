import React from 'react';
import { useNavigate } from 'react-router-dom';
import Contents from './contents';
import styles from '../FixedCosts/flanding.module.css';

export default function SLandingPage() {
  const navigate = useNavigate();

  const handleContinueLearning = () => {
    const courseIdentifier = 'StartingCosts';
    const lastVisitedChapter = sessionStorage.getItem(`lastChapter_${courseIdentifier}`);

    if (lastVisitedChapter) {
      navigate(`/${lastVisitedChapter}`);
      window.scrollTo(0, 0);
    } else {
      navigate('/schapter1');
      window.scrollTo(0, 0);
    }
  };

  const buttonLabel = sessionStorage.getItem(`lastChapter_StartingCosts`) ? 'Continue Learning' : 'Start Learning';

  return (
    <div className={styles['landing-page']}>
      <div className={styles['landing-page-title']}>
      <Contents/>
      <h2 className={styles['landing-page']}>Welcome to the Starting Costs Course</h2>
    </div>
      <h3 className={styles['landing-page']}>Prerequisite knowledge</h3>
      <p className={styles['landing-page']}>
        This course does not require any prior knowledge. It is fully accessible to all aspiring business owners, whether novel or experienced.
      </p>
      <h3 className={styles['landing-page']}>Overview</h3>
      <p className={styles['landing-page']}>
      Here's an overview of features you'll learn about in this course:
      <ul>
      <li>What Starting Costs are and some examples</li>
      <li>The different types of companies and how you can register</li>
      <li>Everything branding!</li>
      </ul>
      </p>
      <h3 className={styles['landing-page']}>Structure</h3>
      <p className={styles['landing-page']}>
        This course has 3 chapters. Each chapter has a lesson followed by a quiz to test what you've learnt. Complete quizzes successfully to earn points and badges.
      </p>
      <button onClick={handleContinueLearning}>{buttonLabel}</button>
    </div>
  );
}