import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Chapter.module.css';
import Contents from './contents';
import Contentsstyles from './contents.module.css';
import Quiz from './Quizzes/F2Quiz';

export default function FChapter2() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 2;
  const courseIdentifier = 'FixedCosts';

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigate(`/fchapter${previousChapter}`);
    window.scrollTo(0, 0);
  };

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
      <h2 className={styles['chapter-page']}>Calculating Fixed Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/fchapter2.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      In the previous chapter, we established that fixed costs are the consistent, predictable expenses a business must account for, regardless of its level of output or sales. Now, let's dive deeper into the methods for calculating and understanding these costs.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Total Fixed Costs</p>
      <p className={styles['chapter-page']}>
      The total fixed costs (TFC) is the sum of all fixed expenses necessary for running your business over a specific period, typically a month or a year. This includes costs like rent, insurance premiums and salaries. To determine the TFC, you would add up all these fixed expenses:
      <br></br><br></br>TFC = Rent + Insurance + Salaries + Other Fixed Costs
      <br></br><br></br>Knowing the total fixed costs provides a baseline for understanding the company's financial obligations and the minimum revenue required to cover these expenses.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Average Fixed Costs</p>
      <p className={styles['chapter-page']}>
      The average fixed cost (AFC) is the total fixed cost divided by the number of units produced or sold. This metric helps businesses understand the fixed cost per unit, which is essential for pricing decisions and break-even analysis.
      <br></br><br></br>AFC = Total Fixed Costs / Number of Units Produced or Sold
      <br></br><br></br>The average fixed cost will decrease as production or sales volume increases, as the fixed costs are spread across more units.
        </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Break-Even Point</p>
      <p className={styles['chapter-page']}>
      The break-even point (BEP) is the level of sales or production at which a company's total revenue equals its total costs, meaning it has neither a profit nor a loss. Determining the BEP is crucial for understanding the minimum level of activity required for the business to cover its fixed and variable costs.
      To calculate the BEP, you'll need to know the total fixed costs and the contribution margin per unit (the selling price per unit minus the variable cost per unit).
      <br></br><br></br>BEP (in units) = Total Fixed Costs / Contribution Margin per Unit
      <br></br><br></br>Alternatively, the BEP can be expressed in terms of sales revenue:
      <br></br><br></br>BEP (in sales revenue) = Total Fixed Costs / Contribution Margin Ratio
      <br></br><br></br>(Contribution Margin Ratio = Contribution Margin per Unit / Selling Price per Unit)
        </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={styles['chapter-page-next']} onClick={handleNextChapter}>Next Chapter</button>
    </div>
  );
}