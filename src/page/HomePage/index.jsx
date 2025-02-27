import Home from "../../container/Home/index.jsx";
import { fileToCloud } from "@utils/telerealm.js"; 
const HomePage = () => {

    const handleFileChange = async (event) => {
        const file = event.target.files[0];
        if (file) {
          try {
            console.log("Uploading file:", file);
            const response = await fileToCloud(file);
            console.log("File upload response:", response);
    
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      };

  return (
    <div className="">
    {/* test */}
      <input type="file" onChange={handleFileChange} />
        
      <Home />
    </div>
  );
};

export default HomePage;
