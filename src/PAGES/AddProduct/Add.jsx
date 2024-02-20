// eslint-disable-next-line no-unused-vars
import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';
import Loading from '../Shared/Loading';
// import bg from "../../assets/1.png";


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

const Add = () => {
    // const [pList, setpList] = useState("")
    const { register, formState: { errors }, handleSubmit } = useForm();
    // const parentName = register("parent")
    // const leadTime = {
    //     p1: "15 Working Days ",
    //     p2: "*After Confirmation of minimum 50% Advanced Payment",
    //     p3: "*Except Friday and any Govt. Holiday"
    // }
    // console.log(leadTime.p1)


    const { data, isLoading } = useQuery({
        queryKey: ["catagory"],
        queryFn: async () => {
            const res = await fetch(`https://eco-server-ecocraftz.vercel.app/insertedCatagory`);
            const data = await res.json();
            return data;
        }
    });


    if (isLoading) {
        return <Loading></Loading>
    }

    const handleAddProduct = (data) => {
        console.log(data);
        const formData = new FormData();
        const image = data.image[0];
        formData.append('image', image);
        const url = `https://api.imgbb.com/1/upload?key=116aa0d121bd7177af4e1e86cf6e9223`;
        fetch(url, {
            method: "POST",
            body: formData
        }).then(res => res.json()).then(imgData => {
            if (imgData.success) {
                // console.log(imgData.data.url);

                const product = {
                    code: data.code,
                    name: data.name,
                    parent: data.parent,
                    catagory: data.catagory,
                    description: data.description,
                    image: imgData.data.url,
                    material: data.material,
                    color: data.color,
                    weight: data.weight,
                    diameter: data.diameter,
                    size: data.size,
                    packing: data.packing,
                    length: data.length,
                    gsm: data.gsm,
                    style: data.style,
                    pattern: data.pattern,
                    purpose: data.purpose,
                    capacity: data.capacity,
                    gender: data.gender,
                    quality: data.quality,
                    resize: data.resize,
                    type: data.type,
                    sewn: data.sewn,
                    application: data.application,
                    feature: data.feature,



                };
                fetch('https://eco-server-ecocraftz.vercel.app/products', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(product)
                }).then(res => res.json()).then(data => {
                    if (data.acknowledged) {
                        alert(`${product.name} is inserted under ${product.catagory} catagory successfully`);
                    }
                })
            }
        });
    }

    // const handleChange = (data) => {
    //     setpList(data.parent);
    //     console.log(pList);
    // }



    // const saturation = 25;
    // const blurAmount = 50;
    // const brightness = 5;
    // const opacity = 0.65;
    return (
        <div className="bg-gradient-to-b from-cyan-800 via-blue-100 to-emerald-200 shadow-xl">

            <h2 className="text-center font-bold text-2xl uppercase p-4">Add A Product</h2>
            <div className="p-4 "> {/* it is for form wraping div  */}
                <form onSubmit={handleSubmit(handleAddProduct)}>
                    <div className="flex flex-col items-center gap-4">
                        {/* it is for first part of form input field  */}
                        <div className="card w-96 glass shadow-xl">
                            <div className="card-body">
                                {/* <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Architecto repellat laborum fugit expedita dicta sequi? Consequuntur illum earum dolorum facere amet dignissimos recusandae! Fugiat, veritatis. Rerum quos nostrum dolores quis necessitatibus porro illo inventore officia adipisci! Optio repellat veniam impedit odit voluptate voluptatibus vero, dignissimos expedita, iusto molestias, molestiae facilis.</p> */}
                                <h1 className='text-red-800 underline'>***Required Feilds</h1>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Product Code</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Input Code"
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
                                        <span className="label-text">Product Name</span>
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Name here"
                                        className="input input-bordered w-full max-w-xs"
                                        style={{ border: "1px solid green" }}
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
                                        <span className="label-text">Parent Catagory</span>
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
                                        <span className="label-text">Catagory</span>
                                    </label>
                                    <select
                                        type="select"
                                        placeholder="Select Catagory"
                                        className="input input-bordered w-full max-w-xs"
                                        style={{ border: "1px solid green" }}
                                        {...register("catagory", {
                                            required: {
                                                value: true,
                                                message: "Catagory is required"
                                            }
                                        })} >

                                        <option value=""></option>
                                        {
                                            data.map(item => <option key={item._id} value={item.item} className=''>
                                                {item.item}</option>)
                                        }

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
                                        <span className="label-text"> Short Discription</span>
                                    </label>
                                    <textarea
                                        type="textarea"
                                        placeholder="description here"
                                        className="input input-bordered w-full max-w-xs"
                                        style={{ border: "1px solid green" }}
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

                                {/* <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Production Lead Time</span>
                                    </label>
                                    <textarea
                                        type="textarea"
                                        value={leadTime}
                                        className="input input-bordered w-full max-w-xs"
                                        style={{ border: "1px solid green" }}
                                        {...register("leadtime", {
                                            required: {
                                                value: true,
                                                message: "Product Material is required"
                                            }

                                        })} />
                                    <label className="label">
                                        {errors.leadtime?.type === 'required' && <span
                                            className="label-text-alt text-red-500">{errors.leadtime.message}</span>}
                                    </label>
                                </div> */}

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Product Image</span>
                                    </label>
                                    <input
                                        type="file"
                                        placeholder="image here"
                                        className="input-bordered w-full max-w-xs"

                                        {...register("image", {
                                            required: {
                                                value: true,
                                                message: "Product image is required"
                                            }
                                        })} />
                                    <label className="label">
                                        {errors.image?.type === 'required' && <span
                                            className="label-text-alt text-red-500">{errors.image.message}</span>}
                                        {errors.image?.type === 'pattern' && <span
                                            className="label-text-alt text-red-500">{errors.image.message}</span>}
                                    </label>
                                </div>

                            </div>
                        </div>

                        {/* it is for second part of form input field  */}
                        <div className="card w-96 glass shadow-xl">
                            <div className="card-body">
                                <h1 className='text-green-600 underline'>Optional Feilds</h1>

                                <div className="form-control w-full max-w-xs">
                                    <label className="label">
                                        <span className="label-text">Material</span>
                                    </label>
                                    <input
                                        type="text"
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
                                        placeholder="Feature:"
                                        className="input input-bordered w-full max-w-xs"
                                        style={{ border: "1px solid green" }}
                                        {...register("feature", {
                                        })} />

                                </div>


                            </div>
                        </div>





                    </div>
                    <div className='flex flex-row justify-center items-center mt-4'>
                        <input type="submit" value="Add This Product" className='btn w-full max-w-xs bg-yellow-300 hover:bg-green-600' />
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Add;