import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js'
import { useDispatch } from "react-redux";
import { addCart } from './../store.js';

function Detail(props) {

    let dispatch = useDispatch()

    let {context} = useContext(Context1)

    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');

    let { id } = useParams();
    id = parseInt(id);

    const selectedShoes = props.shoes.find((item) => item.id === id);

    useEffect(() => {
        let watchedItem = localStorage.getItem('watched')
        watchedItem = JSON.parse(watchedItem)
        watchedItem.push(selectedShoes.id)

        watchedItem = new Set(watchedItem)
        watchedItem = Array.from(watchedItem)
        localStorage.setItem('watched', JSON.stringify(watchedItem))
    }, [])

    useEffect(() => {
        setFade2('end');
        return () => {
            setFade2('');
        }
    }, [])

    return (
        <div className={'container start ' + fade2}>
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + '/shoes' + (selectedShoes.id + 1) + '.jpeg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{selectedShoes.title}</h4>
                    <p>{selectedShoes.content}</p>
                    <p>${selectedShoes.price}</p>
                    <button className="btn btn-danger" onClick={() => {
                        dispatch(addCart({id : selectedShoes.id, name : selectedShoes.title, count : 1}))
                    }}>Add to cart</button>
                </div>
            </div>
            
            <Nav variant="tabs"  defaultActiveKey="link0">
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(0) }} eventKey="link0">Button1</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(1) }} eventKey="link1">Button2</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                    <Nav.Link onClick={() => { setTab(2) }} eventKey="link2">Button3</Nav.Link>
                </Nav.Item>
            </Nav>
            <TabContent shoes={props.shoes} tab={tab} />

        </div>
    )
}

function TabContent({tab}) {

    let [fade, setFade] = useState('');
    let {stock} = useContext(Context1);

    useEffect(() => {
        setTimeout(() => { setFade('end') }, 100)

        return () => {
            setFade('')
        }
    }, [tab])

    return (<div className={'start ' + fade}>
        { [<div>{stock}</div>, <div>Content2</div>, <div>Content3</div>][tab] }
    </div>)
}

export default Detail;