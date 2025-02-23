const VaccineList = ({ selectedVaccines, setSelectedVaccines }) => {
    const handleSelect = (vaccine) => {
        if (selectedVaccines.includes(vaccine)) {
            setSelectedVaccines(selectedVaccines.filter((v) => v !== vaccine));
        } else {
            setSelectedVaccines([...selectedVaccines, vaccine]);
        }
    };

    return (
        <div className="border p-4 max-h-60 overflow-y-auto">
            {selectedVaccines.map((vaccine) => (
                <div key={vaccine} className="flex justify-between items-center p-2 bg-gray-100 mb-2 rounded">
                    <span>{vaccine}</span>
                    <input
                        type="checkbox"
                        checked={selectedVaccines.includes(vaccine)}
                        onChange={() => handleSelect(vaccine)}
                        className="h-5 w-5"
                    />
                </div>
            ))}
        </div>
    );
};

export default VaccineList;
