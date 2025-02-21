import { Step, StepLabel, Stepper } from "@mui/material";

const steps = ["Chọn người tiêm", "Chọn vắc xin", "Chọn lịch tiêm"];

const StepIndicator = ({ step }) => (
    <Stepper activeStep={step - 1} alternativeLabel >
        {steps.map((label, index) => (
            <Step key={index}>
                <StepLabel>{label}</StepLabel>
            </Step>
        ))}
    </Stepper>
);
export default StepIndicator;