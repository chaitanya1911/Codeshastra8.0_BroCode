import "./App.css";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Header from "./components/Header";
import Home from './screens/Home'
import Owner from "./screens/Owner";
import Worker from "./screens/Worker";
import Contractor from "./screens/Contractor";
import ErrorPage from "./screens/ErrorPage";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
// import Dashboard1 from "./screens/Dashboard1";
import Dashboard from "./screens/Dashboard";

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
          <Route path="/worker" exact element={<Worker />} />
          <Route path="/contractor" exact element={<Contractor />} />
          <Route path="/owner" exact element={<Owner />} />
          <Route path="/dashboard" exact element={<Dashboard />}></Route>
          <Route path="/" exact element={<Home />}></Route>
          {/* do not change */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
