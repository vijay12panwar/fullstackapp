import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home.jsx';
import Login from './components/Login';
import SignUp from './components/SignUp';
import UserProfile from "./components/Profile.jsx";
import Error404 from "./components/Error404.jsx";
function App() {
  const appStyle = {
    margin: 0,
    padding: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white'
  };

  return (
    <div className="App" style={appStyle}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/404" element={<Error404></Error404>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
