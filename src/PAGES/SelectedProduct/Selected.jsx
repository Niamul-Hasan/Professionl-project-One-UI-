// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import Navbar from '../Shared/Navbar';
import ReactImageMagnify from 'react-image-magnify';
import './CSS/Selected.css';
// import { FaRegHandPointer } from 'react-icons/fa';
import { GoStack } from 'react-icons/go';

const Selected = () => {
    const navigate = useNavigate();
    const [others, setOthers] = useState([]);
    const { id } = useParams();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["product"],
        queryFn: async () => {
            const res = await fetch(`https://eco-server-ecocraftz.vercel.app/products/${id}`);
            const data = await res.json();
            return data;
        }
    });
    const qCatagory = data?.catagory;
    console.log(data?.leadtime?.p1);

    useEffect(() => {
        const url = `https://eco-server-ecocraftz.vercel.app/qproduct/${qCatagory}`;
        fetch(url).then(res => res.json()).then(others => {
            // const otherData = others.filter(other => other.catagory === qCatagory);
            setOthers(others);
        });
    }, [qCatagory])

    if (isLoading) {
        return <Loading></Loading>
    }


    const handleOther = (catagory) => {
        navigate(`/other/${catagory}`);
    }

    const handleClick = async (id, catagory) => {
        navigate(`/products/${id}`);
        window.scrollTo(0, 0);
        await fetch(`https://eco-server-ecocraftz.vercel.app/other/${catagory}`).then(res => res.json()).then(myData => {
            if (myData.length) {
                refetch();

            }
        })
    }

    const handleBooking = (id) => {
        navigate(`/booking/${id}`);
    }
    const imgURL = data.image;

    return (
        <div className=''>
            <Navbar></Navbar>
            <div className='mt-4'>
                <h1 className='text-3xl font-semibold text-center p-2'><span className='border-b-2 border-b-black'><span className='uppercase text-green-700'>{data.name}</span> Full Specification</span></h1>
                <div id='topDiv' className='mx-2 grid lg:grid-cols-3 sm:grid-cols-1 overflow-hidden lg:justify-start lg:items-start p-4 lg:h-screen'>
                    <div className=' border-gray-500 rounded-lg shadow-2xl' style={{ width: '350px', height: '350px' }} >
                        <div id='imgHolder' className="mx-auto" style={{ width: '350px', height: '300px' }}
                        >
                            <ReactImageMagnify  {...{
                                smallImage: {
                                    alt: `${data.name}`,
                                    isFluidWidth: true,
                                    src: imgURL,

                                },
                                largeImage: {
                                    src: imgURL,
                                    width: 600,
                                    height: 800
                                },

                            }} />
                        </div>
                    </div>

                    <div>
                        <div className='border border-green-300 border-l-2 border-b-2 lg:w-11/12 lg:p-2 mt-20 lg:mt-0'>
                            <h1 className='text-xl font-sans font-bold uppercase me-10'>Product Code: {data?.code}</h1>
                            <ul className='list-disc list-outside ms-6'>
                                {data?.material && <li><span className='font-bold py-4'>Material: </span>{data?.material}</li>}
                                {data?.color && <li><span className='font-bold py-4'>Color: </span>{data?.color}</li>}
                                {data?.diameter && <li><span className='font-bold py-4'>Diameter: </span>{data?.diameter}</li>}
                                {data?.size && <li><span className='font-bold py-4'>Size: </span>{data?.size}</li>}
                                {data?.weight && <li><span className='font-bold py-4'>Weight: </span>{data?.weight}</li>}
                                {data?.packing && <li><span className='font-bold py-4'>Packing: </span>{data?.packing}</li>}
                                {data?.length && <li><span className='font-bold py-4'>Length: </span>{data?.length}</li>}
                                {data?.gsm && <li><span className='font-bold py-4'>GSM: </span>{data?.gsm}</li>}
                                {data?.style && <li><span className='font-bold py-4'>Style: </span>{data?.style}</li>}
                                {data?.pattern && <li><span className='font-bold py-4'>Pattern: </span>{data?.pattern}</li>}
                                {data?.purpose && <li><span className='font-bold py-4'>Purpose: </span>{data?.purpose}</li>}
                                {data?.capacity && <li><span className='font-bold py-4'>Capacity: </span>{data?.capacity}</li>}
                                {data?.gender && <li><span className='font-bold py-4'>Gender: </span>{data?.gender}</li>}
                                {data?.quality && <li><span className='font-bold py-4'>Quality: </span>{data?.quality}</li>}
                                {data?.resize && <li><span className='font-bold py-4'>Resize: </span>{data?.resize}</li>}
                                {data?.type && <li><span className='font-bold py-4'>Type: </span>{data?.type}</li>}
                                {data?.sewn && <li><span className='font-bold py-4'>Sewn: </span>{data?.sewn}</li>}
                                {data?.application && <li><span className='font-bold py-4'>Application: </span>{data?.application}</li>}
                                {data?.feature && <li><span className='font-bold py-4'>Feature: </span>{data?.feature}</li>}

                            </ul>
                        </div>
                        <div className='flex flex-col gap-2 mt-4 me-10'>
                            <div className='text-center'>
                                <button onClick={() => handleBooking(data._id)}
                                    className='btn btn-sm bg-purple-600 border-purple-600  hover:bg-teal-600 hover:border-teal-600 : text-white'>
                                    <span><GoStack></GoStack></span>Booking Now
                                </button>
                            </div>
                            {/* <div className='animate-bounce flex flex-col justify-center items-center'>
                                <span className='text-2xl text-red-600'> <FaRegHandPointer></FaRegHandPointer></span>
                            </div> */}

                        </div>

                    </div>
                    <div id='topDivDetails' className='flex flex-wrap justify-start items-center mt-4 lg:mt-0'>
                        <h1 className='text-2xl font-serif font-bold uppercase me-10 p-1'>Short description</h1>
                        <div className='border border-gray-500 rounded-lg shadow-2xl p-2 mt-2'>
                            <p className='text-lg me-5'>{data.description}</p>
                        </div>


                    </div>

                </div>
            </div>

            <div id='otherProducts' className='pb-2'>
                <div className='text-4xl font-semibold font-serif text-center text-teal-800 mx-auto border rounded-xl border-yellow-200 shadow-md shadow-yellow-200 lg:w-2/5 sm:w-100'>Related Products</div>
                <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-2 mt-5 lg:mx-10 mx-auto'>
                    {
                        others.map(other => <div key={other._id} className="card w-96 glass shadow-xl">
                            <figure className='transition ease-in-out delay-300 hover:translate-x-4 hover:translate-y-4 hover:scale-125 duration-300 overflow-hidden px-10 pt-10'>
                                <img src={other.image} alt={other.name} className="rounded-xl h-32" onClick={() => handleClick(other._id, other.catagory)}

                                />

                            </figure>
                            <div className="card-body items-center text-center">
                                <h2 className="card-title">{other.name}</h2>
                                <div className='border border-black rounded-lg shadow-xl'>
                                    <p>{other.description.slice(0, 140)} ...
                                        <span className="italic link-primary cursor-pointer" onClick={() => handleClick(other._id, other.catagory)}>Read More</span>
                                    </p>
                                </div>
                                <div className="card-actions">
                                    <button className="btn btn-sm btn-primary" onClick={() => handleOther(other.catagory)}>Explore Now</button>
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>




        </div>
    );
};

export default Selected;