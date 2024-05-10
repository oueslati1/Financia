import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/S2Quiz';
import styles from '../FixedCosts/Chapter.module.css';
import Contents from './contents';

export default function SChapter2() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 2;
  const courseIdentifier = 'StartingCosts';

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigate(`/schapter${previousChapter}`);
    window.scrollTo(0, 0);
  };

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
      <h2 className={styles['chapter-page']}>Registration Fees</h2>
      <img className={styles['chapter-page-img']} src="/images/schapter3.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      Incorporating a company involves the necessary legal steps to officially register it and operate legally in the UK. The specific process and associated fees for registration depend on the business entity type you choose. 
      Overall, the cost of company registration in the UK encompasses various charges, such as legal and agent fees, along with a Companies House registration fee.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Sole Trader</p>
      <p className={styles['chapter-page']}>
      Opting to establish as a sole trader offers a simpler setup process, but it comes with personal liability for your business debts. You will have certain accounting responsibilities.
      <br></br><br></br>
      According to Companies House, to set up as a sole trader you’ll need to register for tax self-assessment with HMRC once you’ve earned more than £1,000 from self-employment between 6 April 2023 and 5 April 2024. 
      It’s a relatively easy process where you will need to provide your personal contact details, National Insurance number and business name.
      <br></br><br></br>
      As a sole trader you will need to:
      <br></br>•	keep business records and records of expenses
      <br></br>•	send a Self Assessment tax return every year
      <br></br>•	pay Income Tax on profits and Class 2 and Class 4 National Insurance 

      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Limited companies</p>
      <p className={styles['chapter-page']}>
      Establishing a limited company separates your business finances from your personal finances, but this also brings additional reporting and management requirements.
      Some people opt to get professional assistance, like hiring an accountant, when setting up a company but it is possible to handle the process yourself.
      <br></br><br></br>
      As of May 2024, using the online form service to register your company with Companies House will register you for Corporation Tax at the same time. If you register by post or another way, you’ll need to separately register for Corporation Tax within 3 months of starting to do business.
      <br></br><br></br>
      The online form is a simple process that requires at least 3 pieces of your personal information to confirm your identity. It costs £50 and usually takes less than 24 hours for your company to be registered after which you will get a ‘certificate of incorporation’. 
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Partnerships</p>
      <p className={styles['chapter-page']}>
      A partnership is often the easiest approach for running a business with one or more people. In a partnership, responsibility for the business's debts is shared alongside accounting obligations.
      This is because the business’s profits are shared between the partners and each pays tax on their share. According to Companies House, “partner does not have to be an actual person. For example, a limited company counts as a ‘legal person’ and can also be a partner”.
      <br></br><br></br>
      You will need to:
      <br></br>•	choose a name
      <br></br>•	choose a ‘nominated partner’ who will be responsible for managing the partnership’s tax returns and keeping business records.
      <br></br>•	register with HM Revenue and Customs (HMRC)
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={styles['chapter-page-next']} onClick={handleNextChapter}>Next Chapter</button>
    </div>
  );
}