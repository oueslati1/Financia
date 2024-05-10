import React, { Component } from 'react';
import Typed from 'typed.js';

class HeroSection extends Component {
  componentDidMount() {
    const options = {
      strings: ["starting", "fixed", "variable"],
      typeSpeed: 150,
      backSpeed: 150,
      loop: true
    };
    this.typed = new Typed(".auto-type", options);
  }

  componentWillUnmount() {
    this.typed.destroy();
  }

  render() {
    return (
      <div className="hero-title">
        <h1>
          Learn business <span className="auto-type"></span>costs.
        </h1>
        <p>
          Our courses will empower you with the knowledge to <br /> navigate the cost of doing business in London.
        </p>
        <a href="#view_courses">
          <button type="button" className="hero-button">
            Explore courses
          </button>
        </a>
      </div>
    );
  }
}

export default HeroSection;