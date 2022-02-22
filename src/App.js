import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import HangmanLogic from "./components/HangmanLogic";
import Footer from "./components/Footer";
import Leaderboard from "./components/Leaderboard";
import { Provider } from "react-redux";
import store from "./redux/store";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Navbar />
          <Provider store={store}>
            <Routes>
              <Route exact path="/" element={<HangmanLogic />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
            </Routes>
            <Footer />
          </Provider>
        </Router>
      </>
    );
  }
}

export default App;
