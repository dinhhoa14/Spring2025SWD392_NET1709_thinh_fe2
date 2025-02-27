import { useState, useEffect } from "react";
import { Dialog, DialogTitle, DialogContent, DialogActions, TextField, Button } from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { staffService } from "@src/services/staffService.js"; // Import API Service
import { fileToCloud } from "@utils/telerealm.js";

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
    const authorId = localStorage.getItem("userId");
    setFormData((prevData) => ({ ...prevData, authorId }));
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      try {
        console.log("Uploading file:", file);
        const response = await fileToCloud(file);
        const imageUrl = response.data.secure_url;
        console.log("File upload response:", imageUrl);
        if (response && response.data.secure_url) {
          setFormData({ ...formData, imageUrl });
        }
      } catch (error) {
        console.error("Error uploading file:", error);
      }
    }
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
          label="Mô tả"
          name="shortDescription"
          fullWidth
          margin="dense"
          value={formData.shortDescription}
          onChange={handleChange}
        />

        <input type="file" title="Upload Image" onChange={handleFileChange} />

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
