import VaccineList from "./VaccineList.jsx";

const VaccineModal = ({ isOpen, onClose, selectedVaccines, setSelectedVaccines }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
                <h2 className="text-xl font-bold mb-4">Chọn Vaccine</h2>

                {/* Danh sách vaccine để chọn */}
                <VaccineList selectedVaccines={selectedVaccines} setSelectedVaccines={setSelectedVaccines} />

                {/* Nút đóng modal */}
                <button onClick={onClose} className="bg-red-500 text-white px-4 py-2 rounded mt-4 w-full">
                    Đóng
                </button>
            </div>
        </div>
    );
};

export default VaccineModal;
