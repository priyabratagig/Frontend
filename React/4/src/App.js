import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Page404 from "./components/Page404";
import StudentBase from "./components/StudentBase";
import Table from "./components/Table";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <StudentBase>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Navigate to="/" />} />
            <Route path="/students" element={<Table />} />
            <Route path="/student-des">
              <Route index element={<Form />} />
              <Route path=":index" element={<Form />} />
            </Route>
          </Route>
          <Route path="/*" element={<Page404 />} />
        </Routes>
      </StudentBase>
    </Router>
  );
}

export default App;
