import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link } from "react-router-dom";


export default function SiteNavbar() {
  return (
    <Navbar bg="light" expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
        <Navbar.Collapse id="basic-navbar-nav" style={{marginLeft: '2%'}}>
          <Nav className="me-auto">
              <Link to="/" className='nav-link'>
                  Home
              </Link>
              <Link to="/profile" className='nav-link'>
                  My Lists
              </Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}