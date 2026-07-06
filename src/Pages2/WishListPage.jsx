import { useEffect, useState } from "react";
import axios from "axios";
import "../CSS/WishList.css";

export default function WishListPage() {

  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {

    const token = localStorage.getItem("token");

    try {

      const response = await axios.get(

        "http://localhost:8080/wishlist/my",

        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }

      );

      setWishlist(response.data);

    }

    catch(error){

      console.log(error);

    }

  };

  const removeWishlist = async (eventId) => {

    const token = localStorage.getItem("token");

    try {

      await axios.delete(

        `http://localhost:8080/wishlist/remove/${eventId}`,

        {
          headers:{
            Authorization:`Bearer ${token}`
          }
        }

      );

      fetchWishlist();

    }

    catch(error){

      console.log(error);

      alert("Remove failed");

    }

  };

  useEffect(() => {

    fetchWishlist();

  }, []);

  return (

    <div className="wishlist-page">

      <h1>❤️ My Wishlist</h1>

      <div className="wishlist-grid">

        {wishlist.length > 0 ? (

          wishlist.map((item) => (

            <div
              className="wishlist-card"
              key={item.wishlistId}
            >

              <img
                src={item.event.imageUrl}
                alt={item.event.title}
              />

              <h3>{item.event.title}</h3>

              <p>📍 {item.event.city}</p>

              <p>📅 {item.event.eventDate}</p>

              <button
                onClick={() =>
                  removeWishlist(item.event.eventId)
                }
              >
                Remove
              </button>

            </div>

          ))

        ) : (

          <h3>Your wishlist is empty ❤️</h3>

        )}

      </div>

    </div>

  );

}