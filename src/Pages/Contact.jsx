import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Footer from "../Components/Footer";
import "../CSS/Contact.css";

export default function Contact() {

  const [contact, setContact] = useState({

    fullName: "",

    email: "",

    phone: "",

    subject: "",

    message: ""

  });

  const [errors, setErrors] = useState({});



  const handleChange = (e) => {

    setContact({

      ...contact,

      [e.target.name]: e.target.value

    });

  };



  const validate = () => {

    let err = {};

    if(contact.fullName.trim().length < 3){

      err.fullName="Enter valid full name";

    }

    const emailRegex=/^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(contact.email)){

      err.email="Invalid email";

    }

    const phoneRegex=/^[0-9]{10}$/;

    if(!phoneRegex.test(contact.phone)){

      err.phone="Enter 10 digit phone";

    }

    if(contact.subject.trim().length<5){

      err.subject="Minimum 5 characters";

    }

    if(contact.message.trim().length<20){

      err.message="Minimum 20 characters";

    }

    setErrors(err);

    return Object.keys(err).length===0;

  };



  const handleSubmit=async(e)=>{

    e.preventDefault();

    if(!validate()) return;

    try{

      await axios.post(

        "http://localhost:8080/contact",

        contact

      );

      toast.success(

      "🎉 Thanks! Our team will contact you soon."

      );



      setContact({

        fullName:"",

        email:"",

        phone:"",

        subject:"",

        message:""

      });



      setErrors({});



    }

    catch(error){

      toast.error(

      "Something went wrong"

      );

    }

  };



  return (

    <>

    <div className="contactPage">

      <div className="contactContainer">



        {/* LEFT */}



        <div className="contactLeft">



          <h1>

            Let's Create

            Something Amazing ✨

          </h1>



          <p>

            Planning a concert?

            Celebrity appearance?

            DJ Night?

            Brand Event?

            We'd love to hear from you.

          </p>



          <div className="contactInfoCard">

            <h3>📧 Email Us</h3>

            <p>

              support@pronight.com

            </p>

          </div>



          <div className="contactInfoCard">

            <h3>📞 Call Us</h3>

            <p>

              +91 98765 43210

            </p>

          </div>



          <div className="contactInfoCard">

            <h3>📍 Location</h3>

            <p>

              Mumbai, Maharashtra

            </p>

          </div>



          <div className="contactInfoCard">

            <h3>⚡ Response Time</h3>

            <p>

              Within 24 Hours

            </p>

          </div>



        </div>





        {/* RIGHT */}



        <div className="contactBox">



          <h2>

            Register Your Query

          </h2>



          <form onSubmit={handleSubmit}>


            <input

            type="text"

            name="fullName"

            placeholder="Full Name"

            value={contact.fullName}

            onChange={handleChange}

            />

            {

            errors.fullName &&

            <span className="error">

            {errors.fullName}

            </span>

            }





            <input

            type="email"

            name="email"

            placeholder="Email"

            value={contact.email}

            onChange={handleChange}

            />

            {

            errors.email &&

            <span className="error">

            {errors.email}

            </span>

            }





            <input

            type="text"

            name="phone"

            placeholder="Phone"

            value={contact.phone}

            onChange={handleChange}

            />

            {

            errors.phone &&

            <span className="error">

            {errors.phone}

            </span>

            }





            <input

            type="text"

            name="subject"

            placeholder="Subject"

            value={contact.subject}

            onChange={handleChange}

            />

            {

            errors.subject &&

            <span className="error">

            {errors.subject}

            </span>

            }





            <textarea

            rows="6"

            name="message"

            placeholder="Tell us about your event..."

            value={contact.message}

            onChange={handleChange}

            />

            {

            errors.message &&

            <span className="error">

            {errors.message}

            </span>

            }





            <button>

            Send Message 🚀

            </button>



          </form>

        </div>



      </div>

    </div>



    <Footer/>

    </>

  );

}