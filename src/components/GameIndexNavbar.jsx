import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function GameIndexNavbar(props) {
    return (
        <Navbar bg="dark" variant="dark" expand="lg" fixed="top" className="w-100">
            <Container>
                <Navbar.Brand as={Link} to="/" className="text-white text-decoration-none">
                    Game Index
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="mx-auto">
                        <NavDropdown title="Consoles" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/nes">NES</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/snes">SNES</NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/playstation">PlayStation</NavDropdown.Item>
                        </NavDropdown>
                        <Nav.Link as={Link} to="/about">About</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default GameIndexNavbar;