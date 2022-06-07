import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Homepage from "./page/Homepage";
import Board from "./page/Board";
import "./App.css"

import "./App.css";

const App = () => {
  // const token = localStorage.getItem("token");
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/board" element={<Board />} />

        {/* {token ? (
          <Route path="/board" element={<Board />} />
        ) : (
          <Route path="*" element={<Navigate to="/login" replace />} />
        )} */}
      </Routes>
    </Router>
  );
};

export default App;