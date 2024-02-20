import { FaVirusCovid } from "react-icons/fa6";
import Navbar from "../Shared/Navbar";
import img1 from "../../assets/images/covid.jpg";
import img2 from "../../assets/images/vaccine.jpg"
const Covid = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className="text-center m-6">
                <p className="text-5xl text-blue-600 font-semibold underline">Covid-19 Update ...</p>
            </div>

            <section className="relative flex flex-row justify-evenly items-center gap-4 my-4">
                <div className="w-1/2">
                    <p className="text-gray-500 text-5xl">Reported Cases and Deaths by Country or Territory</p>
                </div>
                <div className="hover:animate-bounce">
                    <a href='https://www.worldometers.info/coronavirus/' target='_blank' rel="noopener noreferrer"><button className="btn bg-red-600 text-xl text-white hover:bg-red-500  ">
                        <span><FaVirusCovid /></span>Covid-19</button></a>
                </div>
            </section>
            <section className="flex flex-row justify-center items-center my-8">
                <div className="bg-gray-200 py-4">
                    <div className="border-2 rounded w-11/12 m-auto">
                        <img src={img1} alt="image" style={{ height: "300px" }} />
                    </div>
                </div>

                <div className="bg-gray-200 py-4">
                    <div className="border-2 rounded w-11/12 m-auto">
                        <img src={img2} alt="image" style={{ height: "300px" }} />
                    </div>
                </div>
            </section>

            <section className="flex flex-row justify-center items-center my-4">
                <div className="bg-yellow-700 w-4/5 text-center rounded-lg p-1">
                    <a href='https://www.who.int/emergencies/diseases/novel-coronavirus-2019/covid-19-vaccines' target='_blank' rel="noopener noreferrer">
                        <p><button className="btn btn-ghost btn-sm text-neutral-800">Read More</button></p></a>
                </div>
            </section>


        </div>
    );
};

export default Covid;