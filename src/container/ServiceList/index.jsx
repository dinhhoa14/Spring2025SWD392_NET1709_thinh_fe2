import TabsComponent from '@components/Tabs/index.jsx';
import { fetchVaccines } from '@src/stores/slices/serviceSlice.js';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { generateTabsData } from './ContentTabs.jsx';

const ServiceList = () => {

    const dispatch = useDispatch();
    const { vaccines, status, error } = useSelector((state) => state.service);
    const [tabsData, setTabsData] = useState([]);
    const [selectedTab, setSelectedTab] = useState(null);

    useEffect(() => {
        dispatch(fetchVaccines());
    }, [dispatch]);

    useEffect(() => {
        const newTabs = generateTabsData(vaccines);
        setTabsData(newTabs);
        if (newTabs.length > 0) {
            setSelectedTab(newTabs[0].value); // 🔹 Mặc định chọn tab đầu tiên
        }
    }, [vaccines]);

    if (status === "loading") return <p>Đang tải...</p>;
    if (status === "failed") return <p>Lỗi: {error}</p>;

    return (
        <div className="w-full h-screen flex flex-col justify-center items-center">
            <h1 className="text-4xl font-bold text-center">Dịch vụ</h1>
            <h4 className='text-center mx-20'>Tiêm vắc xin đầy đủ và đúng lịch giúp cơ thể kích thích sinh ra miễn dịch chủ động đặc hiệu,
                từ đó tăng cường sức đề kháng, phòng ngừa các bệnh nguy hiểm. Hiểu được điều đó,
                Trung tâm tiêm chủng Nhân Ái xin giới thiệu các gói vắc xin phù hợp với từng trẻ nhỏ như sau:</h4>
            <div >
                {tabsData.length > 0 ? (
                    <TabsComponent
                        tabs={tabsData}
                        selectedTab={selectedTab}
                        onTabChange={(_, value) => setSelectedTab(value)}
                    />
                ) : (
                    <p>Không có dữ liệu vaccine</p>
                )}
            </div>

        </div>
    );
};

export default ServiceList;
