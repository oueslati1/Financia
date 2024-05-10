import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './contents.module.css';
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
  const [chaptersCompleted, setChaptersCompleted] = useState(0);

  // Navigation
  useEffect(() => {
    // Set the value of currentChapterForToggle based on the current location path
    switch (location.pathname) {
      case '/FixedCosts':
        setCurrentChapterForToggle('Introduction');
        break;
      case '/fchapter1':
        setCurrentChapterForToggle('Chapter 1: Introduction to Fixed Costs');
        break;
      case '/fchapter2':
        setCurrentChapterForToggle('Chapter 2: Calculating Fixed Costs');
        break;
      case '/fchapter3':
        setCurrentChapterForToggle('Chapter 3: Stepped Fixed Costs');
        break;
      case '/nextsteps':
        setCurrentChapterForToggle('Next Steps');
        break;
      default:
        setCurrentChapterForToggle('Contents');
        break;
    }

     // Update progress when location is changed
    calculateProgress();
  }, [location.pathname]);

  // Handlers for showing toggle and menu items
  // Handle the visiblity of the dropdown by making it opposite of current state
  const handleDropdownToggle = () => {
    setShowDropdown(!showDropdown);
  };

  // Handler to navigate to selected page
  const handleDropdownItemClick = (path, chapter) => {
    // go to selected chapter
    navigate(path);
    // hide the dropdown menu 
    setShowDropdown(false);
    // change the toggle text to the selected chapter
    setCurrentChapterForToggle(chapter);
  };

  // Chapter's completion depends on quiz completion
  const completionStatus = {
    chapter1: localStorage.getItem('F1QuizCompleted') === 'true',
    chapter2: localStorage.getItem('F2QuizCompleted') === 'true',
    chapter3: localStorage.getItem('F3QuizCompleted') === 'true',
  };

  // Dropdown menu items
  const formatChapter = (chapter) => {
    if (!chapter) {
      return null;
    }
    
    // Extract chapter number from chapter title
    const chapterNumberMatch = chapter.match(/\d+/);
    // If there is no number, return chapter as is
    if (!chapterNumberMatch) {
      return chapter;
    }

    // Store chapter number
    const chapterNumber = chapterNumberMatch[0];
    // Store chapter name without number or whitespace
    const chapterName = chapter.split(':')[1].trim();

    // Style chapter number and name in dropdown
    return (
      <>
        <span style={{ fontWeight: 'bold', color: '#19154E' }}>Chapter {chapterNumber}: </span>
        <br />
        <span style={{ marginLeft: '75px', fontWeight: '500', color: '#5B5E76' }}>{chapterName}</span>
      </>
    );
  };

  // Chapter complete icon 
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
      // Chapter incomplete icon 
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

  // Progess bar
  const calculateProgress = () => {
    // Chapter names
    const chapterTitles = {
      introduction: 'Introduction',
      chapter1: 'Chapter 1: Introduction to Fixed Costs',
      chapter2: 'Chapter 2: Calculating Fixed Costs',
      chapter3: 'Chapter 3: Stepped Fixed Costs',
      nextSteps: 'Next Steps',
    };

    // Filter array of chapters by completion status to get completed chapters
    const completedChapters = Object.keys(completionStatus).filter((chapter) => completionStatus[chapter]);
    // Get the last completed chapter key from array or set it as 'chapter1' if no completed chapters
    const currentChapterKey = completedChapters[completedChapters.length - 1] || 'chapter1';
    // Use last completed chapter for setting the current chapter in progress calculation
    setCurrentChapterForProgress(chapterTitles[currentChapterKey]);

    // Calculate progress percentage by completed chapters / total number of chapters then multiplying by 100
    const progressPercentage = (completedChapters.length / Object.keys(completionStatus).length) * 100;

    //Set progress circle and number of completed chapter to display
    setProgress(progressPercentage);
    setChaptersCompleted(completedChapters.length);
  };

  // Badges
  // Get earned badges and parse as JSON, otherwise empty array
  const earnedBadges = JSON.parse(localStorage.getItem('earnedBadges')) || [];

  // Get badge image depending on badge title
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
          {chaptersCompleted}/{3} chapters
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
            onClick={() => handleDropdownItemClick('/fixedcosts', 'Introduction')}
          >
            Introduction
          </button>

          <button
            className={styles['dropdown-item']}
            style={{ borderTop: '1px solid #ddd', borderRadius: '0' }}
            onClick={() => handleDropdownItemClick('/fchapter1', 'Chapter 1: Introduction to Fixed Costs')}
          >
            {getChapterIcon('chapter1')}
            {formatChapter('Chapter 1: Introduction to Fixed Costs')}
          </button>

          <button
            className={styles['dropdown-item']}
            style={{ borderRadius: '0' }}
            onClick={() => handleDropdownItemClick('/fchapter2', 'Chapter 2: Calculating Fixed Costs')}
          >
            {getChapterIcon('chapter2')}
            {formatChapter('Chapter 2: Calculating Fixed Costs')}
          </button>
          <button
            className={styles['dropdown-item']}
            style={{ borderBottom: '1px solid #ddd', borderRadius: '0' }}
            onClick={() => handleDropdownItemClick('/fchapter3', 'Chapter 3: Stepped Fixed Costs')}
          >
            {getChapterIcon('chapter3')}
            {formatChapter('Chapter 3: Stepped Fixed Costs')}
          </button>
          <button
            className={styles['dropdown-item']}
            style={{ fontWeight: 'bold', height: '60px', borderBottomRadius: '10px' }}
            onClick={() => handleDropdownItemClick('/FNextsteps', 'Next Steps')}
          >
            Next Steps
          </button>
        </div>
      )}
    </div>
  );
}