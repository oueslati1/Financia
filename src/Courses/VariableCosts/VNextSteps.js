import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../FixedCosts/nextsteps.module.css';
import ConfettiExplosion from 'react-confetti-explosion';

export default function SNextSteps() {
  const navigate = useNavigate();

  const lastCompletedCourse = 'Variable Costs'; 

  const courses = [
    {
      id: 1,
      title: 'Fixed Costs',
      description: 'Learn about fixed costs in this course.',
      page: 'FixedCosts'
    },
    {
      id: 2,
      title: 'Starting Costs',
      description: 'Learn about starting costs in this course.',
      page: 'StartingCosts'
    },
  ];

  const recommendedCourses = courses.filter(
    (course) => course.title !== lastCompletedCourse
  );

  const handleCourseButtonClick = (page) => {
    // Perform any necessary actions before navigating to the course page
    navigate(`/${page}`); 
  };

  return (
    <div className="next-page">
      <div className="confetti-container">
              <ConfettiExplosion force={0.4} duration={4000} particleCount={100} width={1200} />
            </div>
      <h2 className={styles['next-page']}>You have completed the Variable Costs course!</h2>
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