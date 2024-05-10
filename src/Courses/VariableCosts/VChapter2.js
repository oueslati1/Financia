import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/V2Quiz';
import styles from '../FixedCosts/Chapter.module.css';
import Contents from './contents';

export default function VChapter2() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 2;
  const courseIdentifier = 'VariableCosts';

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigate(`/vchapter${previousChapter}`);
    window.scrollTo(0, 0);
  };

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
      <h2 className={styles['chapter-page']}>Calculating Variable Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/v3.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      In this chapter, we will delve into the fundamental formulas and metrics used to calculate variable costs. As mentioned earlier, variable costs are expenses that vary depending on a company's production or sales volume. Accurately calculating these costs can help businesses to making informed decisions based by creating and monitoring forecasts.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Total Variable Cost</p>
      <p className={styles['chapter-page']}>
      Total Variable Cost = Variable Cost per Unit × Total Number of Units
      <br/><br/>Consider the case of a software development firm that charges clients a fee for each software license it provides. The variable costs associated with each license may include the cost of the software platform, hosting fees, and any per-user licensing fees. If the variable cost per license is £20 and the firm sells 10,000 licenses, the total variable cost would be £200,000 (£20 × 10,000).
      <br/><br/>Understanding this variable cost calculation allows businesses to forecast the impact of changes in sales volume or input prices. By modelling different scenarios, companies can anticipate how variable expenses might fluctuate and plan accordingly.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Average Variable Cost</p>
      <p className={styles['chapter-page']}>
      Beyond the total variable cost, businesses can also calculate the average variable cost (AVC) per unit. This metric provides insight into the variable cost burden per item sold, which is essential for pricing decisions and break-even analysis.
      <br/><br/>The AVC formula is:
      <br/>AVC = Total Variable Cost / Total Output
      <br/><br/> Imagine a manufacturing company that produces metal components. Monitoring the AVC helps the company ensure that the selling price of each component remains above the variable cost per unit, enabling the business to cover its fixed costs and generate a profit.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Semi-Variable Cost</p>
      <p className={styles['chapter-page']}>
      In some cases, a company may encounter semi-variable costs which are expenses that have both fixed and variable components. The formula for semi-variable costs is:
      <br/>Semi-Variable Cost = Fixed Cost + Variable Cost
      <br/><br/> For instance, a logistics company may have a minimum monthly fee for its warehouse storage services, plus a variable cost per pallet stored. Accurately accounting for these mixed costs is crucial for comprehensive financial planning and decision-making.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Variable Cost Ratio</p>
      <p className={styles['chapter-page']}>
      Finally, the variable cost ratio expresses a company's variable costs as a percentage of net sales. This metric provides insight into the business's contribution margin and its ability to cover fixed costs and generate profits. A higher ratio indicates a greater potential for the company to generate profits even with lower sales, as it possesses a larger contribution margin to allocate towards its fixed costs.
      <br/><br/>Variable Cost Ratio = Variable Costs / Net Sales
      <br/><br/> If the jam manufacturer sells each jar for £5 and the variable cost per jar is £2, the variable cost ratio would be 0.40 (£2 / £5).
      <br/><br/>This means that for every £5 the company earns from selling a jar of jam, £2 goes towards covering the variable costs, and the remaining £3 (60% of the selling price) contributes towards covering the fixed costs and generating profit.
      <br/><br/>This information is valuable for the jam manufacturer, as it allows the company to:
      <br/>• Assess the impact of changes in variable costs on the overall profitability
      <br/>• Determine appropriate pricing strategies to maintain a healthy contribution margin
      <br/>• Allocate resources more effectively by focusing on the most profitable product lines
      <br/>• Evaluate the business's scalability and ability to absorb increases in fixed costs
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={styles['chapter-page-next']} onClick={handleNextChapter}>Next Chapter</button>
    </div>
  );
}