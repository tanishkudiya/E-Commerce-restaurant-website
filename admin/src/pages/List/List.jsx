import React, { useEffect, useState } from "react";
import "./List.css";
import axios from "axios";
import { toast } from "react-toastify";

const List = ({url}) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${url}/api/food/list`);

      if (response.data.success) {
        setList(response.data.data);
      } else {
        toast.error("Failed to fetch food list");
      }
    } catch (error) {
      toast.error("Error fetching data. Please try again later.");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  const removeFood = async(foodId)=>{
    const response = await axios.post(`${url}/api/food/remove`, {id:foodId});
    await fetchList();

    if(response.data.success){
      toast.success(response.data.message);
    }
    else{
      toast.error("Error");
    }
  }

  return (
    <div className="list-container">
      <h2>All Food List</h2>
      <div className="list-table">
        {/* Table Header */}
        <div className="list-table-format title">
          <b>Image</b>
          <b>Name</b>
          <b>Description</b>
          <b>Category</b>
          <b>Price</b>
          <b>Action</b>
        </div>

        {/* Table Data */}
        {list.length > 0 ? (
          list.map((item, index) => (
            <div key={index} className="list-table-format">
              <img src={`${url}/images/${item.image}`} alt={item.name} />
              <p>{item.name}</p>
              <p className="desc">{item.description}</p>
              <p>{item.category}</p>
              <p>₹{item.price}</p>
              <span onClick={()=>removeFood(item._id)} className="delete-btn">X</span>
            </div>
          ))
        ) : (
          <p className="empty-message">No food items available</p>
        )}
      </div>
    </div>
  );
};

export default List;
