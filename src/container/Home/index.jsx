import { useState, useEffect, Suspense, lazy } from "react";
import Banner from "@containers/Banner/index.jsx";
import PriceList from "@containers/PriceList/index.jsx";
const RegisterVaccinationPage = lazy(() => import("@pages/RegisterVaccinationPage/index.jsx"));
import AboutUsPage from "@pages/AboustUsPage/index.jsx";
import VaccinationGuidePage from "@pages/VaccinationGuide/index.jsx";
import { CircularProgress } from "@mui/material";
import HeaderSection from "@components/HeaderSection/index.jsx";
import BlogSection from "@containers/BlogSection/index.jsx";
import ServiceList from "@containers/ServiceList/index.jsx";
const Home = () => {
    const [isRendered, setIsRendered] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsRendered(true);
        }, 1000);
        window.scrollTo(0, 0);

        return () => clearTimeout(timer); // Xóa timer khi component unmount

    }, []);

    if (!isRendered) {
        return <div className="flex h-screen items-center justify-center text-2xl">
            <CircularProgress size="6rem" />
        </div>;
    }

    return (
        <div>
            <HeaderSection />
            <div name="home" className="h-full">
                <Banner />
            </div>
            <div name="aboutUs" className="h-[80vh] flex items-center justify-center">
                <AboutUsPage />
            </div>
            <div name="guide" className="h-[90vh] flex items-center justify-center">
                <VaccinationGuidePage />
            </div>
            <div name="service" className="h-[90vh] flex flex-col items-center justify-center">
                <ServiceList />
            </div>
            <div name="priceList" className="h-screen flex items-center justify-center">
                <PriceList />
            </div>
            <Suspense fallback={<div>Loading...</div>}>
                <div name="registerVaccination" className="h-screen flex items-center justify-center">
                    <RegisterVaccinationPage />
                </div>
            </Suspense>
            <div name="blog" className="h-[90vh] flex items-center justify-center">
                <BlogSection />
            </div>
        </div>
    );
};

export default Home;
