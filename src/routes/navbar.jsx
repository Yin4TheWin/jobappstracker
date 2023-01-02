import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Outlet, Link } from "react-router-dom";


export default function SiteNavbar() {
  return (
    <Navbar fixed='top' bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link>
                <Link to="/" style={{textDecoration:'none', color: 'black'}}>
                    Home
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/" style={{textDecoration:'none', color: 'black'}}>
                    About
                </Link>
            </Nav.Link>
            <Nav.Link>
                <Link to="/profile" style={{textDecoration:'none', color: 'black'}}>
                    My Lists
                </Link>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}