import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import EventCard from "../Components/EventCard";
import "../CSS/Event.css";

function Events() {

  const [searchParams] = useSearchParams();
  const [events, setEvents] = useState([]);
  const [filter, setFilter] = useState("ALL");
  const [loading, setLoading] = useState(true);
  const [wishlist, setWishlist] = useState([]);
  const searchTerm = (searchParams.get("search") || "").trim().toLowerCase();

  const categories = [
    "ALL",
    "DJ Night",
    "Concert",
    "EDM Festival",
    "Music Night",
    "Live Concert",
    "Garba Night",
    "Music Festival"
  ];

  const onWishlistToggle = async (event) => {

  const token = localStorage.getItem("token");

  if(!token){
    alert("Please login first");
    return;
  }

  try{

    await axios.post(
   `http://localhost:8080/wishlist/add/${event.eventId}`,
   {},
   {
      headers:{
         Authorization:`Bearer ${token}`
      }
   }
);

    alert("Added to wishlist");

    fetchWishlist();

  }

  catch(error){

    console.log(error);

    alert("Wishlist failed");

  }

}

const fetchWishlist = async () => {

 const token = localStorage.getItem("token");

 const response = await axios.get(

   "http://localhost:8080/wishlist/my",

   {
      headers:{
        Authorization:`Bearer ${token}`
      }
   }

 );

 setWishlist(response.data);

}

useEffect(()=>{

 fetchEvents();

 if(localStorage.getItem("token")){
    fetchWishlist();
 }

},[]);

  const fetchEvents = async () => {

    try {

      const response = await axios.get(
        "http://localhost:8080/events"
      );

      setEvents(response.data);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }
  };

  const filteredEvents = events.filter((event) => {
    const matchesCategory = filter === "ALL" || event.category === filter;
    const matchesSearch =
      !searchTerm ||
      `${event.title || ""} ${event.city || ""} ${event.venue || ""} ${event.category || ""} ${event.artistName || ""}`
        .toLowerCase()
        .includes(searchTerm);

    return matchesCategory && matchesSearch;
  });

  if (loading) {

    return (
      <h2 className="loading">
        Loading Events...
      </h2>
    );

  }

  return (

    <div className="events-page">

      {/* HERO */}

      <section className="hero-section">

        <div className="hero-overlay">

          <h1>
            Discover Amazing Events
          </h1>

          <p>
            Book passes for concerts,
            DJ nights, celebrity shows
            and festivals.
          </p>

        </div>

      </section>


      {/* FILTER */}

      <section className="filter-wrapper">

        <div className="filter-section">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => setFilter(category)}
              className={
                filter === category
                  ? "active-filter"
                  : ""
              }
            >

              {category}

            </button>

          ))}

        </div>

      </section>


      {/* ALL EVENTS */}

      <section className="section">

        <h2>🎫 All Events</h2>

        <div className="events-grid">

          {filteredEvents.length > 0 ? (

            filteredEvents.map((event) => (

<EventCard

   key={event.eventId}

   event={event}

   onWishlistToggle={onWishlistToggle}

   isWishlisted={

      wishlist.some(

         item => item?.event?.eventId === event.eventId

      )

   }

/>

            ))

          ) : (

            <h3>No Events Found</h3>

          )}

        </div>

      </section>

    </div>

  );

}

export default Events;
