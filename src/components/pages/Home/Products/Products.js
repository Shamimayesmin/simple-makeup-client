import React, { useEffect, useState } from 'react';
import ProductsCard from './ProductsCard';

const Products = () => {

    const [products , setProducts] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:5000/products')
        .then((res) => res.json())
        .then((data) => setProducts(data))
    }, []);
    return (
        <div>
           <div className="text-center mt-5">
				<p className="text-2xl font-bold text-orange-600">Popular Products</p>
				<h2 className="text-5xl font-semibold">Our Popular Products</h2>
				<p className="mt-5">
                the majority have suffered alteration in some form, by injected humour, or randomised <br />
                words which don't look even slightly believable.
				</p>
			</div>
            <div className="grid gird-cols-1 md: grid-cols-2 lg:grid-cols-3 gap-6">
                {
                    products.map((product) =><ProductsCard key={product._id} product={product}></ProductsCard>)
                }
            </div> 
        </div>
    );
};

export default Products;