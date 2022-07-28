import React from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import { Link } from "react-router-dom";

class Header extends React.Component {
  render() {
    return (
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand id="header-navbar"style={{textAlign: 'center', margin: 'auto'}}>My Favorite Books</Navbar.Brand>
        <Nav.Item style={{color: 'white', paddingRight: '2rem'}}>
          <Link to="/" className="nav-link" id="home-nav">Home</Link>
        </Nav.Item>
        <Nav.Item style={{color: 'white', paddingRight: '2rem'}}>
          <Link to="/About" className="nav-link">About</Link>
          </Nav.Item>
      </Navbar>
    )
  }
}

export default Header;
