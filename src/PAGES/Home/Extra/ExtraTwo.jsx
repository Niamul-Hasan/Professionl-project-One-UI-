
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css';
import { motion } from 'framer-motion';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Shared/Loading";
const responsiveSettings = [
    {
        breakpoint: 800,
        settings: {
            slidesToShow: 4,
            slidesToScroll: 3
        }
    },
    {
        breakpoint: 500,
        settings: {
            slidesToShow: 2,
            slidesToScroll: 1,
        }
    },
    {
        breakpoint: 400,
        settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
        }
    }
];

const ExtraTwo = () => {
    const navigate = useNavigate();
    const { data, isLoading } = useQuery({
        queryKey: ["Handicrafts"],
        queryFn: async () => {
            const res = await fetch('https://eco-server-ecocraftz.vercel.app/handyProducts/Default');
            const data = await res.json();
            return data;
        }
    });

    if (isLoading) {
        return <Loading></Loading>
    }

    const handleSelected = (id) => {
        navigate(`/products/${id}`);
    }
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0, y: 100 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="mx-4 rounded-2xl shadow-xl shadow-slate-200 my-2">
            <div className='rounded-lg shadow-lg p-4 mb-4'>
                <div className="text-2xl font-serif font-semibold w-fit ms-2 my-4 border-b border-b-teal-500">
                    About Handicrafts
                </div>
                <p className="text-md font-semibold ms-8 flex-wrap">Handicraft products offer a unique blend of cultural heritage and artisanal craftsmanship, making them highly sought after in the global market. From intricately carved wooden sculptures to vibrant textiles and exquisite ceramics, each piece tells a story of tradition and skill. Our export business specializes in curating a diverse range of high-quality handicrafts sourced from talented artisans around the world. By bridging the gap between local artisans and international markets, we aim to promote cultural exchange while empowering communities. Our commitment to fair trade practices ensures that both artisans and consumers benefit from the exchange. With a focus on sustainability and authenticity, our handicraft products offer a timeless appeal that transcends borders, making them a valuable addition to any international market.</p>
            </div>
            <Slide slidesToScroll={2} slidesToShow={2} indicators={true} responsive={responsiveSettings} duration={2000}>
                {data.map((each, index) => (
                    <div className="card card-compact glass shadow-xl min-h-full" key={index} style={{ width: "98%" }}>
                        <div className="card-body">
                            <img onClick={() => handleSelected(each?._id)}
                                style={{ objectFit: "cover", width: "95%", height: "180px", borderRadius: "20px" }} alt="Slide Image" src={each?.image} className="mx-auto cursor-pointer" />
                        </div>
                    </div>
                ))}
            </Slide>
        </motion.div>
    );
};

export default ExtraTwo;