import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
import { useNavigate } from "react-router-dom";
import { MdReadMore } from "react-icons/md";
import img from "../../../assets/images/data.jpg"
const SixthCart = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["cart6"],
        queryFn: async () => {
            const res = await fetch('https://eco-server-ecocraftz.vercel.app/product/Raw Jute');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }
    console.log(data)

    const handleSelected = (id) => {
        navigate(`/products/${id}`);
    }
    return (
        <div>
            {data.length ? <div className="">
                <div className="border border-b-black shadow-lg">
                    <p className="p-3 text-4xl font-semibold">EcoCraftz <span>{data[0].catagory}</span></p>
                </div>
                <div className='grid sm:grid-cols-1 lg:grid-cols-3 lg:ms-5 mt-5'>
                    {data.map(item => <div key={item._id}>
                        <div className="card lg:w-96 sm:w-full glass shadow-xl">

                            <div className="card-body">
                                <h2 className="card-title">{item.name}</h2>
                                <p>Catagory:{item.catagory}</p>
                                <figure className='mt-3'>
                                    <img src={item.image} alt="image" className='rounded-xl' style={{ height: '200px' }} /></figure>
                                <div className="card-actions justify-end">
                                    <button className="btn btn-sm btn-primary"
                                        onClick={() => handleSelected(item._id)}
                                    >Learn More</button>
                                </div>
                            </div>
                        </div>

                    </div>)}
                </div>
                <div className="flex flex-row justify-center lg:justify-end p-2">
                    <button className="btn btn-ghost text-white font-semibold" onClick={() => navigate(`/other/${data[0].catagory}`)}>see more <span className="text-2xl"><MdReadMore /></span></button>
                </div>
            </div> : <div>
                <div className="w-1/2 mx-auto mt-2">
                    <img src={img} alt="image" style={{ height: '300px' }} className="mx-auto" />
                </div>
                <p className="text-center text-2xl text-red-600 font-semibold">You Have To Insert This Product Right Now ...</p>
            </div>}

        </div>
    );
};

export default SixthCart;
