import { HashLink as Link } from 'react-router-hash-link';
export default function Footer() {
    return (
        <>
                {/* Footer */}
                <footer style={{ backgroundColor: '#451297' }}>
                    <div class="footer-logo">
                            <Link to="/"><img src="images/logo_dark.png" alt="" /></Link>
                        </div>
                <div class="columns">
                    <div class="column">
                        <h3>Overview</h3>
                        <ul>
                            <li><Link to="/">Home</Link></li>
                            <li><Link to="About">About</Link></li>
                        </ul>
                    </div>
                    <div class="column c2" >
                        <h3>Courses</h3>
                        <ul>
                            <li><Link to="StartingCosts">Starting Costs</Link></li>
                            <li><Link to="FixedCosts">Fixed Costs</Link></li>
                            <li><Link to="VariableCosts">Variable Costs</Link></li>
                        </ul>
                    </div>
                </div>
                <div class="footer-bottom">
                    <div class="footer-icons">
                        <ul>
                        <li><a href="#link"><i class="fa-brands fa-instagram"></i></a></li>
                        <li><a href="#link"><i class="fa-brands fa-facebook"></i></a></li>
                        <li><a href="#link"><i class="fa-brands fa-tiktok"></i></a></li>
                        <li><a href="#link"><i class="fa-brands fa-instagram"></i></a></li>
                        </ul>
                    </div>
                    <div class="copyright">
                    &copy; 2024 Financia. 
                </div>
                </div>
                </footer>
        </>
    );
 }