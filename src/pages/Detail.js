function Detail(props) {
    const { title, content, price } = props.shoes;

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6">
                    <img src={process.env.PUBLIC_URL + '/shoes1.jpeg'} width="100%" />
                </div>
                <div className="col-md-6">
                    <h4 className="pt-5">{title}</h4>
                    <p>{content}</p>
                    <p>${price}</p>
                    <button className="btn btn-danger">Order Item</button>
                </div>
            </div>
        </div>
    )
}

export default Detail;