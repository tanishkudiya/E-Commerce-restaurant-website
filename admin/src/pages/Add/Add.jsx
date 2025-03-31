import React, { useState } from "react";
import "./Add.css";
import { Upload } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

const Add = ({url}) => {

  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Salad",
  });

  const onChangeHandler = (event) => {
    const { name, value } = event.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(file); // Store the actual file
      setPreviewImage(URL.createObjectURL(file)); // Store preview for UI
    }
  };

  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image); // Send actual file

    try {
      const response = await axios.post(`${url}/api/food/add`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data.success) {
        setData({ name: "", description: "", price: "", category: "Salad" });
        setImage(null);
        setPreviewImage(null);
        toast.success(response.data.message);
      } else {
        toast.error("Failed to Add Product")
      }
    } catch (error) {
      console.error("Error uploading:", error);
      toast.error(response.data.message);
    }
  };

  return (
    <div className="add">
      <form className="form-container" onSubmit={onSubmitHandler}>
        {/* Image Upload Section */}
        <div className="add-img-upload">
          <p>Upload Image</p>
          <label htmlFor="image" className="upload-label">
            {previewImage ? (
              <img src={previewImage} alt="Preview" className="image-preview" />
            ) : (
              <>
                <Upload size={24} />
                <span>Choose an image</span>
              </>
            )}
          </label>
          <input type="file" id="image" hidden required onChange={handleImageChange} />
        </div>

        {/* Product Name */}
        <div className="input-group">
          <p>Product Name:</p>
          <input onChange={onChangeHandler} value={data.name} type="text" name="name" placeholder="Enter product name" required />
        </div>

        {/* Product Description */}
        <div className="input-group">
          <p>Product Description:</p>
          <textarea onChange={onChangeHandler} value={data.description} name="description" placeholder="Describe the dish..." required />
        </div>

        {/* Category & Price Section */}
        <div className="category-price-container">
          <div className="input-group">
            <p>Category:</p>
            <select onChange={onChangeHandler} name="category">
              <option value="Salad">Salad</option>
              <option value="Pasta">Pasta</option>
              <option value="Burger">Burger</option>
              <option value="Pizza">Pizza</option>
              <option value="Drinks">Drinks</option>
              <option value="Cake">Cake</option>
              <option value="Noodles">Noodles</option>
            </select>
          </div>

          <div className="input-group">
            <p>Price:</p>
            <input onChange={onChangeHandler} value={data.price} type="number" name="price" placeholder="Enter price" required />
          </div>
        </div>

        {/* Submit Button */}
        <button type="submit" className="add-btn">Add Product</button>
      </form>
    </div>
  );
};

export default Add;
