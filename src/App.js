import {Routes, Route, useLocation} from "react-router-dom";
import VariableCosts from "./pages/VariableCosts";
import FixedCosts from "./pages/FixedCosts";
import StartingCosts from "./pages/StartingCosts";
import About from "./pages/About";
import Home from "./pages/Home";
import "./styles/style.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import FChapter1 from "./Courses/FixedCosts/FChapter1";
import FChapter2 from "./Courses/FixedCosts/FChapter2";
import FChapter3 from "./Courses/FixedCosts/FChapter3";
import FNextSteps from "./Courses/FixedCosts/FNextSteps";
import SChapter1 from "./Courses/StartingCosts/SChapter1";
import SChapter2 from "./Courses/StartingCosts/SChapter2";
import SChapter3 from "./Courses/StartingCosts/SChapter3";
import SNextSteps from "./Courses/StartingCosts/SNextSteps";
import VChapter1 from "./Courses/VariableCosts/VChapter1";
import VChapter2 from "./Courses/VariableCosts/VChapter2";
import VChapter3 from "./Courses/VariableCosts/VChapter3";
import VNextSteps from "./Courses/VariableCosts/VNextSteps";
import Blog from "./BlogClient/pages/blog";
import BlogNavBar from "./BlogClient/components/BlogNavBar";
import Login from "./BlogClient/pages/Login";
import Post from "./BlogClient/pages/post";
import Admin from "./BlogClient/pages/admin";
import Register from "./BlogClient/pages/register";

function App() {
  const location = useLocation();

  const showBlogNavBar = location.pathname.startsWith('/Blog') || location.pathname.startsWith('/post') || 
  location.pathname.startsWith('/admin') || location.pathname.startsWith('/user') || location.pathname.startsWith('/register');
  
  return <div className="App">
    {showBlogNavBar ? (
        <BlogNavBar />
      ) : (
        <Navbar />
      )}
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="About" element={<About/>}/>
      <Route path="StartingCosts" element={<StartingCosts/>}/>
      <Route path="FixedCosts" element={<FixedCosts/>}/>
      <Route path="VariableCosts" element={<VariableCosts/>}/>
      <Route path="/FChapter1" element={<FChapter1 />} />
      <Route path="/FChapter2" element={<FChapter2 />} />
      <Route path="/FChapter3" element={<FChapter3 />} />
      <Route path="/FNextSteps" element={<FNextSteps />} />
      <Route path="/SChapter1" element={<SChapter1 />} />
      <Route path="/SChapter2" element={<SChapter2 />} />
      <Route path="/SChapter3" element={<SChapter3 />} />
      <Route path="/SNextSteps" element={<SNextSteps />} />
      <Route path="/VChapter1" element={<VChapter1 />} />
      <Route path="/VChapter2" element={<VChapter2 />} />
      <Route path="/VChapter3" element={<VChapter3 />} />
      <Route path="/VNextSteps" element={<VNextSteps />} />
      <Route path="/Blog" element={<Blog/>} />
      <Route path="/Login" element={<Login/>} />
      <Route path="/post/:postId" element={<Post/>} />
      <Route path="/admin" element={<Admin />} />
      <Route path="/register" element={<Register />} />
    </Routes>
    <Footer/>
  </div>
}

export default App;