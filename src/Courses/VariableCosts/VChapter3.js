import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/V3Quiz';
import styles from '../FixedCosts/Chapter.module.css';
import Contents from './contents';


export default function VChapter3() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 3;
  const courseIdentifier = 'VariableCosts';

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigate(`/vchapter${previousChapter}`);
  };

  const handleNextSteps = () => {
    navigate('/vnextsteps');
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
      <h2 className={styles['chapter-page']}>Economies of Scale</h2>
      <img className={styles['chapter-page-img']} src="/images/v2.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      Economies of scale refers to the cost benefits that can occur when a company increases its scale of production. As a company grows in size and output, it often becomes more efficient, resulting in a decreased cost-per-unit. 
      This cost reduction is achieved because the fixed and variable costs of production are spread across a larger number of units, leading to a lower overall cost per item produced. In other words, the larger the business, the lower its per-unit costs tend to be.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>External Economies of Scale</p>
      <p className={styles['chapter-page']}>
      These are cost advantages that are dependent on external factors, such as government policies, infrastructure improvements, or the availability of a skilled labor pool. These external factors can enable companies to reduce their costs without directly controlling the underlying operations.  
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Internal Economies of Scale</p>
      <p className={styles['chapter-page']}>
      These are cost advantages that are within the company's control. They can be achieved through various means, including:
      <br/><br/>• Technical economies: Investing in advanced technology and equipment to improve efficiency and productivity.
      <br/>• Purchasing economies: Buying materials and supplies in bulk to negotiate lower per-unit prices.
      <br/>• Financial economies: Accessing more favorable borrowing rates due to the company's size and creditworthiness.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Advantages of economies of scale</p>
      <p className={styles['chapter-page']}>
      The benefits of economies of scale to industries and businesses are wide-ranging, but generally speaking, it enables large corporations to reduce their costs, pass the savings onto the consumer, and gain an advantage over the competition. Some of the key advantages include:
      <br/><br/>• Reduced long-term unit costs: One of the main benefits of internal economies of scale is reduced costs, enabling businesses to improve their price competitiveness in global markets.
      <br/>• Increased profits: Economies of scale lead to increased profits, generating a higher return on capital investment and providing businesses with the platform to grow.
      <br/>• Larger business scale: As a business grows in size, it solidifies and becomes less vulnerable to external threats, such as hostile takeover bids. This is one of the key benefits of economies of scale to industries as it has a positive effect on the company's share price, as well as their ability to raise new financing.
      <br/><br/>For consumers, the advantages of economies of scale include lower prices, product improvements, and potentially higher wages for employees.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Disadvantages of economies of scale (Diseconomies of scale)</p>
      <p className={styles['chapter-page']}>
      When a business becomes too large, its unit costs may begin to rise. This is referred to as a diseconomy of scale, and it's a major drawback that growing businesses need to pay attention to. Diseconomies of scale can be caused by a number of different factors, including:
      <br/><br/>• Poor communication: Ineffective communication, wherein it becomes more difficult to coordinate a large workforce as your company grows, is one of the major factors behind diseconomies of scale.
      <br/>• Loss of control: As a business grows, it becomes increasingly difficult to monitor the productivity and quality of thousands of employees, leading to inefficient production processes.
      <br/>• Duplication of effort: Duplication of effort can also be an issue, where more than one person ends up working on the same function or task.
      <br/>• Weak morale: As businesses become larger, staff are more likely to feel remote and develop a sense of alienation, which can lead to reduced productivity and wastage.
      <br/>• Complacency: When a company achieves significant scale and dominates the market, there is a possibility of becoming complacent and losing the drive for innovation and improvement. 
      <br/><br/>It's important for companies to carefully manage their growth and expansion to ensure they maintain the advantages of scale without succumbing to the pitfalls of excessive size.
      <br/><br/>By understanding the dynamics of economies of scale, companies can make informed decisions about their growth strategies, resource allocation, and investment priorities. This knowledge can help businesses optimise their operations, enhance their competitiveness, and ultimately deliver greater value to their customers and stakeholders.
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={styles['chapter-page-next']} onClick={handleNextSteps}>Next Steps</button>
    </div>
  );
}