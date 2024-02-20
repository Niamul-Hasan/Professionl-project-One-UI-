import Navbar from "../Shared/Navbar";

const CSR = () => {
    return (
        <>
            <Navbar></Navbar>
            <div className="my-4">
                <section className="mt-10 mb-5">
                    <div className="w-4/5 mx-auto">
                        <h1 className="text-5xl underline text-center font-extrabold mb-4">CSR</h1>
                        <p>At EcoCrfstz, corporate social responsibility means caring for our employees, assisting disadvantaged members of our society and building a sustainable environment. </p>
                    </div>
                </section>
                <section className="border rounded-xl shadow-2xl w-4/5 mx-auto hover:shadow-black">
                    <div className="p-4">
                        <h1 className="text-xl font-bold underline my-4">Details of our various initiatives can be found below:</h1>

                        <p className="text-xl font-bold mt-2">Healthcare for employees and their families</p>
                        <p>EcoCraftz health program covers all permanent employees, their spouses, and children. This comprehensive program includes surgery, hospitalization, as well as routine doctor visits.</p>
                        <p className="text-xl font-bold mt-2">Support to charitable organizations</p>
                        <p>HOPES (Helping Organization for Promising and Energetic Students) runs a scholarship program for meritorious students. EcoCraftz sponsored students for studying Medicine under the aegis of this program.</p>
                        <p>SFB (Serve for Bangladesh) helps the underprivileged peoples around the country for better living. EcoCraftz contributed 20,000 meals in 2020 program</p>
                        <p>PFF (Poverty Fighter Foundation) is a dedicated non-profit organization working to reduce poverty in Bangladesh. EcoCraftz support their program aiming to empower children through education.</p>
                        <p className="text-xl font-bold mt-2">Covid-19 support</p>
                        <p>EcoCraftz so far supported 130 families since the covid-19 pandemic has been spread out.</p>
                        <p className="text-xl font-bold mt-2">Blood grouping campaig</p>
                        <p>Since 2016 EcoCraftz has been operating Blood grouping campaign into the rural areas of Bangladesh.</p>
                        <p className="text-xl font-bold mt-2">Go green campaign</p>
                        <p>EcoCraftz is one of the sponsors of Go green campaign that bridging to the organic foods access.</p>
                        <p className="text-xl font-bold mt-2">Financial assistance to ex-employees and their children</p>
                        <p>From time-to-time EcoCraftz provided financial assistance to ex-employees and their children.</p>
                        <p className="text-xl font-bold mt-2">Total CSR Expenditure is about</p>
                        <p>2.85% of Net Profit.</p>

                    </div>
                </section>
                <section></section>
            </div>
        </>
    );
};

// eslint-disable-next-line react-refresh/only-export-components
export default CSR;