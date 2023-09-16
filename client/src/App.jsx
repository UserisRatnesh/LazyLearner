import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import Signup from "./Components/Signup";
import Appbar from "./Components/Appbar";
import Login from "./Components/Login";
import Landing from './Components/Landing';
import Courses from './Components/Courses';
import AddCourse from './Components/AddCourse';
import { Course } from './Components/Course';
import { RecoilRoot } from 'recoil';
import InitAdmin from './Components/InitAdmin';


function App() {

  return (
    <div>
    <RecoilRoot>
        <Router>
        <Appbar />
        <InitAdmin/>
          <Routes>
            <Route path="/" element={<Landing />}/>
            <Route path="/signup" element={<Signup />}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/addCourse" element={<AddCourse/>}/>
            <Route path="/courses" element={<Courses/>}/>
            <Route path="/course/:courseId" element={<Course/>}/>
          </Routes>
        </Router>
      </RecoilRoot>
    </div>
  )
}

export default App
