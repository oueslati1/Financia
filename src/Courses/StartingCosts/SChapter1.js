import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/S1Quiz';
import styles from '../FixedCosts/Chapter.module.css';
import Contents from './contents';

export default function SChapter1() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 1;
  const courseIdentifier = 'StartingCosts';

  const handleNextChapter = () => {
    const nextChapter = chapterNumber + 1;
    navigate(`/schapter${nextChapter}`);
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
      <h2 className={styles['chapter-page']}>Introduction to Starting Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/schapter1.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      Start-up costs are the initial expenses that are incurred during the process of getting a company up and running. They are usually one-time costs such as equipment, company registration or even miscellaneous items such as the launching party. These expenses are sunk costs because you can’t get start up costs back once you spend them, in other words they become irretrievable.  
      <br></br><br></br>
      On average, it costs around £5000 to start a business in the UK and a startup will spend up £22,756 in its first year of trading according to a study commissioned by Geniac. Let’s discuss some examples of start up costs. 
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Equipment costs</p>
      <p className={styles['chapter-page']}>
      Equipment costs are a vital consideration when setting up a bakery. These costs encompass the necessary tools, machinery, and facilities required for production and service. 
      In a traditional bakery, this includes items such as ovens, mixers, dough sheeters, proofing cabinets, and refrigeration units. Display cases, shelves, and counters are also necessary for showcasing your baked goods to customers. It is essential to compile a thorough list of all the required equipment to ensure the efficient functioning of your bakery.
      <br></br><br></br>
      Alongside the baking equipment, it is important to consider other essentials that contribute to a comfortable and practical workspace. This may involve kitchen appliances, sinks, worktables, storage areas, and restroom fixtures. 
      By carefully documenting and planning for all the necessary equipment, you can accurately estimate costs and ensure that your bakery has everything needed to operate smoothly.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Software and IT costs</p>
      <p className={styles['chapter-page']}>
      It’s important to account for the expenses associated with software and IT infrastructure. This includes acquiring the necessary software licenses to support your operations. For example, you may need licenses for software like Microsoft Office 365, which can start at £7.99 per user per month, and Xero accounting software, available from £10.00 per month. 
      Exploring alternative products, such as substituting Microsoft Word with Google Docs, can also help reduce costs.
      <br></br><br></br>
      You should also consider the expenditure on computer hardware. The cost of a laptop or desktop PC, including the operating system and peripheral equipment, typically ranges between £500 and £1,000. 
      This investment ensures you have the appropriate computing resources and devices to effectively support your business activities.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Insurance costs</p>
      <p className={styles['chapter-page']}>
      Safeguarding the business against potential legal disputes or unforeseen accidents is crucial. The specific insurance policies a company invests in can vary depending on the industry. However, two of the most significant policies are general liability and property insurance. 
      General liability insurance provides coverage for issues that may arise against the business, such as injuries that occur on the premises or due to the use of the company's products.
      <br></br><br></br>
      Property insurance, on the other hand, enables the business to recover the costs associated with lost or damaged property resulting from natural disasters or fires. This can encompass the business premises, equipment, or physical goods. Other types of insurance that may be considered include errors and omission insurance, workers' compensation insurance, and health insurance. 
      It's important to note that the extent of coverage provided by an insurance policy can vary based on the terms and conditions set by the insurance company.
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handleNextChapter}>Next Chapter</button>
    </div>
  );
}