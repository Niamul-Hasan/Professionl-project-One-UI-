// eslint-disable-next-line no-unused-vars
import React, { useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Loading from '../Shared/Loading';
import { useNavigate, useParams } from 'react-router-dom';
import { AuthContext } from '../Contexts/UserContext';
import Navbar from '../Shared/Navbar';
import countryList from 'react-select-country-list';
import Select from 'react-select';

const Booking = () => {
    const [value, setValue] = useState();
    const options = useMemo(() => countryList().getData(), []);

    const { user } = useContext(AuthContext);
    const { id } = useParams();
    const navigate = useNavigate();

    const { data, isLoading } = useQuery({
        queryKey: ["booking"],
        queryFn: async () => {
            const res = await fetch(`https://eco-server-ecocraftz.vercel.app/products/${id}`);
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleConfirm = (event) => {
        event.preventDefault();

        const selectedCountryName = countryList().getLabel(value.value);

        const form = event.target;
        const bookingData = {
            code: data?.code,
            email: user?.email,
            product: data.name,
            catagory: data.catagory,
            quantity: form.quantity.value,
            country: selectedCountryName,
            contact: form.contact.value,
            address: form.address.value,
            image: data.image
        };
        fetch('https://eco-server-ecocraftz.vercel.app/bookings', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(bookingData)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                alert(`${bookingData.product} is inserted to DB successfully`);
            }
            navigate(`/dashboard/yourBooking/${user?.email}`)

        })
        // console.log(bookingData);
    }


    const changeHandler = value => {
        setValue(value);
    }
    return (

        <div className='bg-gradient-to-tl from-green-200 via-green-300 to-blue-500'>
            <Navbar></Navbar>

            <div className="hero min-h-screen glass">
                <div className="hero-content flex-col lg:flex-row">
                    <div className="text-center lg:text-left">

                        <div className='border border-l-4 border-b-2 border-violet-600 shadow-lg p-2 rounded-md my-2'>
                            <h2>Product Code: <span className='font-semibold text-lg'>{data?.code}</span></h2>
                            <h2>Your Email: <span className='text-sm font-thin text-blue-800'>{user?.email}</span></h2>
                            <h2>Product Name: <span className='text-xl text-teal-800'>{data.name}</span></h2>
                            <h2>Catagory: <span className='uppercase'>{data.catagory}</span></h2>
                        </div>
                        <img src={data.image} alt="" className='rounded-lg shadow-2xl' style={{ height: '400px', width: '450px' }} />
                    </div>
                    <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl glass">
                        <h1 className='text-2xl font-serif font-bold mx-auto'>Confirm Your Booking</h1>
                        <form onSubmit={handleConfirm} className="card-body">

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Quantity</span>
                                </label>
                                <input type="number" name='quantity' placeholder='Name Your Need ' className="input input-bordered" />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Country</span>
                                </label>
                                <Select options={options} value={value} onChange={changeHandler} type="text" name='country' />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Full Address</span>
                                </label>
                                <textarea type="text" name='address' placeholder='State/City, Road/House No' className="input input-bordered" required />
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Contact Number</span>
                                </label>
                                <input type="number" name='contact' placeholder='Give Your Contact Number' className="input input-bordered" required />
                            </div>
                            <div className="form-control mt-6">
                                <button type='submit' className="btn btn-sm btn-primary">Confirm</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Booking;