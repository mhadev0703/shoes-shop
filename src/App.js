import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.js';

function App() {

  let [shoes] = useState(data)

  return (
    <div className="App">      
      <Navbar bg="lightgrey" variant="lightgrey" className='navbar'>
        <Container>
          <Navbar.Brand href="#home">ReactStride</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Cart</Nav.Link>
          </Nav>
        </Container>
      </Navbar>

      <div className="main-bg"></div>

      <Container>
        <Row>
          {shoes.map(function (shoe, i) {
            return <Card shoes={shoe} i={i} />;
          })}
        </Row>
      </Container>

    </div>
  );  
}

function Card(props) {
  return (
      <Col>
        <img src={process.env.PUBLIC_URL + '/shoes' + (props.i+1) + '.jpeg'} width="80%" /> 
        <h4>{props.shoes.title}</h4>
        <p>${props.shoes.price}</p>
      </Col>
  )
}


export default App;
