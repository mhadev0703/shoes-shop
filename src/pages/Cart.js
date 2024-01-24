import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';

function Cart() {
    return(
        <div>
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
                    <tr>
                    <td>1</td>
                    <td>Hi</td>
                    <td>Hi</td>
                    <td>Hi</td>
                    </tr>
                </tbody>
            </Table> 
        </div>
    )
}

export default Cart;