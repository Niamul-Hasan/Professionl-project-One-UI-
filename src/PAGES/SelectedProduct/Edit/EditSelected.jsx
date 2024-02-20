import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Shared/Loading";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const parentList = [
    {
        id: 1,
        item: "Bag"
    },
    {
        id: 2,
        item: "Basket"
    },
    {
        id: 3,
        item: "Decorative Product"
    },
    {
        id: 4,
        item: "Home Textile"
    },
    {
        id: 5,
        item: "Sack"
    },
    {
        id: 6,
        item: "Footware"
    },
    {
        id: 7,
        item: "Default"
    },
    {
        id: 8,
        item: "Sister"
    },
]

const EditSelected = () => {
    const navigate = useNavigate();
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { id } = useParams();
    const [toggled, setToggled] = useState(false);
    const [isAgree, setIsAgree] = useState(false);
    const [catagoryList, setCatagoryList] = useState("");
    const { data, isLoading, refetch } = useQuery({
        queryKey: ["selected"],
        queryFn: async () => {
            const res = await fetch(`https://eco-server-ecocraftz.vercel.app/products/${id}`);
            const data = await res.json();
            return data;
        }
    });

    useEffect(() => {
        const url = `https://eco-server-ecocraftz.vercel.app/insertedCatagory`;
        fetch(url)
            .then(res => res.json())
            .then(data => setCatagoryList(data))

    }, [id])

    if (isLoading) {
        return <Loading></Loading>
    }


    const handleImage = (event) => {
        console.log(event);
        const formData = new FormData();
        const image = event.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=116aa0d121bd7177af4e1e86cf6e9223`;
        fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(imgData => {
            if (imgData.success) {
                console.log(imgData.data.url)
                setToggled(false);

                const changedData = {
                    image: imgData.data.url
                }
                fetch(`https://eco-server-ecocraftz.vercel.app/updateImage/${id}`, {
                    method: 'PUT',
                    headers: {
                        'content-type': 'application/json',
                        authorization: `Bearer ${localStorage.getItem('accessToken')}`
                    },
                    body: JSON.stringify(changedData),
                }).then(res => res.json()).then(data => {
                    if (data.modifiedCount) {
                        alert('your Image is successfully Updated');
                        refetch();
                    }

                });
            }
        })

    }

    const handleEdit = (info) => {
        const productInfo = {
            code: info.code,
            name: info.name,
            parent: info.parent,
            catagory: info.catagory,
            description: info.description,
            image: info.image,
            material: info.material,
            color: info.color,
            weight: info.weight,
            diameter: info.diameter,
            size: info.size,
            packing: info.packing,
            length: info.length,
            gsm: info.gsm,
            style: info.style,
            pattern: info.pattern,
            purpose: info.purpose,
            capacity: info.capacity,
            gender: info.gender,
            quality: info.quality,
            resize: info.resize,
            type: info.type,
            sewn: info.sewn,
            application: info.application,
            feature: info.feature,
        };
        fetch(`https://eco-server-ecocraftz.vercel.app/updateImage/${id}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json',
                authorization: `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify(productInfo),
        }).then(res => res.json()).then(data => {
            if (data.modifiedCount) {
                alert('your Product is successfully Updated');
                refetch();
                setIsAgree(false);
            }

        });

    }

    const handleBack = (catalog) => {
        navigate(`/other/${catalog}`);
    }
    // console.log(data)
    return (
        <div className="bg-gradient-to-tl from-lime-800 via-cyan-800 to-fuchsia-400">
            <div className="hero min-h-screen">

                <div className="hero-content flex-col">
                    <div>
                        <img src={data?.image} className="lg:max-w-lg rounded-lg shadow-2xl" />
                        <div className="flex lg:flex-row flex-col justify-start items-center gap-4">
                            {!toggled && <button onClick={() => setToggled(true)} className="btn btn-sm btn-warning mt-4">Change Picture</button>
                            }
                            {/* for image input  */}
                            {toggled && <form onSubmit={handleSubmit(handleImage)} className="mt-4">

                                <div className="form-control w-full max-w-xs">
                                    <input
                                        type="file"
                                        placeholder="image here"
                                        // className="input input-bordered w-full max-w-xs"

                                        {...register("image", {
                                            required: {
                                                value: true,
                                                message: "Product image is required"
                                            }
                                        })} />
                                    <label className="label">
                                        {errors.image?.type === 'required' && <span
                                            className="label-text-alt text-red-500 text-2xl">{errors.image.message}</span>}
                                        {errors.image?.type === 'pattern' && <span
                                            className="label-text-alt text-red-500 text-2xl">{errors.image.message}</span>}
                                    </label>
                                </div>
                                <input type="submit" value='Preview' className="btn btn-sm btn-success mt-4" />
                                <input onClick={() => setToggled(false)} value='Unchanged' className="btn btn-sm btn-success mt-4 mx-4" />
                            </form>}
                        </div>
                    </div>



                    {!isAgree && <div>
                        <h1 className="text-5xl font-bold">{data?.name}</h1>
                        <h3 className="text-2xl font-serif text-white">Catagory: {data?.catagory}</h3>
                        <p className="py-6 text-white font-serif">{data?.description}</p>
                        <div className="flex flex-col gap-2 w-fit">
                            <button onClick={() => setIsAgree(true)}
                                className="btn btn-sm btn-warning">Change Information</button>
                            <button onClick={() => handleBack(data.catagory)}
                                className="btn btn-sm btn-warning w-fit">Back</button>
                        </div>


                    </div>}



                    {isAgree && <div>
                        <form onSubmit={handleSubmit(handleEdit)}>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">Product Code</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Input Code"
                                    defaultValue={data?.code}
                                    className="input input-bordered w-full max-w-xs"
                                    style={{ border: "1px solid green" }}
                                    {...register("code", {
                                        required: {
                                            value: true,
                                            message: "Product Code is required"
                                        }

                                    })} />
                                <label className="label">
                                    {errors.code?.type === 'required' && <span
                                        className="label-text-alt text-red-500">{errors.code.message}</span>}
                                    {errors.code?.type === 'pattern' && <span
                                        className="label-text-alt text-red-500">{errors.code.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">Product Name</span>
                                </label>
                                <input
                                    type="text"
                                    placeholder="Name here"
                                    className="input input-bordered w-full max-w-xs"
                                    style={{ border: "1px solid green" }}
                                    defaultValue={data?.name}
                                    {...register("name", {
                                        required: {
                                            value: true,
                                            message: "Product Name is required"
                                        }

                                    })} />
                                <label className="label">
                                    {errors.name?.type === 'required' && <span
                                        className="label-text-alt text-red-500">{errors.name.message}</span>}
                                    {errors.name?.type === 'pattern' && <span
                                        className="label-text-alt text-red-500">{errors.name.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">Parent Catagory</span>
                                    <p></p>
                                </label>
                                <select
                                    type="select"
                                    placeholder="Select Catagory"
                                    className="input input-bordered w-full max-w-xs"
                                    onChange={() => {

                                        console.log("Here would go the my onChange",)
                                    }}
                                    style={{ border: "1px solid green" }}
                                    {...register("parent", {
                                        required: {
                                            value: true,
                                            message: "Parent Catagory is required"
                                        }
                                    })} >

                                    <option value=""></option>
                                    {
                                        parentList.map(item => <option key={item.id} value={item.item} className=''>
                                            {item.item}</option>)
                                    }

                                </select>
                                <label className="label">
                                    {errors.parent?.type === 'required' && <span
                                        className="label-text-alt text-red-500">{errors.parent.message}</span>}
                                    {errors.parent?.type === 'pattern' && <span
                                        className="label-text-alt text-red-500">{errors.parent.message}</span>}
                                </label>
                            </div>

                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white">Catagory</span>
                                </label>
                                <select
                                    type="select"
                                    placeholder="Select Catagory"
                                    className="input input-bordered w-full max-w-xs"
                                    style={{ border: "1px solid green" }}
                                    defaultValue={data?.catagory}
                                    {...register("catagory", {
                                        required: {
                                            value: true,
                                            message: "Catagory is required"
                                        }
                                    })} >

                                    <option value=""></option>
                                    {
                                        catagoryList.map(item => <option key={item._id} value={item.item} className='uppercase'>
                                            {item.item}</option>)
                                    }
                                    {/* <option value="chandor">Chandor</option>
                                    <option value="ladies bag">Ladies Bag</option>
                                    <option value="papose">Papose</option>
                                    <option value="pot">Pot</option>
                                    <option value="sataronji">Sataronji</option> */}
                                </select>
                                <label className="label">
                                    {errors.catagory?.type === 'required' && <span
                                        className="label-text-alt text-red-500">{errors.catagory.message}</span>}
                                    {errors.catagory?.type === 'pattern' && <span
                                        className="label-text-alt text-red-500">{errors.catagory.message}</span>}
                                </label>
                            </div>
                            <div className="form-control w-full max-w-xs">
                                <label className="label">
                                    <span className="label-text text-white"> Short Discription</span>
                                </label>
                                <textarea
                                    type="textarea"
                                    placeholder="description here"
                                    className="input input-bordered w-full max-w-xs"
                                    style={{ border: "1px solid green" }}
                                    defaultValue={data?.description}
                                    {...register("description", {
                                        required: {
                                            value: true,
                                            message: "Product description is required"
                                        }

                                    })} />
                                <label className="label">
                                    {errors.description?.type === 'required' && <span
                                        className="label-text-alt text-red-500">{errors.description.message}</span>}
                                    {errors.description?.type === 'pattern' && <span
                                        className="label-text-alt text-red-500">{errors.description.message}</span>}
                                </label>
                            </div>


                            {/* this is for optional fields  */}
                            <div className="card shadow-xl mb-2">
                                <div className="card-body">
                                    <h1 className='text-red-800 underline'>Optional Feilds</h1>

                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Material</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.meterial}
                                            placeholder="Material details"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("material", {

                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Color</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.color}
                                            placeholder="Color details"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("color", {

                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Weight</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.weight}
                                            placeholder="Kg/gm"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("weight", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Diameter</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.diameter}
                                            placeholder="Diameter"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("diameter", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Size</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.size}
                                            placeholder="H: x W:"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("size", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Length</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.length}
                                            placeholder="Length: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("length", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Packing</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.packing}
                                            placeholder="Packing Details"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("packing", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">GSM</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.gsm}
                                            placeholder="GSM Details"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("gsm", {
                                            })} />

                                    </div>

                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Style</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.style}
                                            placeholder="Style Details"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("style", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Pattern</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.pattern}
                                            placeholder="Pattern: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("pattern", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Purpose</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.purpose}
                                            placeholder="Purpose:  "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("purpose", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Capacity</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.capacity}
                                            placeholder="Capacity: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("capacity", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Gender</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.gender}
                                            placeholder="Gender: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("gender", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Quality</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.quality}
                                            placeholder="Quality: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("quality", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Resize</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.resize}
                                            placeholder="Resize: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("resize", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Type</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.type}
                                            placeholder="Type: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("type", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Sewn</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.sewn}
                                            placeholder="Sewn:"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("sewn", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Products Customization</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.customization}
                                            placeholder="Products Customization: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("customization", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Application</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.application}
                                            placeholder="Application: "
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("application", {
                                            })} />

                                    </div>
                                    <div className="form-control w-full max-w-xs">
                                        <label className="label">
                                            <span className="label-text">Feature:</span>
                                        </label>
                                        <input
                                            type="text"
                                            defaultValue={data?.feature}
                                            placeholder="Feature:"
                                            className="input input-bordered w-full max-w-xs"
                                            style={{ border: "1px solid green" }}
                                            {...register("feature", {
                                            })} />

                                    </div>


                                </div>
                            </div>



                            <input type="submit" value="Save the changes" className='btn btn-sm w-full max-w-xs bg-yellow-400 border-yellow-400 hover:bg-teal-600 hover:border-teal-600' />
                            <input onClick={() => setIsAgree(false)} value="Unchanged" className='btn btn-sm w-full max-w-xs bg-white hover:bg-green-600 hover:border-green-600 mt-4' />
                        </form>
                    </div>}



                </div>
            </div>

        </div>
    );
};

export default EditSelected;