import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import EarningResult from "./pages/EarningResult";
import Layout from "./Layout";
import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/earning-result" element={<EarningResult />} />
      </Routes>
    </Layout>
  );
}

export default App;
