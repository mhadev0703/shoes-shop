import { useEffect } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {

    useEffect(() => {
        const timer = setTimeout(() => {
            const alertBox = document.querySelector('.alert');
            if (alertBox) {
                alertBox.style.display = 'none';
            }
        }, 10000);

        return () => {
            clearTimeout(timer);
        };
    }, []);

    let {id} = useParams();
    id = parseInt(id);

    const itemId = props.shoes.findIndex((item) => item.id === id);

    return (
        <div className="container">
            <div className="alert alert-warning">Additional discount when you order in 10 sec</div>
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
        </div>
    )
}

export default Detail;