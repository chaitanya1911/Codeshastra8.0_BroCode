import "./App.css";
import Login from "./screens/Login";
import Projects from "./screens/Projects";
import SignUp from "./screens/SignUp";
import Header from "./components/Header";
import Home from "./screens/Home";
import Owner from "./screens/Owner";
import ErrorPage from "./screens/ErrorPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Dashboard1 from "./screens/Dashboard1";
import ContractorDashboard from "./screens/ContractorDashboard";
import WorkerDashboard from "./screens/WorkerDashboard";
import CreateNewProj from "./screens/CreateNewProj";
import Footer from "./components/Footer";

function App() {
  // const [User,setUser] = useState({
  //   email:"",
  // })
  return (
    <div className="App">
      <Router>
        <Header></Header>
        <Routes>
          <Route path="/login" exact element={<Login />} />
          <Route path="/signup" exact element={<SignUp />} />
          <Route path="/createNewProj" exact element={<CreateNewProj />} />
          <Route path="/project" exact element={<Projects />} />

          <Route path="/owner" exact element={<Owner />} />
          <Route
            path="/worker/dashboard"
            exact
            element={<WorkerDashboard />}
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
