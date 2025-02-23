import { useState } from "react";
import VaccineModal from "../components/VaccineMadal.jsx";

const SelectVaccine = ({ selectedVaccines, setSelectedVaccines, register, errors }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    console.log(selectedVaccines[0].vaccinePackageName);
    console.log(selectedVaccines.map((vaccine) => {
        vaccine
    }))
    return (
        <div>
            <h2 className="text-xl font-bold mb-4 text-blue-600">Chọn Vaccine</h2>
            {/* Nút mở modal */}
            <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 text-white px-4 py-2 rounded">
                Chọn Vaccine
            </button>

            {/* Danh sách vaccine đã chọn */}
            {/* <div className="border p-4 mb-4 text-left">
                {selectedVaccines.map((vaccine, index) => (
                    <div key={index} className="flex justify-between items-center bg-blue-100 p-2 mb-2 rounded">
                        <span>{vaccine.vaccinePackageName}</span>
                        <button
                            onClick={() =>
                                setSelectedVaccines(selectedVaccines.filter((v) => v !== vaccine))
                            }
                            className="text-red-500"
                        >
                            X
                        </button>
                    </div>
                ))}
            </div> */}



            {/* Modal chọn vaccine */}
            {isModalOpen && (
                <VaccineModal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    selectedVaccines={selectedVaccines}
                    setSelectedVaccines={setSelectedVaccines}
                />
            )}

            {/* Chọn ngày và giờ */}
            <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="mb-4">
                    <label className="font-semibold text-black">Chọn ngày tiêm:</label>
                    <input
                        type="date"
                        {...register("date", { required: "Vui lòng chọn ngày tiêm" })}
                        className="w-full p-2 mt-1 h-12 border rounded text-black focus:outline-none"
                    />
                    {errors.date && <p className="text-red-500 text-sm">{errors.date.message}</p>}
                </div>

                <div className="mb-4">
                    <label className="font-semibold text-black">Chọn giờ tiêm:</label>
                    <select {...register("time", { required: "Vui lòng chọn giờ tiêm" })} className="w-full p-2 mt-1 h-12 border rounded text-black">
                        {[...Array(24).keys()].map((hour) => (
                            <option key={hour} value={hour + 1}>
                                {hour + 1}:00
                            </option>
                        ))}
                    </select>
                    {errors.time && <p className="text-red-500 text-sm">{errors.time.message}</p>}
                </div>
            </div>
        </div>
    );
};

export default SelectVaccine;
