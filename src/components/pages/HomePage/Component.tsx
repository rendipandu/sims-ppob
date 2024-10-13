import React, { useEffect, useState } from 'react';
import { getServices, getBanner } from '../../../services/apiService';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../redux/store';
import { Hero } from '../../organisms/Hero';
import { useNavigate } from 'react-router-dom';

type Service = {
    service_code: string;
    service_name: string;
    service_icon: string;
    service_tariff: number;
}

export const HomePage: React.FC = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const services = useSelector((state: RootState) => state.service);
    console.log('services: ', services)
    const banners = useSelector((state: RootState) => state.banner);

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                await getServices(dispatch);
                await getBanner(dispatch);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [dispatch]);

    const handleServiceClick = (service: Service) => {
        navigate('/transaction', { state: { service_code: service.service_code, service_name: service.service_name, service_icon: service.service_icon, service_tariff: service.service_tariff } });
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="p-6 space-y-12">
                <Hero />

                <div className="mb-50">
                    <h2 className="text-lg font-semibold mb-4">Daftar Layanan</h2>
                    <div className="flex gap-8 overflow-x-auto">
                        {services && services.length > 0 ? (
                            services.map((service) => (
                                <div
                                    key={service.service_code}
                                    className="flex flex-col items-center cursor-pointer"
                                    onClick={() => handleServiceClick(service)}
                                >
                                    <img
                                        src={`${service.service_icon}`}
                                        alt={service.service_name}
                                        className="w-12 h-12 mb-2"
                                    />
                                    <p className='text-sm text-center'>{service.service_name}</p>
                                </div>
                            ))
                        ) : (
                            <p>Loading services...</p>
                        )}
                    </div>
                </div>

                <div className="mb-10">
                    <h2 className="text-lg font-semibold mb-4">Temukan promo menarik</h2>
                    <div className="flex space-x-4 overflow-x-auto">
                        {banners && banners.length > 0 ? (
                            banners.map((banner) => (
                                <img key={banner.banner_name} src={banner.banner_image} alt={banner.description} />
                            ))
                        ) : (
                            <p>Loading banners...</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};