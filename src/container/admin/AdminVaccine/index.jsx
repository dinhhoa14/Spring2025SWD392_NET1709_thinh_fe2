import { useState } from "react";
import VaccineTable from "./TableVaccine.jsx";
import { Modal, Box, Button, Typography } from "@mui/material";
import VaccineRegistrationForm from "./CreateVaccine.jsx";

const AdminVaccine = () => {
    const [createVaccine, setCreateVaccine] = useState(false);

    return (
        <div className="m-6">
            <Button variant="contained" onClick={() => setCreateVaccine(true)}>
                Tạo Vaccine
            </Button>
            <VaccineTable />

            <Modal open={createVaccine} onClose={() => setCreateVaccine(false)}>
                <Box
                    sx={{
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)",
                        width: 600,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        borderRadius: 2,
                    }}
                >
                    <Typography variant="h6" component="h2" gutterBottom>
                        Tạo mới vaccine
                    </Typography>
                    <VaccineRegistrationForm />
                    <Button
                        variant="outlined"
                        color="secondary"
                        fullWidth
                        onClick={() => setCreateVaccine(false)}
                        sx={{ mt: 2 }}
                    >
                        tắt
                    </Button>
                </Box>
            </Modal>
        </div>
    );
};

export default AdminVaccine;
