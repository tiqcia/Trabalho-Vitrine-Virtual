import React, { useState } from 'react';
import { Navbar, Container, Button, Offcanvas, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <Navbar expand="lg" className="navbar-custom">
      <Container>
        <Navbar.Brand as={Link} to="/" className="brand-text">☆ Pinterest Store</Navbar.Brand>
        
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

        <Navbar.Offcanvas 
          id="offcanvasNavbar" 
          show={show} 
          onHide={handleClose} 
          placement="end">

          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Menu</Offcanvas.Title>
          </Offcanvas.Header>
          
          <Offcanvas.Body>
            <Nav className="nav-container">
              <Nav.Link as={Link} to="/" onClick={handleClose} className="nav-link-custom">
                Catálogo
              </Nav.Link>
              <Link to="/cadastrar" onClick={handleClose} className="link-container">
                <Button className="btn-cadastro">Adicionar Produto</Button>
              </Link>
            </Nav>
          </Offcanvas.Body>
          
        </Navbar.Offcanvas> 
      </Container>
    </Navbar>
  );
}

export default Header;