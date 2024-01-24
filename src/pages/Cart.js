import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { changeName } from './../store.js';

function Cart() {

    // useSelector() brings Redux store return statement can be => state.stock
    let userSelector = useSelector((state) => { return state.user })

    let cartSelector = useSelector((state) => { return state.cart })
    // send request to store.js
    let dispatch = useDispatch()

    return(
        <div>
            { userSelector }'s cart
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Quantity</th>
                    <th>Change</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        cartSelector.map((a, i) => 
                            <tr key={i}>
                                <td>{1 + i}</td>
                                <td>{ cartSelector[i].name }</td>
                                <td>{ cartSelector[i].count}</td>
                                <td>
                                    <button onClick={() => {
                                        // request store.js to do changeName()
                                        dispatch(changeName())
                                    }}>+</button>
                                </td>
                            </tr>
                        )
                    }
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;