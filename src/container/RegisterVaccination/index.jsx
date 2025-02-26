import { userService } from "@src/services/userService.js";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import StepIndicator from "./Steper.jsx";
import SelectChild from "./Step/Step1.jsx";
import SelectVaccine from "./Step/Step2.jsx";
import ConfirmInfo from "./Step/Step3.jsx";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchVaccineAndPackages,
  fetchVaccines,
} from "@src/stores/slices/serviceSlice.js";
import { appointmentService } from "@src/services/appointmentService.js";
import { toast } from "react-toastify";
import { formatTime } from "@utils/format.js";
import routes from "@src/router/index.js";
import { useNavigate } from "react-router-dom";

const RegisterVaccination = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();
  const [step, setStep] = useState(1);
  const [listChild, setListChild] = useState([]);
  const [selectedChild, setSelectedChild] = useState(null);
  const [selectedVaccines, setSelectedVaccines] = useState([]);
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.service);
  const navigate = useNavigate();

  useEffect(() => {
    const idParent = localStorage.getItem("userId");

    const fetchChildren = async () => {
      try {
        const response = await userService.getAllChildProfile(idParent);
        // console.log(response)
        setListChild(response);
      } catch (error) {
        console.error(error);
      }
    };

    dispatch(fetchVaccines());
    dispatch(fetchVaccineAndPackages());
    fetchChildren();
  }, []);

  const onSubmit = async (data) => {
    console.log({ selectedChild, selectedVaccines, ...data });

    const register = {
      vaccinationRecordId: selectedChild.id,
      vaccines: selectedVaccines.map((vaccine) => ({ vaccineId: vaccine.id })),
      vaccinePackageId:
        selectedVaccines.length < 2 ? selectedVaccines[0]?.id : null, 
      scheduleDate: data.date,
      timeFrom: formatTime(data.time),
      notes: data.notes,
    };

    console.log(register);

    try {
      const response = await appointmentService.createAppointment(register);
      if (response) {
        toast.success("🎉 Đăng ký hồ sơ thành công!")
        navigate(routes.home);
      } else {
        toast.error("❌ Đăng ký hồ sơ thất bại!");
      }
    } catch (error) {
      toast.error("❌ Đăng ký hồ sơ thất bại!");
      console.error("Lỗi đăng ký:", error);
    }
  };

  if (status === "loading") return <p>Đang tải...</p>;
  if (status === "failed") return <p>Lỗi: {error}</p>;

  return (
    <div className="flex flex-col items-center my-3 h-auto p-6">
      <div className="w-screen max-w-4xl min-w-min text-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl">
          <StepIndicator step={step} />
          {step === 1 && (
            <SelectChild
              listChild={listChild}
              setSelectedChild={setSelectedChild}
              selectedChild={selectedChild}
            />
          )}
          {step === 2 && (
            <SelectVaccine
              setSelectedVaccines={setSelectedVaccines}
              selectedVaccines={selectedVaccines}
              register={register}
              errors={errors}
            />
          )}
          {step === 3 && (
            <ConfirmInfo
              selectedChild={selectedChild}
              selectedVaccines={selectedVaccines}
              values={getValues()}
            />
          )}
        </div>
        <div className="mt-4 flex justify-between">
          {step > 1 && (
            <button
              className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              onClick={() => setStep(step - 1)}
            >
              Quay lại
            </button>
          )}
          {step < 3 ? (
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              onClick={() => {
                setStep(step + 1);
                console.log("selectedChild", selectedChild);
                console.log("selectedVaccines", selectedVaccines);
                console.log("register", getValues("notes"));
              }}
            >
              Tiếp tục
            </button>
          ) : (
            <button
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
              onClick={handleSubmit(onSubmit)}
            >
              Đăng ký
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default RegisterVaccination;
