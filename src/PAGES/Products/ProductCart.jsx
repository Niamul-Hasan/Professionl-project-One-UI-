import EighthCart from "./CatagoryWiseCart/Eighth";
import FifthCart from "./CatagoryWiseCart/FifthCart";
import FirstCart from "./CatagoryWiseCart/FirstCart";
import ForthCart from "./CatagoryWiseCart/ForthCart";
import SecondCart from "./CatagoryWiseCart/SecondCart";
import SeventhCart from "./CatagoryWiseCart/SeventhCart";
import SixthCart from "./CatagoryWiseCart/SixthCart";
import ThirdCart from "./CatagoryWiseCart/ThirdCart";


const ProductCart = () => {
    return (
        <div>
            <FirstCart></FirstCart>
            <SecondCart></SecondCart>
            <ThirdCart></ThirdCart>
            <ForthCart></ForthCart>
            <FifthCart></FifthCart>
            <SixthCart></SixthCart>
            <SeventhCart></SeventhCart>
            <EighthCart></EighthCart>

        </div>
    );
};

export default ProductCart;