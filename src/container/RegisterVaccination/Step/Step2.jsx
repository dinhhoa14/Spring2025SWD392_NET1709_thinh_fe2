import { useSelector } from "react-redux";
import VaccineModal from "../components/VaccineModal.jsx";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { TextField } from "@mui/material";

const SelectVaccine = ({
  setSelectedVaccines,
  selectedVaccines,
  register,
  errors,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // Lấy danh sách vaccine và package từ Redux store (sửa lại cho đúng)
  const { vaccines = [], vaccinePackages = [] } = useSelector(
    (state) => state.service.vaccinesAndPackages
  );

  const today = new Date().toISOString().split("T")[0];
  const currentHour = new Date().getHours();

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4 text-blue-600">Chọn Vaccine</h2>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 text-white px-4 py-2 rounded mb-3"
      >
        Chọn Vaccine
      </button>

      {/* Hiển thị danh sách vaccine đã chọn */}
      <div className="border p-2 mb-4 text-left rounded">
        {selectedVaccines.length > 0 ? (
          selectedVaccines.map((vaccine, index) => (
            <div
              key={vaccine.id || index}
              className="flex justify-between items-center bg-blue-100 p-2 mb-2 rounded"
            >
              <span>{vaccine.vaccineName || vaccine.name}</span>
              <button
                onClick={() =>
                  setSelectedVaccines(
                    selectedVaccines.filter((v) => v.id !== vaccine.id)
                  )
                }
                className="text-red-500"
              >
                <IoMdClose size={25} />
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500">Chưa chọn vaccine nào</p>
        )}
      </div>

      {isModalOpen && (
        <VaccineModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          vaccines={vaccines}
          vaccinePackages={vaccinePackages}
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
            min={today}
            {...register("date", { required: "Vui lòng chọn ngày tiêm" })}
            className="w-full p-2 mt-1 h-12 border rounded text-black focus:outline-none"
            onChange={handleDateChange}
          />
          {errors.date && (
            <p className="text-red-500 text-sm">{errors.date.message}</p>
          )}
        </div>

        <div className="mb-4">
          <label className="font-semibold text-black">Chọn giờ tiêm:</label>
          {selectedDate === today && currentHour >= 16 ? (
            <p className="text-red-500">Hết giờ làm việc</p>
          ) : (
            <select
              {...register("time", { required: "Vui lòng chọn giờ tiêm" })}
              className="w-full p-2 mt-1 h-12 border rounded text-black"
            >
              {Array.from({ length: 10 }, (_, i) => i + 7)
                .filter((hour) =>
                  selectedDate === today
                    ? hour > currentHour && hour <= 16
                    : hour >= 7 && hour <= 16
                )
                .map((hour) => (
                  <option key={hour} value={hour}>
                    {hour}:00
                  </option>
                ))}
            </select>
          )}
          {errors.time && (
            <p className="text-red-500 text-sm">{errors.time.message}</p>
          )}
        </div>
      </div>

      {/* Notes */}
      <div className="mb-4">
        <label className="font-semibold text-black">Ghi chú:</label>
        <input 
          {...register("notes")}
          className="w-full p-2 mt-1 h-12 border rounded text-black focus:outline-none"
        />
      </div>
    </div>
  );
};

export default SelectVaccine;
