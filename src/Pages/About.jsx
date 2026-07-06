import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../CSS/About.css";

export default function About() {

  const navigate = useNavigate();

  const stars = [

    {
      name:"Karan Aujla",
      profession:"Punjabi Singer",
      image:"https://media.insider.in/image/upload/c_crop,g_custom/v1756999925/m6gmdpmfdnpsrri6synm.png"
    },

    {
      name:"Arijit Singh",
      profession:"Playback Singer",
      image:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a"
    },

    {
      name:"Shreya Ghoshal",
      profession:"Singer",
      image:"https://images.unsplash.com/photo-1503095396549-807759245b35"
    },

    {
      name:"Zakir Khan",
      profession:"Stand-up Comedian",
      image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43d"
    },

    {
      name:"AP Dhillon",
      profession:"Music Artist",
      image:"https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
    },

    {
      name:"Alan Walker",
      profession:"DJ & Producer",
      image:"https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
    }

  ];


  const reviews=[

    {
      name:"Aisha",
      city:"Mumbai",
      msg:"Best concert experience of my life ❤️"
    },

    {
      name:"Rahul",
      city:"Delhi",
      msg:"Karan Aujla live was absolutely insane 🔥"
    },

    {
      name:"Megha",
      city:"Pune",
      msg:"PRO NIGHT never disappoints 🎵"
    }

  ];


  return (

    <>

    <div className="aboutPage">

      {/* HERO */}

      <section className="aboutHero">

        <div className="aboutOverlay">

          <h1>
            WE DON'T ORGANIZE EVENTS
          </h1>

          <h2>
            WE CREATE MEMORIES
          </h2>

          <p>
            Lights. Music. Celebrities.
            One unforgettable experience.
          </p>

          <button
            onClick={() => navigate("/events")}
          >
            Explore Events
          </button>

        </div>

      </section>



      {/* TIMELINE */}

      <section className="aboutTimeline">

        <h1>Our Journey</h1>

        <div className="timelineGrid">

          <div className="timelineCard">
            <h2>2024</h2>
            <p>Idea Born 💡</p>
          </div>

          <div className="timelineCard">
            <h2>2025</h2>
            <p>First Concert 🎤</p>
          </div>

          <div className="timelineCard">
            <h2>2026</h2>
            <p>50+ Events 🔥</p>
          </div>

          <div className="timelineCard">
            <h2>2027</h2>
            <p>10,000+ Fans ❤️</p>
          </div>

        </div>

      </section>



      {/* STARS */}

      <section className="aboutStars">

        <h1>⭐ Meet The Legends</h1>

        <div className="starsContainer">

          {

            stars.map((star,index)=>(

              <div className="starCard" key={index}>

                <img
                  src={star.image}
                  alt={star.name}
                />

                <div className="starInfo">

                  <h2>{star.name}</h2>

                  <p>{star.profession}</p>

                </div>

              </div>

            ))

          }

        </div>

      </section>




      {/* STATS */}

      <section className="aboutStats">

        <div className="statCard">

          <h1>50+</h1>

          <p>Events</p>

        </div>


        <div className="statCard">

          <h1>10K+</h1>

          <p>Tickets Sold</p>

        </div>


        <div className="statCard">

          <h1>20+</h1>

          <p>Artists</p>

        </div>


        <div className="statCard">

          <h1>15+</h1>

          <p>Cities</p>

        </div>

      </section>





      {/* REVIEWS */}

      <section className="aboutReviews">

        <h1>❤️ Fan Love</h1>

        <div className="reviewGrid">

          {

            reviews.map((r,index)=>(

              <div className="reviewCard" key={index}>

                <h3>
                  ⭐⭐⭐⭐⭐
                </h3>

                <p>

                  "{r.msg}"

                </p>

                <h4>

                  {r.name}

                </h4>

                <span>

                  {r.city}

                </span>

              </div>

            ))

          }

        </div>

      </section>






      {/* CTA */}

      <section className="aboutCTA">

        <h1>

          YOUR NEXT STORY

          <br />

          STARTS HERE

        </h1>


        <button

          onClick={() => navigate("/events")}

        >

          Join The Experience

        </button>

      </section>


    </div>


    <Footer/>

    </>

  );

}