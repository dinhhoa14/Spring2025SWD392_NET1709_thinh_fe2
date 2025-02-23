import { useState, useEffect } from "react";
import { Card, CardContent, Typography, Grid, Pagination, CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";  
import { blogService } from "@src/services/blogService.js";

export default function Blog() {
  const [blogs, setBlogs] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      setLoading(true);
      try {
        const response = await blogService.getAllBlog(page);
        console.log(response);
        setBlogs(response.content);
        setTotalPages(response.pageable.totalPages);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [page]);

  const handleBlogClick = (id) => {
    navigate(`/blog/detail/${id}`);
  };

  return (
    <div className="container mx-auto px-[10rem] py-4">
      {loading ? (
        <div className="flex h-screen items-center justify-center text-2xl">
          <CircularProgress size="6rem" />
        </div>
      ) : (
        <>
          <Grid container spacing={4}>
            {blogs.map((blog) => (
              <Grid item xs={12} key={blog.id}>
                <Card onClick={() => handleBlogClick(blog.id)} className="cursor-pointer">
                  <Grid container>
                    {/* Image section */}
                    <Grid item xs={5} className="h-64 bg-gray-300">
                      <img 
                        src="https://cdn.nhathuoclongchau.com.vn/unsafe/1440x0/filters:quality(90)/https://cms-prod.s3-sgn09.fptcloud.com/sau_khi_tiem_vac_xin_bao_lau_thi_duoc_mang_thai_giai_dap_chi_tiet_2_b92700b13b.png" 
                        alt={blog.title} 
                        className="object-cover w-full h-full"
                      />
                    </Grid>

                    {/* Title section */}
                    <Grid item xs={7}>
                      <CardContent>
                        <Typography variant="h6" gutterBottom>
                          {blog.title}
                        </Typography>
                      </CardContent>
                    </Grid>
                  </Grid>
                </Card>
              </Grid>
            ))}
          </Grid>

          {/* Pagination */}
          <div className="flex justify-center mt-4">
            <Pagination
              count={totalPages}
              page={page}
              onChange={(event, value) => setPage(value)}
              color="primary"
            />
          </div>
        </>
      )}
    </div>
  );
}
