import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from '../FixedCosts/contents.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck } from '@fortawesome/free-regular-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function Contents() {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentChapterForToggle, setCurrentChapterForToggle] = useState('');
  const [currentChapterForProgress, setCurrentChapterForProgress] = useState('');
  const [progress, setProgress] = useState(0); // Progress percentage
  const [totalChapters, setTotalChapters] = useState(3);
  const [chaptersCompleted, setChaptersCompleted] = useState(0);

  useEffect(() => {
    // Set the initial value of currentChapterForToggle based on the current location path
    switch (location.pathname) {
      case '/StartingCosts':
        setCurrentChapterForToggle('Introduction');
        break;
      case '/schapter1':
        setCurrentChapterForToggle('Chapter 1: Introduction to Starting Costs');
        break;
      case '/schapter2':
        setCurrentChapterForToggle('Chapter 2: Registration Fees');
        break;
      case '/schapter3':
        setCurrentChapterForToggle('Chapter 3: Branding Costs');
        break;
      case '/nextsteps':
        setCurrentChapterForToggle('Next Steps');
        break;
      default:
        setCurrentChapterForToggle('Contents');
        break;
    }

    calculateProgress();
  }, [location.pathname]);

  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDropdownItemClick = (path, chapter) => {
    navigate(path);
    setShowDropdown(false);
    setCurrentChapterForToggle(chapter);
  };

  const calculateProgress = () => {
    const completionStatus = {
      chapter1: localStorage.getItem('S1QuizCompleted') === 'true',
      chapter2: localStorage.getItem('S2QuizCompleted') === 'true',
      chapter3: localStorage.getItem('S3QuizCompleted') === 'true',
    };

    const chapterTitles = {
      introduction: 'Introduction',
      chapter1: 'Chapter 1: Introduction to Starting Costs',
      chapter2: 'Chapter 2: Registration Fees',
      chapter3: 'Chapter 3: Branding Costs',
      nextSteps: 'Next Steps',
    };

    const completedChapters = Object.keys(completionStatus).filter((chapter) => completionStatus[chapter]);
    const currentChapterKey = completedChapters[completedChapters.length - 1] || 'chapter1';
    setCurrentChapterForProgress(chapterTitles[currentChapterKey]);

    const progressPercentage = (completedChapters.length / Object.keys(completionStatus).length) * 100;
    setProgress(progressPercentage);
    setChaptersCompleted(completedChapters.length);
  };

  const formatChapter = (chapter) => {
    if (!chapter) {
      return null;
    }

    const chapterNumberMatch = chapter.match(/\d+/);
    if (!chapterNumberMatch) {
      return chapter;
    }

    const chapterNumber = chapterNumberMatch[0];
    const chapterName = chapter.split(':')[1].trim();

    return (
      <>
        <span style={{ fontWeight: 'bold', color: '#19154E' }}>Chapter {chapterNumber}: </span>
        <br />
        <span style={{ marginLeft: '75px', fontWeight: '500', color: '#5B5E76' }}>{chapterName}</span>
      </>
    );
  };

  const completionStatus = {
    chapter1: localStorage.getItem('S1QuizCompleted') === 'true',
    chapter2: localStorage.getItem('S2QuizCompleted') === 'true',
    chapter3: localStorage.getItem('S3QuizCompleted') === 'true',
  };

  const getChapterIcon = (chapter) => {
    if (completionStatus[chapter]) {
      return (
        <FontAwesomeIcon
          icon={faCircleCheck}
          style={{
            position: 'relative',
            top: '10px',
            height: '25px',
            marginRight: '30px',
            marginLeft: '20px',
            color: '#7421FC',
          }}
        />
      );
    }
    return (
      <FontAwesomeIcon
        icon={faCircle}
        style={{
          position: 'relative',
          top: '10px',
          height: '25px',
          marginRight: '30px',
          marginLeft: '20px',
          color: '#7421FC',
        }}
      />
    );
  };

  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];

  const getBadgeIcon = (badge) => {
    switch (badge) {
      case 'Business Guru':
        return 'images/purple-medal.png';
      case 'Financial Mastermind':
        return 'images/gold-medal.png';
      case 'Cost Strategist':
        return 'images/silver-medal.png';
      case 'Explorer':
        return 'images/bronze-medal.png';
      default:
        return null;
    }
  };



  return (
    <div className={styles['dropdown-container']}>
      <button className={styles['dropdown-toggle']} onClick={handleDropdownToggle}>
        <span className={styles['menu-icon']} style={{ position: 'relative', marginLeft: '10px', color: '#19154E' }}>
          <i id="menuIcon" className="fa-solid fa-bars"></i>
        </span>
        <span style={{ marginRight: '310px', color: 'black' }}>{currentChapterForToggle}</span>
        {earnedBadges.map((badge, index) => (
            <img
              key={index}
              src={getBadgeIcon(badge)}
              alt={badge}
              className="badge-icon"
              style={{ width: '40px', height: '40px', marginRight: '10px' }}
            />
          ))}
        <span style={{ fontWeight: '300', fontSize: '10px', color: '#5B5E76', textAlign: 'center' }}>
          {chaptersCompleted}/{totalChapters} chapters
        </span>
        <div className={styles['progress-container']} style={{ width: '50px', height: '50px', marginRight: '20px' }}>
          <CircularProgressbar
            value={progress}
            text={`${progress.toFixed(0)}%`}
            styles={buildStyles({
              pathColor: '#7421FC',
              textColor: '#7421FC',
              trailColor: '#ddd',
              backgroundColor: '#fff',
            })}
          />
        </div>
      </button>
      {showDropdown && (
        <div className={styles['dropdown-menu']}>
          <button
            className={styles['dropdown-item']}
            style={{ fontWeight: 'bold', height: '60px' }}
            onClick={() => handleDropdownItemClick('/startingcosts', 'Introduction')}
          >
            Introduction
          </button>

          <button
            className={styles['dropdown-item']}
            style={{ borderTop: '1px solid #ddd', borderRadius: '0' }}
            onClick={() => handleDropdownItemClick('/schapter1', 'Chapter 1: Introduction to Starting Costs')}
          >
            {getChapterIcon('chapter1')}
            {formatChapter('Chapter 1: Introduction to Starting Costs')}
          </button>

          <button
            className={styles['dropdown-item']}
            style={{ borderRadius: '0' }}
            onClick={() => handleDropdownItemClick('/schapter2', 'Chapter 2: Registration Fees')}
          >
            {getChapterIcon('chapter2')}
            {formatChapter('Chapter 2: Registration Fees')}
          </button>
          <button
            className={styles['dropdown-item']}
            style={{ borderBottom: '1px solid #ddd', borderRadius: '0' }}
            onClick={() => handleDropdownItemClick('/schapter3', 'Chapter 3: Branding Costs')}
          >
            {getChapterIcon('chapter3')}
            {formatChapter('Chapter 3: Branding Costs')}
          </button>
          <button
            className={styles['dropdown-item']}
            style={{ fontWeight: 'bold', height: '60px', borderBottomRadius: '10px' }}
            onClick={() => handleDropdownItemClick('/SNextsteps', 'Next Steps')}
          >
            Next Steps
          </button>
        </div>
      )}
    </div>
  );
}