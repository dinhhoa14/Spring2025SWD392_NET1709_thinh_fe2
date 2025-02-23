// src/dataContent.jsx
export const generateTabsData = (vaccines) => {
    if (!vaccines || vaccines.length === 0) return [];

    return vaccines.map((packageVaccine) => ({
        label: packageVaccine.vaccinePackageName,
        value: packageVaccine.vaccinePackageId,
        content: (
            <div className="p-4 bg-white shadow rounded-lg">
                <h2 className="text-lg font-bold">{packageVaccine.vaccinePackageName}</h2>
                <p className="text-gray-600">{packageVaccine.description}</p>
                <p className="font-semibold mt-2">Tổng giá: {packageVaccine.totalPrice.toLocaleString()} VND</p>

                <table className="w-full border-collapse mt-4">
                    <thead>
                        <tr className="bg-gray-200">
                            <th className="border p-2">Bệnh</th>
                            <th className="border p-2">Vaccine</th>
                            <th className="border p-2">Xuất xứ</th>
                            <th className="border p-2">Liều</th>
                        </tr>
                    </thead>
                    <tbody>
                        {packageVaccine.vaccineLineServiceDTO.map((vaccine, index) => (
                            <tr key={index} className="border">
                                <td className="border p-2">{vaccine.diseaseName}</td>
                                <td className="border p-2">{vaccine.vaccineName}</td>
                                <td className="border p-2">{vaccine.countryOfOrigin}</td>
                                <td className="border p-2 text-center">{vaccine.doseNumber}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        ),
    }));
};
