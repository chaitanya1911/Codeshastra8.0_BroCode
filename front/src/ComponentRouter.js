import "./App.css";
import Login from "./screens/Login";
import Projects from "./screens/Projects";
import SignUp from "./screens/SignUp";
import Header from "./components/Header";
import Home from "./screens/Home";
// import Owner from "./screens/Owner";
import ErrorPage from "./screens/ErrorPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Dashboard1 from "./screens/Dashboard1";
import ContractorDashboard from "./screens/ContractorDashboard";
import WorkerDashboard from "./screens/WorkerDashboard";
import CreateNewProj from "./screens/CreateNewProj";
import Footer from "./components/Footer";
import AttendanceOCR from "./screens/AttendanceOCR";
import ContractorViolation from "./screens/ContractorViolation";
import ContractorAssign from "./screens/ContractorAssign";
import OCR from "./screens/OCR";

function App() {
  // const [User,setUser] = useState({
  //   email:"",
  // })
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/attendance" exact element={<AttendanceOCR />} />
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />

          <Route path="/owner/createNewProj" exact element={<CreateNewProj />} />
          <Route path="/owner/dashboard" exact element={<Projects />} />
          {/* <Route path="/owner" exact element={<Owner />} /> */}
          <Route
            path="/worker/dashboard"
            exact
            element={<WorkerDashboard />}
          ></Route>
          <Route
            path="/contractor/assign"
            exact
            element={<ContractorAssign />}
          ></Route>
          <Route
            path="/contractor/violation"
            exact
            element={<ContractorViolation />}
          ></Route>
          <Route
            path="/contractor/dashboard/ocr"
            exact
            element={<OCR />}
          ></Route>          
          <Route
            path="/contractor/dashboard"
            exact
            element={<ContractorDashboard />}
          ></Route>
          <Route path="/" exact element={<Home />}></Route>
          {/* do not change */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
