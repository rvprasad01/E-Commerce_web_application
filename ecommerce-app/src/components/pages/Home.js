import React from "react";
import Slider from "../inc/slider";
import { Link } from 'react-router-dom';

function Home() {
    const arr = [{
        id: 1,
        title: "HP Pavilion 35.6 cm Laptop 14-dv2014TU - Silver",
        image: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c07991100_1_1.png",
        price: "₹63,999"
    },
    {
        id: 2,
        title: "HP Laptop 39.6 cm 15-fc0031AU",
        image: "https://in-media.apjonlinecdn.com/catalog/product/cache/74c1057f7991b4edb2bc7bdaa94de933/c/0/c08484491_11.png",
        price: "₹51,999"
    },
    {
        id: 3,
        title: "HP Victus Gaming Laptop 39.62 cm 15-fb0108AX",
        image: "https://in-media.apjonlinecdn.com/catalog/product/cache/b3b166914d87ce343d4dc5ec5117b502/c/0/c08186083_12.png",
        price: "₹65,199"
    }];

    return (
        <div>
            <Slider />
            <section className="section">
                <div className="container">
                    <div className="row">
                        <div className="cl-md-12 text-center">
                            <h3 className="main-heading">welcome to AK Shopping</h3>
                            <div className="underline mx-auto"></div>

                            <div className="text-nowrap bg-body-secondary border" style={{ width: "8rem" }}>
                                <p><strong>Featured Products</strong></p>
                            </div>

                            <div className="container text-center">
                                <div className="row" style={{ margin: "30px", padding: "30px", columnGap: "100px" }}>

                                    {arr.map((prod) => (
                                        <div className="card" style={{ width: "18rem" }} key={prod.id}>
                                            <img src={prod.image} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h5 className="card-title">{prod.title}</h5>
                                                <p className="card-text">
                                                    {prod.price}
                                                </p>
                                                <Link to="/Products" className="btn btn-warning shadow">Shop Now</Link>
                                            </div>
                                        </div>
                                    ))}

                                </div>
                            </div>

                            <Link to="/Products" className="btn btn-warning shadow mt-5">More Products</Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>

    );
}

export default Home;
