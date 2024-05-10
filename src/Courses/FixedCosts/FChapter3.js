import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Chapter.module.css';
import Contents from './contents';
import Contentsstyles from './contents.module.css';
import Quiz from './Quizzes/F3Quiz';

export default function FChapter3() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 3;
  const courseIdentifier = 'FixedCosts';

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigate(`/fchapter${previousChapter}`);
    window.scrollTo(0, 0);
  };

  const handleNextSteps = () => {
    navigate('/FNextsteps');
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
      <h2 className={styles['chapter-page']}>Stepped Fixed Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/fchapter3.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      In the previous chapters, we explored fixed costs and how to calculate them. Fixed costs are expenses that remain constant regardless of a company's level of production or sales. However, there is a specific type of fixed cost known as "stepped fixed cost" that behaves slightly differently.
      <br></br> <br></br>Stepped fixed costs are expenses that increase in discrete, incremental steps as a business's activity or output level rises. These costs are "fixed" within certain ranges of output, but then jump up to a new, higher level as the company crosses specific thresholds.
       </p>
      <p className={styles['chapter-page']}>
      Examples of stepped fixed costs include:
      <br></br>• Salaries for additional management or supervisory personnel as production volumes increase
      <br></br>• Expansion of manufacturing or warehouse facilities to accommodate higher demand
      <br></br>• Upgrading of enterprise software licenses or IT infrastructure to support business growth
      <br></br><br></br>Unlike traditional fixed costs that remain flat, stepped fixed costs create a "staircase" effect, where the total cost rises in distinct jumps rather than a smooth, continuous line.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Calculating Stepped Fixed Costs</p>
      <p className={styles['chapter-page']}>
      The concept of stepped fixed costs revolves around the principle that certain expenses may remain constant within specific ranges of activity or production, but then increase in discrete increments as thresholds are crossed.
      <br/><br/>Let's consider a different example to illustrate this. Imagine a small manufacturing company that has the following stepped fixed cost structure for their facility rental:
      <br/>• Up to 5,000 units produced per month: Rent of £20,000
      <br/>• 5,001 to 10,000 units produced per month: Rent of £25,000
      <br/>• 10,001 to 15,000 units produced per month: Rent of £30,000
      <br/><br/>In this scenario, the company's rent would be £20,000 per month as long as production remains below 5,001 units. However, once production exceeds 5,000 units, the rent would immediately jump to £25,000 per month. Similarly, if production surpasses 10,000 units, the rent would increase again to £30,000.
      <br/><br/>To calculate the stepped fixed cost in this case, you would:
      <br/>1. Define the activity thresholds: 5,000 units and 10,000 units.
      <br/>2. Identify the associated costs at each threshold: £20,000, £25,000, and £30,000.
      <br/>3. Determine the current production range based on the company's actual output.
      <br/>4. Calculate the step cost by subtracting the current fixed cost from the proposed fixed cost at the next threshold.
      <br/><br/>For example, if the company is currently producing 8,000 units per month, the step cost would be £5,000 (£25,000 - £20,000), as the business has crossed the 5,000-unit threshold.
      <br/><br/>Understanding and properly accounting for stepped fixed costs is crucial for accurate financial planning and decision-making, as it allows businesses to anticipate and prepare for the incremental increases in fixed expenses that accompany growth and expansion.
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={styles['chapter-page-next']} onClick={handleNextSteps}>Next Steps</button>
    </div>
  );
}