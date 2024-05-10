import React, { useEffect, useState } from 'react';
import { HashLink as Link } from 'react-router-hash-link';
import { useNavigate } from 'react-router-dom';

export default function BlogNavbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const showMenu = () => {
      const navLinks = document.getElementById('navLinks');
      navLinks.style.top = '0';
    };

    const hideMenu = () => {
      const navLinks = document.getElementById('navLinks');
      navLinks.style.top = '-600px';
    };

    const menuIcon = document.getElementById('menuIcon');
    const closeIcon = document.getElementById('closeIcon');
    const menuLinks = document.querySelectorAll('#navLinks ul li a');

    menuIcon.addEventListener('click', showMenu);
    closeIcon.addEventListener('click', hideMenu);

    menuLinks.forEach((link) => {
      link.addEventListener('click', hideMenu);
    });

    // Check if the user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    setIsLoggedIn(!!user);
    setIsAdmin(user && user.role === 'admin');

    return () => {
      menuIcon.removeEventListener('click', showMenu);
      closeIcon.removeEventListener('click', hideMenu);

      menuLinks.forEach((link) => {
        link.removeEventListener('click', hideMenu);
      });
    };
  }, []);

  const handleLogout = () => {
    // Remove the user from localStorage
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/'); // Redirect the user to the home page
  };

  return (
    <>
      <nav>
        {/* logo */}
        <Link to="/">
          <img src="images/logo_light.png" alt="" />
        </Link>
        {/* navbar links */}
        <div className="nav-links" id="navLinks">
          {/* phone menu close */}
          <i id="closeIcon" className="fa-solid fa-xmark"></i>
          {/* navbar menu links */}
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="About">About</Link>
            </li>
            <li>
              <Link to="/#view_courses">Courses</Link>
            </li>
            <li>
              <Link to="/Blog">Blog</Link>
            </li>
            {isLoggedIn && (
              <>
                {isAdmin && (
                  <li>
                    <Link to="/admin">Dashboard</Link>
                  </li>
                )}
                <li>
                  <button onClick={handleLogout}>Logout</button>
                </li>
              </>
            )}
            {!isLoggedIn && (
              <li>
                <Link to="Login">
                  <button>Login</button>
                </Link>
              </li>
            )}
          </ul>
        </div>
        {/* phone menu icon */}
        <i id="menuIcon" className="fa-solid fa-bars"></i>
      </nav>
    </>
  );
}