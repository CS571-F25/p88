import { Col, Container, Row } from "react-bootstrap";
import GameOfTheDay from "./GameOfTheDay";
import RandomGames from "./RandomGames";

export default function Home (props) {
    return <div>
        <h1>Home Page</h1>
        <p>Welcome to the Game Index! You can browse games by console using the dropdown in the navigation bar.</p>
        <p>Only a few consoles are availible in the index right now, but I'm hopping to add more later!</p>
        <Container>
            <Row className="justify-content-md-center">
                <Col sm="3" md="3" lg="3">
                    <h2 className="list-header">Currently included</h2>
                    <ul>
                        <li>PlayStation</li>
                        <li>SNES</li>
                        <li>NES</li>
                    </ul>
                </Col>
                <Col sm="3" md="3" lg="3">
                    <h2 className="list-header">Future additions?</h2>
                    <ul>
                        <li>Nintendo 64</li>
                        <li>Sega Genesis</li>
                        <li>Game Boy</li>
                        <li>Playstation 2</li>
                        <li>Nintendo DS</li>
                    </ul>
                </Col>
            </Row>
        </Container>
        <p>Here are a couple games to get you started, maybe you've seen them before or maybe they're new, either way check em out!</p>
        <GameOfTheDay />
        <RandomGames/>
    </div>
}