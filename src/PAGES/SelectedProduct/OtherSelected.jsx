// eslint-disable-next-line no-unused-vars
import React, { useContext, useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from '../Shared/Loading';
import { HiOutlineHome } from 'react-icons/hi';
import { AuthContext } from '../Contexts/UserContext';
import useAdmin from '../NewPages/Hooks/UseAdmin';
import { BiEdit } from 'react-icons/bi';
import { BiSolidDashboard } from 'react-icons/bi';
import { BsMenuButtonFill } from 'react-icons/bs';



const OtherSelected = () => {
    const [isCatagory, setIsCatagory] = useState(false);
    const [catagoryList, setCatagoryList] = useState("");
    const { user } = useContext(AuthContext);
    const [admin] = useAdmin(user);
    const { catagory } = useParams();
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["other"],
        queryFn: async () => {
            const res = await fetch(`https://eco-server-ecocraftz.vercel.app/other/${catagory}`);
            const data = await res.json();
            window.scrollTo(0, 0);
            return data;
        }
    });

    useEffect(() => {
        const url = `https://eco-server-ecocraftz.vercel.app/insertedCatagory`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCatagoryList(data))

    }, [catagory])


    if (isLoading) {
        return <Loading></Loading>
    }
    const filterText = data[0]?.parent;

    console.log("from other selected page", filterText);



    const handleSelected = (id) => {
        navigate(`/products/${id}`);
    }

    const handleEdit = id => {
        navigate(`/dashboard/editSelected/${id}`);
    }

    const handleDelete = (id, name) => {
        console.log(id);
        const procced = confirm(`Are you sure to Delete ${name}!`);
        if (procced) {
            fetch(`https://eco-server-ecocraftz.vercel.app/deleteProduct/${id}`, {
                method: 'DELETE',
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert(`${name} is deleted`);
                        refetch();
                    }
                })
        }
    }

    const handleClick = async (catagory) => {
        navigate(`/other/${catagory}`);
        await fetch(`https://eco-server-ecocraftz.vercel.app/other/${catagory}`).then(res => res.json()).then(myData => {
            if (myData.length) {
                refetch();
                setIsCatagory(false);
            }
        })
    }


    return (
        <div className='border border-gray-500 rounded-lg shadow-2xl'>
            <div className='flex lg:flex-row lg:justify-start flex-col justify-center items-center lg:gap-10 gap-4 p-6'>


                <div onClick={() => navigate('/')} className='btn btn-sm btn-warning'>
                    <HiOutlineHome></HiOutlineHome>Home</div>
                <div onClick={() => navigate('/dashboard')} className='btn btn-sm btn-warning'>
                    <BiSolidDashboard></BiSolidDashboard>Dashboard</div>
                <div className='relative min-w-max'>
                    <div className='min-w-max'>
                        <button onMouseEnter={() => setIsCatagory(!isCatagory)}
                            className='btn btn-sm btn-warning mb-1'>
                            <BsMenuButtonFill></BsMenuButtonFill>Catagories</button>
                    </div>
                    {
                        isCatagory && <div className='flex flex-col items-start absolute z-10 bg-warning p-2 rounded-lg'>
                            {data && catagoryList.filter(products => products?.parent.toLowerCase().includes(filterText.toLowerCase())).map(item => <div key={item._id} onClick={() => handleClick(item.item)}
                                className=' cursor-pointer mb-2 hover:border-b-4 hover:border-b-green-400'>{item.item}</div>)}
                        </div>
                    }

                </div>
                {/* {user?.displayName && <span>Welcome {user.displayName}</span>} */}
                <h1 className='uppercase text-2xl font-serif font-bold'>Explore Our {catagory} </h1>

            </div>

            <div className='grid sm:grid-cols-1 lg:grid-cols-3 gap-2 mx-10 py-4'>

                {
                    data.map(other => <div key={other._id} className="card lg:w-96 sm:w-full glass shadow-xl">
                        <figure className='transition ease-in-out delay-100 hover:translate-x-4 hover:scale-110 duration-300 overflow-hidden mt-3'>
                            <img onClick={() => handleSelected(other._id)} src={other.image} alt="car!" className='rounded-xl max-w-xs' /></figure>
                        <div className="card-body">
                            <div className='border border-t-4 border-l-4 border-green-400 rounded-lg p-2  '>
                                <ul className='list-disc list-outside ms-4'>
                                    <li><h2 className="card-title">{other.name.toUpperCase()}</h2></li>
                                    <li><span className='font-semibold'>Catagory:</span>{other.catagory}</li>
                                    <li> <p>{other.description.slice(0, 55)}...</p></li>
                                </ul>



                                <div className="card-actions justify-start overflow-hidden">
                                    {admin ? <button className="btn btn-sm btn-warning"
                                        onClick={() => handleEdit(other._id)}
                                    >Edit<BiEdit /></button>
                                        : <button className="btn btn-sm btn-success"
                                            onClick={() => handleSelected(other._id)}
                                        >See Details</button>}
                                    {admin && <button onClick={() => handleDelete(other._id, other.name)}

                                        className='btn btn-sm btn-error'>Delete</button>}
                                </div>
                            </div>
                        </div>
                    </div>)
                }

            </div>

        </div>
    );
};

export default OtherSelected;