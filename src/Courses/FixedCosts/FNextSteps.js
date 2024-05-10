import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './nextsteps.module.css';
import ConfettiExplosion from 'react-confetti-explosion';

export default function FNextSteps() {
  const navigate = useNavigate();

  // Retrieve the last completed course from local storage
  const lastCompletedCourse = 'Fixed Costs'; // Assuming the last completed course is Fixed Costs

  const courses = [
    {
      id: 2,
      title: 'Variable Costs',
      description: 'Learn about variable costs in this course.',
      page: 'VariableCosts'
    },
    {
      id: 3,
      title: 'Starting Costs',
      description: 'Learn about starting costs in this course.',
      page: 'StartingCosts'
    },
  ];

  const recommendedCourses = courses.filter(
    (course) =>
      course.title !== lastCompletedCourse
  );

  const handleCourseButtonClick = (page) => {
    navigate(`/${page}`);
    window.scrollTo(0, 0);
  };

  return (
    <div className="next-page">
      <div className="confetti-container">
              <ConfettiExplosion force={0.4} duration={4000} particleCount={100} width={1200} />
            </div>
      <h2 className={styles['next-page']}>You have completed the Fixed Costs course!</h2>
      <p className={styles['next-page']}>We offer other courses which might interest you. Choose from the course below to continue your learning journey.</p>
      <div className={styles['next-page']}>
        {recommendedCourses.map((course) => (
          <div className={styles['next-page']} key={course.id}>
            <h3 className={styles['next-page']}>{course.title}</h3>
            <p className={styles['next-page']}>{course.description}</p>
            <button className={styles['next-page']} onClick={() => handleCourseButtonClick(course.page)}>
              Take Course
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}