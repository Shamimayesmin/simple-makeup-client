import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../../context/AuthProvider/AuthProvider';
import OrdersRow from './OrdersRow';

const Orders = () => {
    const {user,logOut} = useContext(AuthContext)

    const [orders, setOrders] = useState([])

    // delete a single order 
    const handleDelete = (id) =>{
        const procced = window.confirm('Do you want to delete this')
        if(procced){
            fetch(`http://localhost:5000/orders/${id}`, {
                method : 'DELETE',
            })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if(data.deletedCount > 0){
                    alert('deleted successfully')
                    const reamining = orders.filter(odr => odr._id !== id)
                    setOrders(reamining)
                }
            })
        }
    }

// update order  status 
    const handleStatusUpdate = (id) => {
		fetch(`http://localhost:5000/orders/${id}`, {
			method: "PATCH",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify({ status: "Approved" }),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.modifiedCount > 0) {
					const reamaining = orders.filter((odr) => odr._id !== id);
					const approving = orders.find((odr) => odr._id === id);
					approving.status = "Approved";

					const newOrders = [approving, ...reamaining];
					setOrders(newOrders);
				}
			});
	};

    
// query diye specipic user email diye order dekha
    useEffect(() =>{
        fetch(`http://localhost:5000/orders?email=${user?.email}`, {
            headers : {
                authorization : `Bearer ${localStorage.getItem('makeup-token')}`
            },

        })
        .then((res) =>{
            if(res.status === 401 || res.status === 403){
                return logOut()
            }
            return res.json()           
        } )  
        .then((data) => {
            console.log('receive', data);
            setOrders(data)
        })


    }, [user?.email,logOut])


    return (
        <div>
            <h2 className="text-5xl">You have {orders.length}</h2>

            <div className="overflow-x-auto w-full">
				<table className="table w-full">
					<thead>
						<tr>
							<th>Name</th>
							<th>price</th>
							<th>Brand</th>
							<th>order confirm</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<OrdersRow
								key={order._id}
								order={order}
								handleDelete={handleDelete}
								handleStatusUpdate={handleStatusUpdate}
							></OrdersRow>
						))}
					</tbody>
				</table>
			</div>
        </div>


    );
};

export default Orders;