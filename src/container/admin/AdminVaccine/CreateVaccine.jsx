import { useForm, Controller } from "react-hook-form";
import { TextField, MenuItem, Button, Box, Select, InputLabel, FormControl } from "@mui/material";

const vaccineTypes = [
    { value: "Quadrivalent influenza vaccine", label: "Quadrivalent Influenza Vaccine" },
    { value: "Trivalent influenza vaccine", label: "Trivalent Influenza Vaccine" },
];

const VaccineRegistrationForm = () => {
    const { handleSubmit, control } = useForm({
        defaultValues: {
            vaccineName: "TETRA",
            vaccineType: "Quadrivalent influenza vaccine",
            manufacturer: "Sanofi Pasteur",
            countryOfOrigin: "Hà Lan",
            doseVolume: "0.5",
            dosesPerVial: "10",
            pricePerDose: "383000",
            diseaseTypeId: "019514cc-f43b-7676-9909-8690bb10cdb8",
        },
    });

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{
            display: "flex", flexDirection:
                "column", gap: 2, maxWidth: 600, mx: "auto", mt: 4
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

            <Controller
                name="manufacturer"
                control={control}
                render={({ field }) => <TextField {...field} label="Nhà sản xuất" fullWidth />}
            />

            <Controller
                name="countryOfOrigin"
                control={control}
                render={({ field }) => <TextField {...field} label="Nơi Xuất xứ" fullWidth />}
            />

            <Controller
                name="doseVolume"
                control={control}
                render={({ field }) => <TextField {...field} label="Thể tích liều (ml)" fullWidth />}
            />

            <Controller
                name="dosesPerVial"
                control={control}
                render={({ field }) => <TextField {...field} label="Số liều mỗi lọ" fullWidth />}
            />

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
