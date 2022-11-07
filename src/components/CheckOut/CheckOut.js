import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const CheckOut = () => {
    const {name,price,_id} = useLoaderData()
    const {user} = useContext(AuthContext)
    console.log(user);

    const handlePlaceOrder = (event) =>{
        event.preventDefault();

        const form = event.target;
        const name = `${form.firstName.value} ${form.lastName.value}`
        const email = user?.email || "unregistered";
        const phone = form.phone.value;
        const message = form.message.value;

        const order = {
            product : _id,
            productName : name,
            price,
            customer : name,
            email,
            phone,
            message
        };

        fetch("http://localhost:5000/orders", {
			method: "POST",
			headers: {
				"content-type": "application/json",
			},
			body: JSON.stringify(order),
		})
			.then((res) => res.json())
			.then((data) => {
				console.log(data);
				if (data.acknowledged) {
					alert("order placed sucessfully");
					form.reset();
				}
			})
			.catch((err) => console.error(err));
    }

    return (
        <div>
          <form onSubmit={handlePlaceOrder}>
				<h2 className="text-4xl">You are about to order : {name}</h2>
				<h4 className="text-3xl">price: {price}</h4>
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
					<input
						name="firstName"
						type="text"
						placeholder="First Name"
						className="input input-bordered w-full"
					/>
					<input
						name="lastName"
						type="text"
						placeholder="Last Name"
						className="input input-bordered w-full"
					/>
					<input
						name="phone"
						type="number"
						placeholder="phone"
						className="input input-bordered w-full"
					/>

					<input
						name="email"
						type="text"
						placeholder="Your Email"
						defaultValue={user?.email}
						className="input input-bordered w-full"
						readOnly
					/>
				</div>

				<textarea
					name="message"
					className="textarea textarea-bordered h-24 w-full mt-5"
					placeholder="Your Message"
				></textarea>

				<input className="btn btn-accent mt-4" type="submit" value="Place your order" />
			</form>  
        </div>
    );
};

export default CheckOut;