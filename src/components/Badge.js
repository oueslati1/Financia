import React, { useState, useEffect } from 'react';
import ConfettiExplosion from 'react-confetti-explosion';

import './badge.css';

export default function Badge({ setBadge }) {
  const [badge, setBadgeState] = useState(null);
  const [showBadgePopup, setShowBadgePopup] = useState(false);
  const [earnedBadges, setEarnedBadges] = useState(
    JSON.parse(localStorage.getItem('earnedBadges')) || []
  );

  useEffect(() => {
    const handlePointsUpdate = () => {
      const totalPoints = parseInt(localStorage.getItem('totalPoints')) || 0;
      let newBadge = null;
      if (totalPoints >= 80) {
        newBadge = 'Business Guru';
      } else if (totalPoints >= 60) {
          newBadge = 'Financial Mastermind';
      } else if (totalPoints >= 30) {
        newBadge = 'Cost Strategist';
      } else if (totalPoints >= 5) {
        newBadge = 'Explorer';
      }

      if (newBadge && !earnedBadges.includes(newBadge)) {
        setBadgeState(newBadge);
        setBadge(newBadge);
        setShowBadgePopup(true);
        setEarnedBadges([...earnedBadges, newBadge]);
        localStorage.setItem('earnedBadges', JSON.stringify([...earnedBadges, newBadge]));
      }
    };

    window.addEventListener('points-updated', handlePointsUpdate);
    return () => {
      window.removeEventListener('points-updated', handlePointsUpdate);
    };
  }, [setBadge, earnedBadges]);

  const handleContinue = () => {
    setShowBadgePopup(false);
  };

  const handleResetBadges = () => {
    // Remove earned badges from localStorage
    localStorage.removeItem('earnedBadges');
    setEarnedBadges([]);
    // Reset the badge state
    setBadgeState(null);
    setBadge(null);
    // Close the badge popup
    setShowBadgePopup(false);
  };

  let badgeIcon;
  switch (badge) {
    case 'Business Guru':
      badgeIcon = 'images/purple-medal.png';
      break;
    case 'Financial Mastermind':
      badgeIcon = 'images/gold-medal.png';
      break;
    case 'Cost Strategist':
      badgeIcon = 'images/silver-medal.png';
      break;
    case 'Explorer':
      badgeIcon = 'images/bronze-medal.png';
      break;
    default:
      badgeIcon = null;
  }

  return (
    <>
      {showBadgePopup && (
        <div className="badge-popup">
          <div className="badge-content">
            <h3>Congratulations!</h3>
            <div className="confetti-container">
              <ConfettiExplosion force={0.4} duration={4000} particleCount={50} width={900} />
            </div>
            {badgeIcon && <img src={badgeIcon} alt={badge} className="badge-icon" />}
            <p>You've earned the {badge} badge!</p>
              <button onClick={handleContinue}>Continue</button>
          </div>
        </div>
      )}
    </>
  );
}