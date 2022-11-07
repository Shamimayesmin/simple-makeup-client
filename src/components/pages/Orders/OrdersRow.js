import React, { useEffect, useState } from 'react';

const OrdersRow = ({order,handleDelete,handleStatusUpdate}) => {
    const {price, _id,phone, productName,customer,product,status} = order
    const [orderProduct, setOrderProduct] = useState({})

    useEffect(() =>{
        fetch(`http://localhost:5000/products/${product}`)
        .then(res => res.json())
        .then((data) => setOrderProduct(data))

    },[product])
    return (
        <div>
            <tr>
			<th>
				<label>
					<button onClick={() => handleDelete(_id)} className="btn btn-ghost">
						X
					</button>
				</label>
			</th>
			<td>
				<div className="flex items-center space-x-3">
					<div className="avatar">
						<div className="rounded w-24 h-24">
							{orderProduct?.api_featured_image && (
								<img
									src={orderProduct.api_featured_image}
									alt="Avatar Tailwind CSS Component"
								/>
							)}
						</div>
					</div>
					<div>
						<div className="font-bold">{customer}</div>
						<div className="text-sm opacity-50">{phone}</div>
					</div>
				</div>
			</td>
			<td>
				{productName}
				<br />
				<span className="badge badge-ghost badge-sm">${price}</span>
			</td>
			<td>Purple</td>
			<th>
				<button
					onClick={() => handleStatusUpdate(_id)}
					className="btn btn-ghost btn-xs"
				>
					{status ? status : "pending"}
				</button>
			</th>
		</tr>
        </div>
    );
};

export default OrdersRow;