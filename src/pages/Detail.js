import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { Nav } from 'react-bootstrap';
import { Context1 } from './../App.js'

function Detail(props) {

    let {context} = useContext(Context1)

    let [alert, setAlert] = useState(true);
    let [tab, setTab] = useState(0);
    let [fade2, setFade2] = useState('');

    let { id } = useParams();
    id = parseInt(id);

    const itemId = props.shoes.findIndex((item) => item.id === id);

    useEffect(() => {
        setFade2('end');

        return () => {
            setFade2('');
        }
    }, [])

    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false) }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [])


    return (
        <div className={'container start ' + fade2}>
            {
                alert == true
                    ? <div className="alert alert-warning">
                        Additional discount when you order in 5 sec
                    </div>
                    : null
            }
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + '/shoes' + (itemId + 1) + '.jpeg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{props.shoes[itemId].title}</h4>
                    <p>{props.shoes[itemId].content}</p>
                    <p>${props.shoes[itemId].price}</p>
                    <button className="btn btn-danger">Order Item</button>
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