import { useForm } from "react-hook-form";
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from "@mui/material";
import InputText from "@src/components/InputText/index.jsx";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => {
    console.log("Password Change Data:", data);
    onClose();
  };

  return (
    <Dialog open={isOpen} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Change Password</DialogTitle>
      <DialogContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <InputText label="Mật khẩu cũ" name="oldPassword" register={register} required error={errors.oldPassword} type="password" />
          <InputText label="Mật khẩu mới" name="newPassword" register={register} required error={errors.newPassword} type="password" />
          <InputText label="Nhập lại mật khẩu mới" name="confirmPassword" register={register} required error={errors.confirmPassword} type="password" />
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="secondary" variant="outlined">
          Hủy
        </Button>
        <Button type="submit" onClick={handleSubmit(onSubmit)} color="primary" variant="contained">
          Gửi
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChangePasswordModal;
