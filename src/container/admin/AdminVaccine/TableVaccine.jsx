import { DataGrid } from "@mui/x-data-grid";
import { Box, Typography } from "@mui/material";

const vaccineData = {
    id: "8065686d-8012-423c-b1cf-01a3451a4e70",
    vaccineName: "TETRA",
    vaccineType: "Quadrivalent influenza vaccine",
    manufacturer: "Sanofi Pasteur",
    countryOfOrigin: "Hà Lan",
    doseVolume: 0.5,
    dosesPerVial: 10,
    pricePerDose: 383000,
    diseaseTypeId: "019514cc-f43b-7676-9909-8690bb10cdb8",
    createdAt: "2025-02-25T08:21:38.226943217",
    updatedAt: "2025-02-25T08:21:38.226954597",
};

// Định nghĩa cột
const columns = [
    { field: "vaccineName", headerName: "Tên Vaccine", flex: 1 },
    { field: "vaccineType", headerName: "Loại Vaccine", flex: 1.5 },
    { field: "manufacturer", headerName: "Nhà sản xuất", flex: 1 },
    { field: "countryOfOrigin", headerName: "Xuất sứ", flex: 1 },
    { field: "doseVolume", headerName: "Thể tích liều (ml)", flex: 1 },
    { field: "dosesPerVial", headerName: "Số liều mỗi lọ", flex: 1 },
    {
        field: "pricePerDose",
        headerName: "Giá mỗi lọ",
        flex: 1,
        valueFormatter: (params) =>
            new Intl.NumberFormat("vi-VN", { style: "currency", currency: "VND" }).format(params.value),
    },
    // { field: "createdAt", headerName: "Created At", flex: 1, type: "dateTime-local" },
    // { field: "updatedAt", headerName: "Updated At", flex: 1, type: "dateTime-local" },
];

const VaccineTable = () => {
    return (
        <Box sx={{ height: 400, width: "100%" }}>
            <Typography variant="h5" sx={{ mb: 2 }}>
                Vaccine Information
            </Typography>
            <DataGrid
                rows={[vaccineData]} // Đưa dữ liệu vào bảng
                columns={columns}
                pageSizeOptions={[5]}
                getRowId={(row) => row.id} // Định danh hàng
            />
        </Box>
    );
};

export default VaccineTable;
