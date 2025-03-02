import logo from './logo.svg';
import './App.css';
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from './pages/Home';
import Login from './pages/Login';
import CreateEmployee from './pages/CreateEmployee';
import { ToastContainer } from 'react-toastify';

function App() {
  return (

    <div>
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SignedOut>
                  <Login />
                </SignedOut>
                <SignedIn>
                  <Home />
                </SignedIn>
              </>
            }
          />
           <Route
            path="/create-employee"
            element={
              <>
                <SignedOut>
                  <Login />
                </SignedOut>
                <SignedIn>
                  <CreateEmployee />
                </SignedIn>
              </>
            }
          />
        </Routes>
      </Router>
<ToastContainer/>
    </div>

  );
}

export default App;
