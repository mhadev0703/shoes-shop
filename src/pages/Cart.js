import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from "react-redux";
import { changeName, plusAge } from './../store/userSlice.js';
import { increaseQty, decreaseQty, removeItem } from './../store.js';

function Cart() {

    // useSelector() brings Redux store return statement can be => state.stock
    let userSelector = useSelector((state) => { return state.user })

    let cartSelector = useSelector((state) => { return state.cart })
    // send request to store.js
    let dispatch = useDispatch()

    if (cartSelector.length === 0) {
        return (
            <div>
                <h6>{ userSelector.name }'s cart (Age : { userSelector.age })</h6>
                <div>Your cart is empty.</div>
            </div>
        );
    }
    
    return(
        <div>
            <h6>{ userSelector.name }'s cart (Age : { userSelector.age })</h6>
            <button onClick={() => {
                dispatch(plusAge(14))
            }}>Button</button>
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
                                        dispatch(increaseQty(cartSelector[i].id))
                                    }}>+</button>
                                    &nbsp;&nbsp;
                                    <button onClick={() => {
                                        dispatch(decreaseQty(cartSelector[i].id))
                                    }}>-</button>
                                    &nbsp;&nbsp;
                                    <button onClick={() => {
                                        dispatch(removeItem(cartSelector[i].id))
                                    }}>Remove</button>
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