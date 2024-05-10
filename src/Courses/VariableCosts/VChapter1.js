import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/V1Quiz';
import styles from '../FixedCosts/Chapter.module.css';
import Contents from './contents';

export default function VChapter1() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 1;
  const courseIdentifier = 'VariableCosts';

  const handleNextChapter = () => {
    const nextChapter = chapterNumber + 1;
    navigate(`/vchapter${nextChapter}`);
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    const currentChapter = location.pathname.substring(1); // Remove the leading slash
    sessionStorage.setItem(`lastChapter_${courseIdentifier}`, currentChapter);

    return () => {
    };
  }, [location.pathname, courseIdentifier]);

  return (
    <div className={styles['chapter-page']}>
      <div className={styles['chapter-page-title']}>
        <Contents/>
      <h2 className={styles['chapter-page']}>Introduction to Variable Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/v1.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      Variable costs are the costs that rise or fall in direct proportion to changes in a business's activity or output. They are incurred as a direct result of the company's operations and are essential for generating revenue. They increase or decrease based on the volume of goods produced or services provided, making them a crucial consideration in the overall cost structure.
      Let's explore some common examples of variable costs that businesses may encounter. 
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Raw Materials</p>
      <p className={styles['chapter-page']}>
      For manufacturing or production-based companies, the cost of raw materials used to create the final product is a prime example of a variable cost. As output increases, the consumption of these raw materials, such as components, parts, or ingredients, will rise accordingly.  
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Packaging & Shipping</p>
      <p className={styles['chapter-page']}>
      For companies that sell physical products, the costs of packaging materials and shipping services are directly tied to the volume of goods being transported. As sales or production increases, so too will these variable expenses.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Credit Card Processing Fees</p>
      <p className={styles['chapter-page']}>
      For businesses that accept credit card payments, credit card processing fees are transaction-based meaning that they fluctuate in line with sales activity.  The rate charged by the credit card processor may be a flat percentage, but the total amount a business pays will rise and fall based on the number and value of credit card transactions. For example, an ice cream shop’s credit card processing fees are likely to be significantly higher in the summer months when it is hot compared to the slower winter months. As sales volume increases, so do the variable costs associated with facilitating those transactions through credit card networks.
       </p>
       <p className={styles['chapter-page']}>
       In the next chapters, we'll dive deeper into the methods for calculating variable costs, average variable costs, the variable cost ratio and explore the concept of economies of scale.
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handleNextChapter}>Next Chapter</button>
    </div>
  );
}