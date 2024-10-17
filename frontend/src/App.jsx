import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import LandingPage from "./pages/landing";
import Authentication from "./pages/authentication";
import { AuthProvider,AuthContext } from "./contexts/AuthContext";
import VideoMeetComponent from "./pages/VideoMeet";
function App() {
  return (
    <>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/:url" element={<VideoMeetComponent/>}/>
          </Routes>
        </AuthProvider>
      </Router>
    </>
  );
}

export default App;
