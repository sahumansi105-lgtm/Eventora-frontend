import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Footer from "../Components/Footer";
import "../CSS/Explore.css";

export default function Explore() {

const navigate = useNavigate();

const [trending,setTrending]=useState([]);

const [upcoming,setUpcoming]=useState([]);

const [cityEvents,setCityEvents]=useState([]);

const cities=[

"Mumbai",

"Delhi",

"Pune",

"Bangalore",

"Hyderabad",

"Ahmedabad"

];

const artists=[

{
name:"Karan Aujla",
profession:"Punjabi Singer",
image:"https://media.insider.in/image/upload/c_crop,g_custom/v1756999925/m6gmdpmfdnpsrri6synm.png"
},

{
name:"Arijit Singh",
profession:"Playback Singer",
image:"https://wallpapercave.com/wp/wp10669416.jpg"
},

{
name:"AP Dhillon",
profession:"Music Artist",
image:"https://wallpapercave.com/wp/wp10832257.jpg"
},

{
name:"Shreya Ghoshal",
profession:"Singer",
image:"https://wallpapercave.com/wp/wp6738128.jpg"
},

{
name:"Zakir Khan",
profession:"Stand Up Comedian",
image:"https://wallpapercave.com/wp/wp12862531.jpg"
},

{
name:"Alan Walker",
profession:"DJ",
image:"https://wallpapercave.com/wp/wp6453075.jpg"
}

];


useEffect(()=>{

fetchTrending();

fetchUpcoming();

fetchCity("Mumbai");

},[]);



const fetchTrending=async()=>{

const res=await axios.get(

"http://localhost:8080/events/trending"

);

setTrending(res.data);

};



const fetchUpcoming=async()=>{

const res=await axios.get(

"http://localhost:8080/events/upcoming"

);

setUpcoming(res.data);

};



const fetchCity=async(city)=>{

const res=await axios.get(

`http://localhost:8080/events/city/${city}`

);

setCityEvents(res.data);

};




return(

<>

<div className="explorePage">


{/* HERO */}

<section className="exploreHero">

<h1>

DISCOVER

THE BEST NIGHTS

✨

</h1>

<p>

Concerts.

DJ Nights.

Comedy Shows.

Celebrity Experiences.

</p>

</section>




{/* ARTISTS */}

<section className="exploreArtists">

<h1>⭐ Popular Artists</h1>

<div className="artistSlider">

{

artists.map((artist,index)=>(

<div className="artistCard"

key={index}

>

<img src={artist.image}/>

<div className="artistInfo">

<h2>{artist.name}</h2>

<p>{artist.profession}</p>

</div>

</div>

))

}

</div>

</section>




{/* TRENDING */}

<section className="exploreTrending">

<h1>🔥 Trending Events</h1>

<div className="eventGrid">

{

trending.map(event=>(

<div className="eventCard"

key={event.eventId}

>

<img src={event.imageUrl}/>

<h2>{event.title}</h2>

<p>{event.city}</p>

<button

onClick={()=>

navigate(

`/events/${event.eventId}`

)

}

>

View Event

</button>

</div>

))

}

</div>

</section>





{/* CITIES */}

<section className="exploreCities">

<h1>📍 Explore By City</h1>

<div className="cityButtons">

{

cities.map(city=>(

<button

key={city}

onClick={()=>fetchCity(city)}

>

{city}

</button>

))

}

</div>



<div className="eventGrid">

{

cityEvents.map(event=>(

<div className="eventCard"

key={event.eventId}

>

<img src={event.imageUrl}/>

<h2>{event.title}</h2>

<p>{event.city}</p>

<button

onClick={()=>

navigate(

`/events/${event.eventId}`

)

}

>

Book Now

</button>

</div>

))

}

</div>

</section>





{/* UPCOMING */}

<section className="exploreUpcoming">

<h1>🎫 Upcoming Events</h1>

<div className="eventGrid">

{

upcoming.map(event=>(

<div className="eventCard"

key={event.eventId}

>

<img src={event.imageUrl}/>

<h2>{event.title}</h2>

<p>{event.eventDate}</p>

<button

onClick={()=>

navigate(

`/events/${event.eventId}`

)

}

>

Book Tickets

</button>

</div>

))

}

</div>

</section>



</div>

<Footer/>

</>

)

}