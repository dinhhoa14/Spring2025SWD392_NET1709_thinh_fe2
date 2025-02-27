import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Box, Select, InputLabel, FormControl, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import vaccineService from "@src/services/vaccineService.js";
import { toast } from "react-toastify";

const vaccineTypes = [
    { value: "Vaccine virus toàn phần", label: "Vaccine virus toàn phần" },
    { value: "Vaccine tiểu đơn vị", label: "Vaccine tiểu đơn vị" },
    { value: "Vaccine axit nucleic", label: "Vaccine axit nucleic" },
    { value: "Vaccine virus trung gian", label: "Vaccine virus trung gian" },

];

const VaccineRegistrationForm = ({ onClose }) => {
    const { handleSubmit, control } = useForm({});

    const [diseaseTypes, setDiseaseTypes] = useState([]);
    useEffect(() => {
        const fetchDiseaseTypes = async () => {
            try {
                const response = await vaccineService.getAllDiseaseType();
                setDiseaseTypes(response.data.content);
            } catch (error) {
                console.error(error);
            }
        };
        console.log(diseaseTypes)
        fetchDiseaseTypes();
    }, [])
    const onSubmit = async (data) => {
        try {
            const response = await vaccineService.createVaccine(data);
            toast.success(`Tạo mới thành công!`);
            if (onClose) onClose(); // Đóng modal sau khi thành công
        } catch (error) {
            toast.error(`Tạo mới thất bại!`);
            console.error(error);
        }
    };


    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            display: "flex", flexDirection: "column", gap: 2, maxWidth: 700, mx: "auto", mt: 4,
        }}>
            <Controller
                name="vaccineName"
                control={control}
                render={({ field }) => <TextField {...field} label="Vaccine Name" fullWidth />}
            />

            <FormControl fullWidth>
                <InputLabel>Loại Vaccine</InputLabel>
                <Controller
                    name="vaccineType"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="Vaccine Type">
                            {vaccineTypes.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Phòng bệnh</InputLabel>
                <Controller
                    name="diseaseTypeId"
                    control={control}
                    render={({ field }) => (
                        <Select {...field} label="Tên bệnh">
                            {diseaseTypes.map((option) => (
                                <MenuItem key={option.id} value={option.id}>
                                    {option.name}
                                </MenuItem>
                            ))}
                        </Select>
                    )}
                />
            </FormControl>

            {/* Hiển thị 2 input trên cùng 1 hàng */}
            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Controller
                        name="manufacturer"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Nhà sản xuất" fullWidth />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="countryOfOrigin"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Nơi Xuất xứ" fullWidth />}
                    />
                </Grid>
            </Grid>

            <Grid container spacing={2}>
                <Grid item xs={6}>
                    <Controller
                        name="doseVolume"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Thể tích liều (ml)" fullWidth />}
                    />
                </Grid>
                <Grid item xs={6}>
                    <Controller
                        name="dosesPerVial"
                        control={control}
                        render={({ field }) => <TextField {...field} label="Số liều mỗi lọ" fullWidth />}
                    />
                </Grid>
            </Grid>

            <Controller
                name="pricePerDose"
                control={control}
                render={({ field }) => <TextField {...field} label="Giá mỗi liều (VND)" fullWidth />}
            />

            <Button type="submit" variant="contained" color="primary">
                Tạo mới
            </Button>
        </Box>

    );
};

export default VaccineRegistrationForm;
