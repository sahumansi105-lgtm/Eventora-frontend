import { useState } from "react";
import "../CSS/Help.css";
import { useNavigate } from "react-router-dom";

export default function Help() {

  const [search, setSearch] = useState("");
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();


  const faqs = [
    {
      category:"Booking",
      question:"How can I book an event ticket?",
      answer:"Choose your favorite event, select your pass, enter booking details and complete payment. Your ticket will be generated after successful payment."
    },
    {
      category:"Payment",
      question:"What payment methods are available?",
      answer:"You can complete your payment using available online payment methods supported by the platform."
    },
    {
      category:"Ticket",
      question:"Where can I find my ticket?",
      answer:"Your ticket and QR code are available in your profile under My Bookings."
    },
    {
      category:"QR Entry",
      question:"How does QR code entry work?",
      answer:"Show your generated QR ticket at the event gate. The organizer will scan and verify your entry."
    },
    {
      category:"Cancellation",
      question:"Can I cancel my booking?",
      answer:"Cancellation depends on the event cancellation policy. Check your booking details for more information."
    },
    {
      category:"Account",
      question:"How can I update my profile?",
      answer:"Go to your profile page and update your personal information."
    }
  ];


  const filteredFAQ = faqs.filter(item =>
    item.question.toLowerCase().includes(search.toLowerCase())
  );


  return (

    <div className="help-page">


      <section className="help-header">

        <h1>
          How can we help you?
        </h1>

        <p>
          Find answers about booking, payments, tickets and events
        </p>


        <input
          type="text"
          placeholder="Search your question..."
          value={search}
          onChange={(e)=>setSearch(e.target.value)}
        />

      </section>



      <section className="help-categories">


        <div className="category-card">
          🎟️
          <h3>Booking</h3>
          <p>Ticket booking related help</p>
        </div>


        <div className="category-card">
          💳
          <h3>Payment</h3>
          <p>Payment and refund queries</p>
        </div>


        <div className="category-card">
          📱
          <h3>Tickets</h3>
          <p>QR ticket and entry help</p>
        </div>


        <div className="category-card">
          🎤
          <h3>Events</h3>
          <p>Event information</p>
        </div>


      </section>




      <section className="faq-section">

        <h2>
          Frequently Asked Questions
        </h2>


        {
          filteredFAQ.map((item,index)=>(

            <div className="faq-card" key={index}>


              <div 
                className="faq-question"
                onClick={()=>setOpen(open===index ? null:index)}
              >

                <span>
                  {item.question}
                </span>


                <b>
                  {open===index ? "−":"+"}
                </b>

              </div>



              {
                open===index &&

                <div className="faq-answer">

                  <small>
                    {item.category}
                  </small>

                  <p>
                    {item.answer}
                  </p>

                </div>
              }


            </div>

          ))
        }


      </section>




      <section className="support-box">

        <h2>
          Still need help?
        </h2>

        <p>
          Our support team is ready to assist you.
        </p>


       <button onClick={() => navigate("/contact")}>
  Contact Support
</button>


      </section>


    </div>

  );
}