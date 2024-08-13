import React from 'react';
import Auth from '../../utils/auth';

const MyBuilds = () => {
    // Check if user is authenticated
    if (!Auth.loggedIn()) {
        return (
            <div>
                <br/><br/>
                <p className="text-center text-red-600">You must be logged in to view this page.</p>
            </div>
        );
    }

    return (
        <>
            <p className="text-2xl font-bold text-center mb-6">My Builds</p>
            <div className="flex flex-col gap-4 px-4 md:flex-row md:flex-wrap md:gap-6">
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                    <div className="mb-4">
                        <h4 className="text-xl font-semibold">Gaming PC</h4>
                    </div>
                    <div>
                        <h6>CPU: Intel Core i3-10100</h6>
                        <h6>GPU: AMD Radeon RX 570</h6>
                        <h6>RAM: G.Skill Trident Z Neo 32GB (2x16GB) DDR4-3600</h6>
                        <h6>Storage: Western Digital Red Plus 4TB NAS HDD</h6>
                        <h6>Motherboard: Gigabyte Z490 AORUS Ultra</h6>
                        <h6>Power Supply: FSP Hydro PTM Pro 1000W 80+ Platinum</h6>
                        <h6>Case: Corsair 5000D Airflow</h6>
                        <h6>Cooling: Corsair iCUE H150i Elite Capellix 360mm</h6>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                    <div className="mb-4">
                        <h4 className="text-xl font-semibold">School PC</h4>
                    </div>
                    <div>
                        <h6>CPU: AMD Ryzen 7 5800X3D</h6>
                        <h6>GPU: NVIDIA GeForce RTX 4090</h6>
                        <h6>RAM: Corsair Vengeance RGB Pro SL 32GB (2x16GB) DDR4-3600</h6>
                        <h6>Storage: Samsung 990 Pro 1TB NVMe SSD</h6>
                        <h6>Motherboard: ASUS TUF Gaming X570-Plus (WiFi)</h6>
                        <h6>Power Supply: Phanteks Revolt X 1000W 80+ Platinum</h6>
                        <h6>Case: be quiet! Dark Base Pro 900</h6>
                        <h6>Cooling: NZXT Kraken Elite 360mm</h6>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                    <div className="mb-4">
                        <h4 className="text-xl font-semibold">PC for Daughter</h4>
                    </div>
                    <div>
                        <h6>CPU: Intel Core i9-13900K</h6>
                        <h6>GPU: NVIDIA GeForce RTX 4070 Ti</h6>
                        <h6>RAM: Kingston HyperX Predator 64GB (4x16GB) DDR4-3600</h6>
                        <h6>Storage: Crucial X8 1TB Portable SSD</h6>
                        <h6>Motherboard: Gigabyte Z490 AORUS Ultra</h6>
                        <h6>Power Supply: Seasonic PRIME TX-1000 1000W 80+ Titanium</h6>
                        <h6>Case: Thermaltake View 71 TG RGB</h6>
                        <h6>Cooling: Arctic Liquid Freezer II 280</h6>
                    </div>
                </div>
                <div className="bg-white p-4 rounded-lg shadow-md w-full md:w-1/2 lg:w-1/3">
                    <div className="mb-4">
                        <h4 className="text-xl font-semibold">Unlimited Funds PC</h4>
                    </div>
                    <div>
                        <h6>CPU: Intel Core i9-11900K</h6>
                        <h6>GPU: AMD Radeon RX 6600 XT</h6>
                        <h6>RAM: Patriot Viper Steel 32GB (2x16GB) DDR4-3200</h6>
                        <h6>Storage: Seagate FireCuda 530 2TB NVMe SSD</h6>
                        <h6>Motherboard: MSI MAG B550 Tomahawk</h6>
                        <h6>Power Supply: Thermaltake Toughpower GF3 1000W 80+ Gold</h6>
                        <h6>Case: Fractal Design Pop Air</h6>
                        <h6>Cooling: Cryorig C7</h6>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyBuilds;
