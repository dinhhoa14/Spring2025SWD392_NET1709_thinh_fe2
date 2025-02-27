import { useState } from "react";
import VaccineTable from "./TableVaccine.jsx";
import { Modal, Box, Button, Typography } from "@mui/material";
import VaccineRegistrationForm from "./CreateVaccine.jsx";
import { IoClose } from "react-icons/io5";

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
                        width: 700,
                        bgcolor: "background.paper",
                        boxShadow: 24,
                        p: 4,
                        outline: "none",
                        overflow: "auto",
                        borderRadius: 2,
                    }}
                >
                    <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography variant="h6" component="h2" gutterBottom>
                            Tạo mới vaccine
                        </Typography>
                        <Button
                            // variant="outlined"
                            color="black"
                            onClick={() => setCreateVaccine(false)}
                        // sx={{ mt: 2, fontSize: "2rem" }}
                        >
                            <IoClose size={30} />
                        </Button>
                    </Box>


                    <VaccineRegistrationForm 
                        onclose={() => setCreateVaccine(false)}/>

                </Box>
            </Modal>
        </div>
    );
};

export default AdminVaccine;
