import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar"

const ResidentServices = () => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [service, setService] = useState("");
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  const [bookings, setBookings] = useState([]);
 

  useEffect(() => {

    const token = localStorage.getItem("token");
    axios.get("http://localhost:5000/api/bookings/bookings", {
      headers: { Authorization: token }
    })
      .then(res => setBookings(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className=" bg-gradient-to-r from-sky-200 to-green-100 min-h-screen">
      <Navbar/>
      <h1 className="text-5xl text-center font-bold pt-10 mb-4">Your Bookings</h1>

      {/* Worker List */}
      <div className="w-1/4 text-center justify-self-center">
      {bookings.length === 0 ? <p>No bookings yet.</p> : bookings.map(booking => (
        <div key={booking._id} className="bg-white p-4 shadow-lg mb-4 rounded-lg">
          <p><strong>Service:</strong> {booking.service}</p>
          <p><strong>Worker Name   :</strong> {booking.worker.name}</p>
          <p><strong>Status:</strong> {booking.status}</p>
        </div>
      ))}
      </div>

      
    </div>
  );
};

export default ResidentServices;
