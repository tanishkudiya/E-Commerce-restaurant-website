import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import './ExploreMenu.css'

const menuItems = [
    {
        name: "Margherita Pizza",
        image: "https://plus.unsplash.com/premium_photo-1661762555601-47d088a26b50?q=80&w=2092&auto=format&fit=crop",
    },
    {
        name: "Cheeseburger",
        image: "https://plus.unsplash.com/premium_photo-1675864532183-8f37e8834db5?q=80&w=1974&auto=format&fit=crop",
    },
    {
        name: "Pasta Carbonara",
        image: "https://images.unsplash.com/photo-1579631542720-3a87824fff86?q=80&w=1964&auto=format&fit=crop",
    },
    {
        name: "Ice Cream Sundae",
        image: "https://images.unsplash.com/photo-1514849302-984523450cf4?q=80&w=2080&auto=format&fit=crop",
    },
    {
        name: "Sushi Platter",
        image: "https://images.unsplash.com/photo-1663334038419-71e6f82e333f?q=80&w=2039&auto=format&fit=crop",
    },
    {
        name: "Green Tea",
        image: "https://images.unsplash.com/photo-1627435601361-ec25f5b1d0e5?q=80&w=2070&auto=format&fit=crop",
    },
    {
        name: "Chocolate Cake",
        image: "https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=2000&auto=format&fit=crop",
    },
    {
        name: "Strawberry Milkshake",
        image: "https://plus.unsplash.com/premium_photo-1695927469061-4c307d53c7a5?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Chicken Biryani",
        image: "https://images.unsplash.com/photo-1631515243349-e0cb75fb8d3a?q=80&w=2088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Tacos",
        image: "https://images.unsplash.com/photo-1565299507177-b0ac66763828?q=80&w=2000&auto=format&fit=crop",
    },
    {
        name: "Grilled Salmon",
        image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "French Fries",
        image: "https://plus.unsplash.com/premium_photo-1672774750509-bc9ff226f3e8?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Mojito",
        image: "https://plus.unsplash.com/premium_photo-1722194069219-16ec49c08625?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Lasagna",
        image: "https://images.unsplash.com/photo-1574894709920-11b28e7367e3?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
        name: "Blueberry Pancakes",
        image: "https://plus.unsplash.com/premium_photo-1692193552327-3458ef3817c0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
];

const ExploreMenu = ({category, setCategory}) => {
    return (
        <div className="container">
            <h1 className="menu-title">🍽️ Explore Our Menu</h1>
            <p className="menu-text">Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus quis iste dicta, inventore itaque harum dolor, quae distinctio vero tempore molestiae iure dolorum commodi error praesentium adipisci quas reiciendis aperiam. Consectetur quibusdam blanditiis alias sapiente ea a aspernatur aperiam minima. ipsum dolor sit amet consectetur adipisicing elit. Voluptas molestiae, magni illum illo nisi quibusdam, necessitatibus ab odio quam nesciunt, vero iste laborum blanditiis totam?</p>
            <div className="menu-list">
                {menuItems.map((item, index) => (
                    <div onClick={()=>setCategory(prev=>prev===item.name?"All":item.name)} key={index} className="menu-item">
                        <img className={category===item.name?"active":""} src={item.image} alt={item.name} id="menu-image" />
                        <p className="menu-name">{item.name}</p>
                    </div>
                ))}
            </div>
            <hr />
        </div>
    );
};


export default ExploreMenu;
