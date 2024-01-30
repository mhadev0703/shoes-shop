import './App.css';
import { createContext, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail.js';
import Cart from './pages/Cart.js';
import axios from 'axios';


export let Context1 = createContext()

function App() {

  let [shoes, setShoes] = useState(data);
  let [stock] = useState([10, 11, 12]);

  let navigate = useNavigate();

  // Convert the item price from external json file
  const convertPrice = (previousPrice) => {
    const currencyRate = 0.001;
    return previousPrice * currencyRate;
  };

  const [clickCount, setClickCount] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="App">      

      <Navbar bg="lightgrey" variant="lightgrey" className='navbar'>
        <Container>
          <Navbar.Brand>ReactStride</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
            <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
            <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
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
          <button onClick={() => {

            setClickCount(prev => prev + 1);
            let url = '';
            
            if (clickCount === 1) {
              url = 'https://codingapple1.github.io/shop/data2.json';
            } else if (clickCount === 2) {
              url = 'https://codingapple1.github.io/shop/data3.json'
            } else if (clickCount >= 3) {
              alert('There are no more items to show.');
              return;
            }

            setIsLoading(true);

            axios.get(url)
            .then((result) => {
              const convertedData = result.data.map((item) => ({
                ...item,
                price: convertPrice(item.price), 
              }));

              let copiedShoes = [...shoes, ...convertedData];
              setShoes(copiedShoes);
            })
            .catch(() => {
              console.log('Connection failed')
            })
            .finally(() => {
              // stop the loading process after data fetching is complete
              setIsLoading(false);
            })
          }}>See more</button>
          {isLoading && <div>Loading...</div>}
          </>
        } />

        <Route path="/detail/:id" element={
          <Context1.Provider value={{ stock }}>
            <Detail shoes={shoes} />
          </Context1.Provider>
        } />

        <Route path="/cart" element={ <Cart/> }>

        </Route>

        <Route path="/about" element={<About/>}>
          <Route path="member" element={<div>Members</div>} />
          <Route path="location" element={<div>Location</div>} />
        </Route>

        <Route path="/event" element={<Event/>}>
          <Route path="bonus" element={<div>Bonus item for your first order 🎁</div>} />
          <Route path="coupon" element={<div>Get your birthday coupon 🎉</div>} />
        </Route>
        
        <Route path="*" element={<div>The Page doesn't exist.</div>} />
      </Routes>

    </div>
  );  
}

function Event() {
  return (
    <div>
      <h4>Today's event!</h4>
      <Outlet></Outlet>
    </div>
  )
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