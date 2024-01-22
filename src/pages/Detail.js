import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Detail(props) {

    let [inputValue, setInputValue] = useState("");
    let [errorMessage, setErrorMessage] = useState("");
    let [alert, setAlert] = useState(true);
    let { id } = useParams();
    id = parseInt(id);

    const itemId = props.shoes.findIndex((item) => item.id === id);

    useEffect(() => {
        if (isNaN(inputValue)) {
            setErrorMessage('Input value must be a number.');
        } else {
            setErrorMessage('');
        }
    }, [inputValue])

    useEffect(() => {
        let timer = setTimeout(() => { setAlert(false) }, 5000);

        return () => {
            clearTimeout(timer);
        }
    }, [])


    return (
        <div className="container">
            {
                alert == true
                    ? <div className="alert alert-warning">
                        Additional discount when you order in 5 sec
                    </div>
                    : null
            }
            {errorMessage && (
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            )}
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + '/shoes' + (itemId + 1) + '.jpeg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <input onChange={(e) => { setInputValue(e.target.value) }} Placeholder="Enter a number"></input>
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