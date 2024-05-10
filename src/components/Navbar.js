import React, { useEffect } from 'react';
import { HashLink as Link } from 'react-router-hash-link';

export default function Navbar() {
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

    return () => {
      menuIcon.removeEventListener('click', showMenu);
      closeIcon.removeEventListener('click', hideMenu);

      menuLinks.forEach((link) => {
        link.removeEventListener('click', hideMenu);
      });
    };
  }, []);

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
              <Link to="Blog">Blog</Link>
            </li>
          </ul>
        </div>
        {/* phone menu icon */}
        <i id="menuIcon" className="fa-solid fa-bars"></i>
      </nav>
    </>
  );
}