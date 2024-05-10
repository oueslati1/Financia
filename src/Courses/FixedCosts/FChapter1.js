import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/F1Quiz';
import styles from './Chapter.module.css';
import Contents from './contents';
import Contentsstyles from './contents.module.css';

export default function FChapter1() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 1;
  const courseIdentifier = 'FixedCosts';

  const handleNextChapter = () => {
    const nextChapter = chapterNumber + 1;
    navigate(`/fchapter${nextChapter}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const currentChapter = location.pathname.substring(1); // Remove the leading slash
    sessionStorage.setItem(`lastChapter_${courseIdentifier}`, currentChapter);

    return () => {
      // Cleanup code if needed
    };
  }, [location.pathname, courseIdentifier]);

  return (
    <div className={styles['chapter-page']}>
      <div className={styles['chapter-page-title']}>
        <Contents/>
      <h2 className={styles['chapter-page']}>Introduction to Fixed Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/fchapter1.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      Fixed costs are a critical component of a company's overall cost structure and must be carefully managed to ensure the business's long-term viability. Understanding and accurately calculating fixed costs is essential for making informed decisions about pricing, budgeting, and profitability. This chapter will discuss some examples of fixed costs.
       </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Staff</p>
      <p className={styles['chapter-page']}>
        Labour is usually the highest cost for businesses. As of April 2024, the national living wage is £11.44 for those ages 21 and over. For those 20 and under, the national minimum wage applied which is £8.60 for 18-20 and £6.40 for under 18 and apprentices.
        The London living wage is currently £13.15, it is higher than the national wage as it reflects the higher cost of living in comparison to the rest of the country. However, the London living wage is not set in law like the national minimum wage therefore employers have the choice of whether they want to offer it to their employees.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Rent</p>
      <p className={styles['chapter-page']}>
      Another very big fixed cost for many businesses is rent. This is the monthly payment made to the owner of the property to use the premises. The rental contract outlines the rules around how much the rent can increase over time.
      Businesses may also have to pay business rates to their local council. These rates are usually around 50% of the property's rental value. For example, if the rent is £5,000 per month, the business rates could be around £2,500 per month.
      However, some properties or businesses are exempt from paying these rates and the government also sometimes have relief programmes to reduce business rates and incentivise growth.
      </p>
      <p className={styles['chapter-page']}>
        In the following chapters, we will delve deeper into how to calculate fixed costs and the different measures you can use. By the end of this course, you will have a solid understanding of fixed costs and how they impact business operations.
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handleNextChapter}>Next Chapter</button>
    </div>
  );
}