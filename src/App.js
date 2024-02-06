import './App.css';
import { lazy, Suspense, createContext, useEffect, useState, useTransition, useDeferredValue } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Nav, Navbar, Row, Col } from 'react-bootstrap';
import data from './data.js';
import { Routes, Route, Link, useNavigate, Outlet, useParams } from 'react-router-dom';
import axios from 'axios';
import { useQuery } from 'react-query';

const Detail = lazy(() => import('./pages/Detail.js'));
const Cart = lazy(() => import('./pages/Cart.js'));

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

  useEffect(() => {
    if (localStorage.getItem('watched') === null) {
      localStorage.setItem('watched', JSON.stringify( [] ))
    }
  }, [])

  let result = useQuery('name', () =>
    axios.get('https://codingapple1.github.io/userdata.json')
    .then((a) => { return a.data })
  )

  return (
    <div className="App">      

      <Navbar bg="lightgrey" variant="lightgrey" className='navbar'>
        <Container fluid>
          <div className="d-flex justify-content-between" style={{ margin: '0 20px' }}>
            <Navbar.Brand>ReactStride</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={() => { navigate('/') }}>Home</Nav.Link>
              <Nav.Link onClick={() => { navigate('/detail/0') }}>Detail</Nav.Link>
              <Nav.Link onClick={() => { navigate('/cart') }}>Cart</Nav.Link>
            </Nav>
          </div>
          <div className="greeting" style={{ margin: '0 20px' }}>
            Hello,&nbsp;
            { result.isLoading && 'Loading...' }
            { result.error && 'Error' }
            { result.data && result.data.name }
          </div>
        </Container>
      </Navbar>      

      <Suspense fallback={<div>Loading...</div>}>
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

          <Route path="/hook" element={<Hook/>}></Route>
          
          <Route path="*" element={<div>The Page doesn't exist.</div>} />
        </Routes>
      </Suspense>
    </div>
  );  
}

function Hook() {
  let a = new Array(10000).fill(0)
  let [name, setName] = useState('')
  let [isPending, startTransition] = useTransition()
  let state = useDeferredValue(name)

  
  return (
    <div>
      <input onChange={ (e)=>{ 
        startTransition(()=>{
          setName(e.target.value) 
        })
      }}/>

      {
        isPending ? 'Loading...' :
        a.map(()=>{
          return <div>{state}</div>
        })
      }
    </div>
  )
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
      <Col md={4}>
        <Link to={`/detail/${props.shoes.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <img src={process.env.PUBLIC_URL + '/shoes' + (props.i) + '.jpeg'} width="100%" /> 
          <h4>{props.shoes.title}</h4>
          <p>${props.shoes.price}</p>
        </Link>
      </Col>
  )
}


export default App;