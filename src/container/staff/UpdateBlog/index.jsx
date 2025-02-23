import { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill CSS
import { staffService } from "@src/services/staffService.js"; // Import API Service

export default function UpdateBlogModal({ open, handleClose, blogId, onSubmit }) {
  const [formData, setFormData] = useState({
    authorId: "",
    title: "",
    content: "",
    status: "DRAFT", // Thêm status với giá trị mặc định là DRAFT
  });
  const [loading, setLoading] = useState(false); // Trạng thái loading
  const [error, setError] = useState(""); // Lưu lỗi nếu có

  // Lấy thông tin blog chi tiết khi modal mở và blogId thay đổi
  useEffect(() => {
    const fetchBlogDetails = async () => {
      if (blogId) {
        setLoading(true);
        setError(""); // Reset error
        try {
          const response = await staffService.getDetailBlog(blogId);
          setFormData({
            authorId: response.authorId,
            title: response.title,
            content: response.content,
            status: response.status || "DRAFT",
          });
        } catch (err) {
          setError("Lỗi khi lấy thông tin blog.");
          console.error("Fetch blog error:", err);
        } finally {
          setLoading(false);
        }
      }
    };

    if (open) {
      fetchBlogDetails();
    }
  }, [open, blogId]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý thay đổi nội dung Quill Editor
  const handleContentChange = (value) => {
    setFormData({ ...formData, content: value });
  };

  const isContentEmpty = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    return !doc.body.textContent.trim(); // Kiểm tra nếu nội dung chỉ có thẻ rỗng
  };

  const handleSubmit = async () => {
    setLoading(true);
    setError("");

    if (!formData.title.trim()) {
      setError("Tiêu đề không được để trống!");
      setLoading(false);
      return;
    }

    if (isContentEmpty(formData.content)) {
      setError("Nội dung không được để trống!");
      setLoading(false);
      return;
    }

    try {
      // Chỉ truyền những trường cần thiết vào phương thức updateBlog
      const blogData = {
        id: blogId, // Truyền vào blogId
        authorId: formData.authorId,
        title: formData.title,
        content: formData.content,
        status: formData.status, // Truyền status vào đây
      };

      await staffService.updateBlog(blogData);
      onSubmit(); // Gọi lại hàm onSubmit để cập nhật danh sách blog
      handleClose(); // Đóng modal
    } catch (err) {
      setError("Lỗi khi cập nhật blog.");
      console.error("Update blog error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
      <DialogTitle>Cập Nhật Blog</DialogTitle>
      <DialogContent>
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <CircularProgress />
          </div>
        ) : (
          <>
            <TextField
              label="Tiêu đề"
              name="title"
              fullWidth
              margin="dense"
              value={formData.title}
              onChange={handleChange}
            />
            {error && !formData.title && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            <ReactQuill
              theme="snow"
              value={formData.content}
              onChange={handleContentChange}
              style={{ height: "200px", marginTop: "10px" }}
            />
            {error && isContentEmpty(formData.content) && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {error}
              </Typography>
            )}

            {/* Bạn có thể thêm một dropdown để thay đổi status nếu cần */}
            {/* Ví dụ: */}
            {/* <TextField
              label="Trạng thái"
              name="status"
              select
              value={formData.status}
              onChange={handleChange}
              fullWidth
              margin="dense"
            >
              <MenuItem value="DRAFT">DRAFT</MenuItem>
              <MenuItem value="PUBLISHED">PUBLISHED</MenuItem>
            </TextField> */}
          </>
        )}
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
          {loading ? "Đang cập nhật..." : "Cập nhật Blog"}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
