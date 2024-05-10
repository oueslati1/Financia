import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Quiz from './Quizzes/S3Quiz';
import styles from '../FixedCosts/Chapter.module.css';
import Contents from './contents';

export default function FChapter3() {
  const navigate = useNavigate();
  const location = useLocation();
  const chapterNumber = 3;
  const courseIdentifier = 'StartingCosts';

  const handlePreviousChapter = () => {
    const previousChapter = chapterNumber - 1;
    navigate(`/schapter${previousChapter}`);
    window.scrollTo(0, 0);
  };

  const handleNextSteps = () => {
    navigate('/snextsteps');
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
      <h2 className={styles['chapter-page']}>Branding Costs</h2>
      <img className={styles['chapter-page-img']} src="/images/schapter2.png" alt="Image" />
      </div>
      <p className={styles['chapter-page']}>
      Developing a strong, recognisable brand is essential for the success of any business, and it requires strategic investment across several key areas. The main components of branding costs include brand strategy, brand identity and website design and development.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Brand Strategy</p>
      <p className={styles['chapter-page']}>
      Your brand is more than just your logo, it encompasses the entire experience and emotional connection you cultivate with your customers. Crafting an effective brand strategy is essential for defining who you are, what you stand for, and how you uniquely serve your target market.
      <br></br><br></br>
      At the heart of your brand strategy lies the process of deeply understanding your business, your competitive landscape, and your audience. This involves meticulous research, analysis, and the distillation of your core purpose, values, and unique positioning. While you can certainly undertake this strategic work independently, many businesses choose to collaborate with branding experts who can provide an outside perspective and proven methodologies. 
      This can add significant costs to your branding budget, typically ranging from £5,000 to £20,000 for start-ups but can be more depending on the scope of the project.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Brand Identity</p>
      <p className={styles['chapter-page']}>
      Bringing your brand to life requires establishing a distinct visual identity. This includes designing a memorable logo, selecting cohesive brand colours and typography, and creating other visual assets like branded graphics, icons, and photography. Consistency is key, as every touchpoint must seamlessly align to create a memorable, recognisable brand.
      Outsourcing brand identity development to a professional graphic designer or design agency is a common approach, with costs typically ranging from £2,000 to £10,000 depending on the complexity of the design work. Alternatively, more DIY-oriented tools and templates are available for businesses with tighter budgets.
      <br></br><br></br>
      Investing in these core branding components may require a significant upfront financial commitment. However, the long-term payoff of a strong, cohesive brand can be transformative for your business, translating to greater customer loyalty, enhanced credibility, and increased success in the marketplace.
      </p>
      <p style={{ maxWidth: '80%', fontWeight: 'bold',  paddingLeft: '20px', margin: '0 auto'}}>Website Design & Development</p>
      <p className={styles['chapter-page']}>
      In today's digital-first landscape, your website serves as a critical touchpoint for your brand, acting as the virtual storefront for your business. Investing in a well-designed, user-friendly website is essential for making a strong first impression and effectively communicating your brand's value to potential customers. Costs for website design and development can vary widely, ranging from around £3,000 to £50,000 depending on the complexity of the site. Whereas businesses that need a dedicated in-house web developer can expect to pay £20,000 to £75,000 per year, depending on the developer's location and experience level. 
      <br></br><br></br>
      Careful budgeting and planning for these branding components can help ensure that your business presents a cohesive, professional, and memorable brand identity to your target audience, ultimately driving customer engagement and loyalty.
      </p>
      <Quiz/>
      <button className={styles['chapter-page-next']} onClick={handlePreviousChapter}>Previous Chapter</button>
      <button className={styles['chapter-page-next']} onClick={handleNextSteps}>Next Steps</button>
    </div>
  );
}