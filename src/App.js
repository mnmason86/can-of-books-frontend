import React from 'react';
import Header from './components/Header';
import About from './components/About';
import Footer from './components/Footer';
import BestBooks from './components/BestBooks';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";

class App extends React.Component {
  render() {
    return (
      <>
        <Router>
          <Header />
          <Routes>
            <Route 
              exact path="/"
              element={<BestBooks />}
            >
            </Route>
            <Route
            path="/about"
            element={<About />}
            ></Route>
            
          </Routes>
          <Footer />
        </Router>
      </>
    )
  }
}

export default App;
