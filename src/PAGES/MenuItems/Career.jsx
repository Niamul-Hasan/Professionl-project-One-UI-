import Navbar from "../Shared/Navbar";

const Career = () => {
    return (
        <div className="">
            <Navbar></Navbar>
            <section className="mt-10 mb-5">
                <div className="w-4/5 mx-auto">
                    <h1 className="text-5xl underline text-center font-extrabold">Career</h1>
                    <p className="px-5 mt-6">Whether you are looking for a job or seeking your next career move as an experienced professional you will find a range of opportunities to be part of EcoCraftz that helps a number of people to do more, feel better and live longer and ride on a journey of growth.</p>
                </div>
            </section>

            <section>
                <div className="w-4/5 mx-auto">
                    <h1 className="text-3xl font-thin text-teal-800">Who Works Here?</h1>
                    <p className="mt-2">Our people are driving force of our success. EcoCraftz is an equal opportunity employer and provides employment to people from different backgrounds.
                        To support our growth, we search talented professionals who nourish our cherished dream and contribute to reach the company &#39;s and their own future goal. We have a large pool of professionals from diversified backgrounds and they work in different department&#39;s like-</p>

                    <ul className="text-lg list-disc font-bold">
                        <li> Sales and Marketing
                        </li>
                        <li> Design
                        </li>
                        <li>International Business
                        </li>
                        <li> Supply Chain Management
                        </li>
                        <li> Finance & Accounts
                        </li>
                        <li>Warehouse
                        </li>
                        <li>Legal affairs</li>
                    </ul>
                </div>
            </section>

            <section>

            </section>
            <section className="my-4">
                <div className="w-4/5 mx-auto">
                    <h1 className="text-3xl font-bold underline mb-2">Apply:</h1>
                    <p>
                        We encourage you to enlist in our career database, that way you will always have your most up to date contact details, experiences, and other information. Once your profile is in our database, we will inform you for the next steps.
                    </p>
                    <p>We would like to have your complete CV along with cover letter in following e-mail.</p>
                    <p className="text-teal-800 font-semi-bold">ecocraftzbd@gmail.com</p>

                </div>
            </section>

        </div>
    );
};

export default Career;