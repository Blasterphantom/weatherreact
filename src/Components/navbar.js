import { Button, Col, Container, Row } from "react-bootstrap";

export default function NavbarComponent() {
  return (
    <Container className="navContainer">
        <Row className="navRow">
            <a className="emoji">【=◈︿◈=】</a>
            <div className="buttonDiv">
                <Button className="favBtn" href="#fav">Favorites</Button>
                <Button className="homeBtn">Home</Button>
            </div>
        </Row>
    </Container>
  );
}