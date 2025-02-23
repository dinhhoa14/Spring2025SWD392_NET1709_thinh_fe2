const ConfirmInfo = ({ selectedChild, selectedVaccines }) => (
    <div>
        <h2 className="text-xl font-bold mb-4 text-blue-600">Xác nhận thông tin</h2>
        <div className="text-left mb-4">
            <p>
                <strong>Người tiêm:</strong> {selectedChild?.fullName}
            </p>
            <p>
                <strong>Vaccine đã chọn:</strong> {selectedVaccines.join(", ")}
            </p>
        </div>


    </div>
);

export default ConfirmInfo;