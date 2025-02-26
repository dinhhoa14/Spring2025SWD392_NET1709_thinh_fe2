import { useEffect, useState } from 'react';
import { blogService } from '@src/services/blogService.js';
import { Link, useNavigate } from 'react-router-dom';
import routes from '@src/router/index.js';

export default function BlogSection() {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await blogService.getBlogSection();
        setBlogs(response.content);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, []);

  const handleBlogClick = (id) => {
    navigate(routes.blogDetail.replace(':id', id));
  };

  const mainBlog = blogs[0];
  const otherBlogs = blogs.slice(1, 4);

  return (
    <div className="container mx-auto py-8">
        <div className="flex justify-center items-center gap-4 mb-8">
        <h1 className="text-3xl font-bold">Thông tin về Trung tâm tiêm chủng Nhân Ái</h1>
        <div className="h-6 w-1 bg-gray-400"></div>
        <Link to={routes.blog} className="text-blue-600 hover:underline text-lg font-semibold">
          Xem tất cả
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Cột lớn chứa 1 bài blog */}
        <div className="col-span-1 lg:col-span-2 flex flex-col h-full">
          {mainBlog && (
            <div className="bg-white p-6 rounded-lg shadow-lg flex-grow cursor-pointer" onClick={() => handleBlogClick(mainBlog.blogId)}>
              <img
                src={mainBlog.image}
                alt={mainBlog.title}
                className="w-full h-64 object-cover rounded-lg mb-4"
              />
              <h2 className="text-2xl font-bold mb-4">{mainBlog.title}</h2>
            </div>
          )}
        </div>

        {/* Cột nhỏ chứa 3 bài blog, hiển thị ảnh bên trái và title bên phải */}
        <div className="col-span-1 lg:col-span-2 flex flex-col gap-4">
          {otherBlogs.map((blog) => (
            <div key={blog.id} className="bg-white p-4 rounded-lg shadow-lg flex items-center gap-4 cursor-pointer" onClick={() => handleBlogClick(blog.blogId)}>
              <img
                src={blog.image } 
                alt={blog.title}
                className="w-28 h-28 object-cover rounded-lg"
              />
              <h3 className="text-lg font-semibold flex-1">{blog.title}</h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
