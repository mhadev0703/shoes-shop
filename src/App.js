import './App.css';
import { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';

function App() {

  let [shoes] = useState(data)
  let navigate = useNavigate();

  return (
    <div className="App">      

      <Navbar bg="lightgrey" variant="lightgrey" className='navbar'>
        <Container>
          <Navbar.Brand href="#home">ReactStride</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail') }}>Detail</Nav.Link>
          </Nav>
        </Container>
      </Navbar>      

      <Routes>
        <Route path="/" element={
          <>
          <div className="main-bg"></div>
          <Container>
            <Row>
              { shoes.map(function (shoe, i) {
                return <Card shoes={shoe} i={i+1} />;
              })}
            </Row>
          </Container>
          </>
        } />
        <Route path="/detail" element={<Detail shoes={shoes[0]}/>} />

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>Members</div>} />
          <Route path="location" element={<div>Location</div>} />
        </Route>
        
        <Route path="*" element={<div>The Page doesn't exist.</div>} />
      </Routes>

    </div>
  );  
}

function About() {
  return (
    <div>
      <h4>About Company</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Card(props) {
  return (
      <Col>
        <img src={process.env.PUBLIC_URL + '/shoes' + (props.i) + '.jpeg'} width="80%" /> 
        <h4>{props.shoes.title}</h4>
        <p>${props.shoes.price}</p>
      </Col>
  )
}


export default App;
