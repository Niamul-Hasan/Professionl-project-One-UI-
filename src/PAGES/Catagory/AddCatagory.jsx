import { useQuery } from "@tanstack/react-query";
import Loading from "../Shared/Loading";

const AddCatagory = () => {
    const { data, isLoading, refetch } = useQuery({
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


    const handleSubmit = e => {
        e.preventDefault();
        const form = e.target;
        const item = form.catagory.value;
        const parent = form.parent.value;
        const insertedItem = {
            item: item,
            parent: parent
        };
        // e.target.reset();

        fetch('https://eco-server-ecocraftz.vercel.app/insertedCatagory', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(insertedItem)
        }).then(res => res.json()).then(data => {
            if (data.acknowledged) {
                alert(`${item} is inserted successfully`);
                refetch();
            }
        })

    }

    const handleDelete = (id, item) => {
        console.log(id);
        const procced = confirm(`Are you sure to Delete ${item}!`);
        if (procced) {
            fetch(`https://eco-server-ecocraftz.vercel.app/insertedCatagory/${id}`, {
                method: 'DELETE',
                headers: {
                    "authorization": `Bearer ${localStorage.getItem('accessToken')}`
                }
            }).then(res => res.json())
                .then(data => {
                    if (data.deletedCount) {
                        alert(`${item} is deleted`);
                        refetch();
                    }
                })
        }
    }

    return (
        <div className="flex flex-col justify-center items-center p-5 bg-gradient-to-t from-amber-700 via-lime-400 to-violet-300">
            <div className="flex flex-row items-center">
                <div className="flex flex-col items-center">
                    <h1 className="text-3xl font-semibold mb-5 uppercase">Add Here</h1>
                    <div className="w-1/2">
                        <form onSubmit={handleSubmit}>
                            <label>Parent Name</label>
                            <input type="text" placeholder="Type here" name="parent" className="input input-bordered input-accent w-full my-2" />
                            <label>Catagory Name</label>
                            <input type="text" placeholder="Type here" name="catagory" className="input input-bordered input-accent w-full my-2" />
                            <input type="submit" value="add" className="btn btn-sm btn-success my-5" />
                        </form>
                    </div>
                </div>
            </div>
            <div className="">
                <p className="text-2xl font-bold uppercase underline mb-2">Category List</p>
                <ul>
                    {data.map((catagory, index) => <li key={catagory._id} className="glass">


                        <div className="flex flex-row justify-between items-center gap-4 p-2">
                            <h2 className="text-lg">{index + 1}.{catagory.item}</h2>

                            <div className=" flex">
                                <button onClick={() => handleDelete(catagory._id, catagory.item)} className="btn btn-xs btn-error">Delete</button>
                            </div>
                        </div>

                    </li>)}
                </ul>

            </div>


        </div>
    );
};

export default AddCatagory;
