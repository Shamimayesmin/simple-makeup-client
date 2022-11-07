import React from 'react';
import { Link } from 'react-router-dom';

const ProductsCard = ({product})=> {
    // console.log(product);
    const {name,price,api_featured_image,_id} = product
    return (
        <div className="card card-compact w-96 bg-base-100 shadow-2xl mt-12">
			<figure>
				<img className="p-6 rounded-lg" src={api_featured_image} alt="Shoes" />
			</figure>
			<div className="card-body">
				<h2 className="card-title">{name}</h2>
				<p className="text-2xl text-orange-600 font-semibold">price: ${price}</p>
				<div className="card-actions justify-end">
					<Link to={`/checkout/${_id}`}>
						<button className="btn btn-primary">Buy Now</button>
					</Link>
				</div>
			</div>
		</div>
    );
};

export default ProductsCard;