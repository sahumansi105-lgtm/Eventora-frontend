import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../CSS/UserDashboard.css";

export default function UserDashboard() {

  const [user, setUser] = useState(null);

  const [bookings, setBookings] = useState([]);

  const [wishlist, setWishlist] = useState([]);

  const navigate = useNavigate();


  // ================= RECOMMENDED EVENTS =================

  const recommended = Array.from(

    new Map(

      wishlist.map((item) => [

        item.event.eventId,

        item.event

      ])

    ).values()

  );


  // ================= AUTH HEADER =================

  const getConfig = () => {

    const token = localStorage.getItem("token");

    return {

      headers: {

        Authorization: `Bearer ${token}`

      }

    };

  };


  // ================= PROFILE =================

  const fetchProfile = async () => {

    try {

      const response = await axios.get(

        "http://localhost:8080/users/profile",

        getConfig()

      );

      setUser(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };


  // ================= BOOKINGS =================

  const fetchBookings = async () => {

    try {

      const response = await axios.get(

        "http://localhost:8080/bookings/my",

        getConfig()

      );

      setBookings(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };


  // ================= WISHLIST =================

  const fetchWishlist = async () => {

    try {

      const response = await axios.get(

        "http://localhost:8080/wishlist/my",

        getConfig()

      );

      setWishlist(response.data);

    }

    catch (error) {

      console.log(error);

    }

  };


  useEffect(() => {

    if (localStorage.getItem("token")) {

      fetchProfile();

      fetchBookings();

      fetchWishlist();

    }

  }, []);



  if (!user) {

    return <h2>Loading...</h2>;

  }


  const totalSpent = bookings.reduce(

    (sum, booking) =>

      sum + (booking.totalAmount || 0),

    0

  );

  const latestBooking = bookings[0];
  const upcomingEvent = latestBooking?.pass?.event;


  return (

    <div className="ud-dashboard">


      {/* HERO */}

      <div className="ud-hero">

        <div>

          <h1>

            Hello, {user.fullName} 👋

          </h1>

          <p>

            Ready for your next ProNight experience?

          </p>

        </div>

      </div>



      {/* STATS */}

      <div className="ud-stats-grid">

        <div className="ud-stat-card">

          <h1>{bookings.length}</h1>

          <p>🎫 Total Bookings</p>

        </div>


        <div className="ud-stat-card">

          <h1>{wishlist.length}</h1>

          <p>❤️ Wishlist</p>

        </div>


        <div className="ud-stat-card">

          <h1>₹{totalSpent}</h1>

          <p>💰 Total Spent</p>

        </div>


        <div className="ud-stat-card">

          <h1>{user.loyaltyPoints}</h1>

          <p>🏆 Loyalty Points</p>

        </div>

      </div>



      {/* MEMBERSHIP + UPCOMING */}

      <div className="ud-grid">


        <div className="ud-reward">

          <h2>🏆 Membership Progress</h2>

          <h3>

            {user.membership_level || user.membershipLevel}

          </h3>

          <p>

            {user.loyaltyPoints} / 500 Points

          </p>

          <div className="progress">

            <div

              className="progress-fill"

              style={{

                width:

                  `${(user.loyaltyPoints / 500) * 100}%`

              }}

            >

            </div>

          </div>

        </div>



        <div className="ud-upcoming">

          <h2>🎫 Upcoming Event</h2>

          {

            latestBooking ?

              (

                <>

                  <img

                    src={

                      upcomingEvent?.imageUrl ||

                      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"

                    }

                    alt={upcomingEvent?.title || "ProNight Event"}

                    className="upcoming-img"

                  />

                  <h3>

                    {upcomingEvent?.title || "ProNight Event"}

                  </h3>

                  <p>

                    Pass: {latestBooking.pass?.passName || latestBooking.pass?.passType}

                  </p>

                  <p>

                    City: {upcomingEvent?.city || "Venue will be updated"}

                  </p>

                  <p>

                    Date: {upcomingEvent?.eventDate || "Date will be updated"}

                  </p>

                  <button>

                    View Ticket

                  </button>

                </>

              )

              :

              (

                <p>No Bookings Yet</p>

              )

          }

        </div>



        <div className="ud-activity">

          <h2>⚡ Recent Activity</h2>

          <ul>

            <li>

              🎟 Total Bookings : {bookings.length}

            </li>

            <li>

              ❤️ Wishlist Items : {wishlist.length}

            </li>

            <li>

              🏆 Points : {user.loyaltyPoints}

            </li>

          </ul>

        </div>


      </div>



      {/* RECOMMENDED EVENTS */}

      <div className="ud-recommendations">

        <h2>🔥 Recommended For You</h2>

        {

          recommended.length > 0 ?

            (

              <div className="recommend-grid">

                {

                  recommended.slice(0, 3).map((event) => (

                    <div

                      className="ud-recommend-card"

                      key={event.eventId}

                    >

                      <img

                        src={

                          event.imageUrl ||

                          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"

                        }

                        alt={event.title}

                      />

                      <h3>{event.title}</h3>

                      <p>

                        📍 {event.city}

                      </p>

                      <button

                        onClick={() =>

                          navigate(`/events/${event.eventId}`)

                        }

                      >

                        Book Now

                      </button>

                    </div>

                  ))

                }

              </div>

            )

            :

            (

              <p>

                No recommendations yet.

              </p>

            )

        }

      </div>



      {/* RECENT WISHLIST */}

      <div className="ud-wishlist">


        <div className="wishlist-header">

          <h2>

            ❤️ Recent Wishlist

          </h2>

          <button

            className="view-all-btn"

            onClick={() =>

              navigate("/wishlist")

            }

          >

            View All

          </button>

        </div>



        {

          wishlist.length > 0 ?

            (

              wishlist

                .slice(0, 3)

                .map((item) => (

                  <div

                    key={item.wishlistId}

                    className="ud-wishlist-item"

                  >

                    <img

                      src={

                        item.event.imageUrl ||

                        "https://images.unsplash.com/photo-1501386761578-eac5c94b800a"

                      }

                      alt={item.event.title}

                      className="wishlist-img"

                    />

                    <div>

                      <h4>

                        {item.event.title}

                      </h4>

                      <p>

                        📍 {item.event.city}

                      </p>

                      <p>

                        📅 {item.event.eventDate}

                      </p>

                    </div>

                  </div>

                ))

            )

            :

            (

              <p>

                Wishlist Empty ❤️

              </p>

            )

        }


      </div>


    </div>

  );

}
