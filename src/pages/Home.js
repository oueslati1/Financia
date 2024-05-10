import { HashLink as Link } from 'react-router-hash-link';
import React from 'react';
import FAQSection from '../components/FAQ';
import HeroSection from '../components/HeroSection';
import RecommendationQuiz from '../components/RecommendationQuiz';
import BlogPreview from '../components/BlogPreview';

export default function Home() {
  return (
    <>
      <section className="header">
        {/* hero */}
        <HeroSection />
        <div className="container">
          <div className="ticker">
            {/* batch 1 */}
            <img src="images/ticker1.png" alt="" />
            <img src="images/ticker2.png" alt="" />
            <img src="images/ticker3.png" alt="" />
            <img src="images/ticker4.png" alt="" />
            {/* batch 2 */}
            <img src="images/ticker1.png" alt="" />
            <img src="images/ticker2.png" alt="" />
            <img src="images/ticker3.png" alt="" />
            <img src="images/ticker4.png" alt="" />
            {/* batch 3 */}
            <img src="images/ticker1.png" alt="" />
          </div>
        </div>
      </section>
      {/* Main Topics */}
      <section>
        {/* Titles */}
        <div id="view_courses" className="section-header">
          <h1>THE COST OF BUSINESS IN LONDON</h1>
          <h2>The three courses.</h2>
        </div>
        {/* Main Topics */}
        <div id="carouselExampleControls" className="carousel slide">
          <div className="carousel-inner">
            <div className="carousel-item active">
              {/* Topic 1 */}
              <div className="card">
                <i className="icon fa-solid fa-money-bill"></i>
                <div className="card-body">
                  <h3 className="card-title">Starting Costs</h3>
                  <p className="card-text">
                    This course covers everything related to starting your business in London. This includes legal and administrative fees as well as branding.
                  </p>
                  <Link to="StartingCosts#" className="btn btn-primary" >
                    Start now <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* Topic 2 */}
            <div className="carousel-item">
              <div className="card">
                <i className="icon fa-solid fa-store"></i>
                <div className="card-body">
                  <h3 className="card-title">Fixed Costs</h3>
                  <p className="card-text">This course covers fixed business costs and how to calculate them.</p>
                  <Link to="FixedCosts#" className="btn btn-primary">
                    Start now <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
            {/* Topic 3 */}
            <div className="carousel-item">
              <div className="card">
                <i className="icon fa-solid fa-gears"></i>
                <div className="card-body">
                  <h3 className="card-title">Variable Costs</h3>
                  <p className="card-text">This course covers variable costs and technological solutions which can help you manage them.</p>
                  <Link to="VariableCosts#" className="btn btn-primary">
                    Start now <i className="fa-solid fa-arrow-right"></i>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleControls" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>

        <RecommendationQuiz/>
        </section>

      {/* Blog Preview */}
      <section className="blog-preview" style={{ backgroundColor: '#F6F4FF' }}>
        {/* Titles */}
        <div className="section-header">
          <h1>BLOG</h1>
          <h2>Our latest blog posts.</h2>
        </div>
        <BlogPreview/>
      </section>

      {/* FAQ */}
      <FAQSection />

    </>
  );
}