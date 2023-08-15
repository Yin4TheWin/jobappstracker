import { Typography } from '@mui/material';
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
              <Link to="/frank" className='nav-link' >
                <Typography sx={{
                        backgroundcolor: "primary",
                        backgroundImage: `linear-gradient(to left top, #380152, #ff2424)`,
                        backgroundSize: "100%",
                        backgroundRepeat: "repeat",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        display: "inline",
                    }}>F.R.A.N.K.</Typography>
              </Link>
          </Nav>
        </Navbar.Collapse>
    </Navbar>
  );
}