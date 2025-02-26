import TextField from "@components/TextField/index.tsx";

const ConfirmInfo = ({ selectedChild, selectedVaccines, values }) => (
  <div>
    <h2 className="text-xl font-bold mb-4 text-blue-600">Xác nhận thông tin</h2>

    {selectedChild && (
      <div className="mt-4">
        <h2 className="text-lg font-semibold text-black mb-2">Thông tin người tiêm</h2>
        <div className="grid grid-cols-2 gap-6 text-left">
          <TextField title="Tên phụ huynh" data={selectedChild.parentName} />
          <TextField title="Tên đầy đủ" data={selectedChild.childName} />
        </div>
        <div className="grid grid-cols-3 gap-6 text-left mt-2">
          <TextField title="Giới tính" data={selectedChild.childGender === "M" ? "Nam" : "Nữ"} />
          <TextField title="Ngày sinh" data={selectedChild.dateOfBirth} />
          <TextField title="Nơi sinh" data={selectedChild.birthPlace} />
        </div>
        <div className="grid grid-cols-3 gap-6 text-left mt-2">
          <TextField title="Phương pháp sinh" data={selectedChild.birthMethod} />
          <TextField title="Cân nặng (kg)" data={selectedChild.birthWeight} />
          <TextField title="Chiều cao (cm)" data={selectedChild.birthHeight} />
        </div>
        <TextField title="Khiếm khuyết" data={selectedChild.abnormalities || "Không có"} />
        <TextField title="Ghi chú" data={values.notes} />
        <div className="grid grid-cols-2 gap-6 text-left">
          <TextField title="Ngày tiêm" data={values.date} />
          <TextField title="Giờ tiêm" data={values.time+":00"} />
        </div>
      </div>
    )}

    <div className="mt-6">
      <h2 className="text-lg font-semibold text-black mb-2">Danh sách Vaccine</h2>
      {selectedVaccines.length > 0 ? (
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-blue-100">
              <th className="border border-gray-300 px-4 py-2 text-center">STT</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Tên Vaccine</th>
              <th className="border border-gray-300 px-4 py-2 text-center">Giá tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {selectedVaccines.map((vaccine, index) => (
              <tr key={vaccine.id} className="bg-white text-black">
                <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                <td className="border border-gray-300 px-4 py-2">{vaccine.vaccineName}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {vaccine.pricePerDose.toLocaleString("vi-VN")} VNĐ
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="text-gray-500">Chưa chọn vaccine nào</p>
      )}
    </div>
  </div>
);

export default ConfirmInfo;
