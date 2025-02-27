import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { staffService } from "@src/services/staffService.js"; // Import API Service

export default function CreateBlogModal({ open, handleClose, onSubmit }) {
  const [formData, setFormData] = useState({
    authorId: "", 
    shortDescription: "",
    imageUrl: "",
    title: "",
    content: "",
    status: "DRAFT",
  });

  const [loading, setLoading] = useState(false); 
  const [errors, setErrors] = useState({ title: "", content: "" });

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("userDataNhanAi"));
    if (userData && userData.id) {
      setFormData((prevData) => ({ ...prevData, authorId: userData.id }));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const isContentEmpty = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return !doc.body.textContent.trim();
  };

  const handleSubmit = async () => {
    setLoading(true);
    setErrors({ title: "", content: "" });

    let formErrors = {};

    if (!formData.title.trim()) {
      formErrors.title = "Tiêu đề không được để trống!";
    }

    if (isContentEmpty(formData.content)) {
      formErrors.content = "Nội dung không được để trống!";
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setLoading(false);
      return;
    }

    try {
      await staffService.createBlog(formData);
      onSubmit();
      handleClose();
    } catch (err) {
      setErrors({ ...formErrors, content: "Lỗi khi tạo blog, vui lòng thử lại!" });
      console.error("Create blog error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Tạo Blog Mới</DialogTitle>
      <DialogContent>
        <TextField
          label="Tiêu đề"
          name="title"
          fullWidth
          margin="dense"
          value={formData.title}
          onChange={handleChange}
          error={!!errors.title}
          helperText={errors.title}
        />

        <TextField
          label="Mô tả ngắn"
          name="shortDescription"
          fullWidth
          margin="dense"
          value={formData.shortDescription}
          onChange={handleChange}
        />

        <TextField
          label="URL Hình ảnh"
          name="imageUrl"
          fullWidth
          margin="dense"
          value={formData.imageUrl}
          onChange={handleChange}
        />

        <ReactQuill
          theme="snow"
          value={formData.content}
          onChange={handleContentChange}
          style={{ height: "200px", marginTop: "10px" }}
        />
        {errors.content && <p style={{ color: "red", marginTop: "10px" }}>{errors.content}</p>}
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>
          Hủy
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Đang tạo..." : "Tạo Blog"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
