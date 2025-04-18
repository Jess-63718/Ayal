import { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../../components/Navbar"
import { ToastContainer, toast } from 'react-toastify';
import { FaLocationArrow } from "react-icons/fa";

const ResidentServices = () => {
  const [workers, setWorkers] = useState([]);
  const [selectedWorker, setSelectedWorker] = useState(null);
  const [service, setService] = useState("");
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  const [location, setLocation] = useState(null);
  useEffect(() => {
    
    // Function to get location
    const getLocation = () => {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (err) => {
            setError(err.message);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };
  
    getLocation(); // Call function on component mount
  }, []);

  useEffect(() => {
    axios.get("http://localhost:5000/api/bookings/workers?role=Worker") // Fetch workers
      .then(res => setWorkers(res.data))
      .catch(err => console.error(err));
  }, []);

  const handleBooking = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log(localStorage.getItem("token"))
      const res = await axios.post("http://localhost:5000/api/bookings", {
        workerId: selectedWorker._id,
        service
      }, { headers: { Authorization: token} });

      toast.success("Booking Request Sent!");
      setShowModal(false);
    } catch (error) {
      toast.error("Error booking service");
    }
  };

  return (
    <div className=" bg-gradient-to-r from-sky-200 to-green-100  min-h-screen">
      <Navbar/>
      <ToastContainer/>
      <h1 className="text-5xl text-center font-bold pt-10 mb-4">Workers & Services</h1>

      {/* Worker List */}
      <div className=" w-fit justify-self-center my-10">
        {workers.length === 0 ? <p>No workers available.</p> : workers.map(worker => (
          <div key={worker._id} className="bg-white/50 mb-10 p-4 shadow-lg rounded-lg">
            <div className="flex justify-between"><h3 className="font-bold">{worker.name}</h3> { worker.nearby ? (<> <p className="bg-green-400/40 rounded-md p-2 flex gap-1"> <FaLocationArrow className="my-auto"/> Nearby</p>  </>):(<></>)}  </div>
            <p>
  <b>Email : </b>
  <a href={`mailto:${worker.email}`} className="text-blue-600 hover:underline">
    {worker.email}
  </a>
</p>
            <p><b>Shop Address : </b>{worker.shop}</p>
            <p><b>Phone Number : </b>{worker.phone}</p>
            <p><b>Services: </b>{worker.services.map((service, index) => (
  <span key={index}>{service.name}{index !== worker.services.length - 1 ? ", " : ""}</span>
))}</p>

            <button onClick={() => { setSelectedWorker(worker); setShowModal(true); }} className="bg-blue-500/60 hover:bg-sky-500 transition-all duration-300 text-white px-4 py-2 mt-2 rounded">
              Book Service
            </button>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-md">
          <div className="bg-white/40 p-6 rounded shadow-lg w-96">
            <h2 className="text-lg font-bold mb-4">Book {selectedWorker.name}</h2>
            <select
  className="w-full p-2 border mb-2 rounded bg-white/60 shadow-sm"
  value={service}
  onChange={(e) => setService(e.target.value)} // ✅ Now storing only the service name
  required
>
  <option value="">Select a service</option>
  {selectedWorker.services.map((service, index) => (
    <option key={index} value={service.name}>{service.name} - ₹{service.price} - {service.availableTimes}</option> // ✅ Now passing only service name
  ))}
</select>
            <div className="flex justify-end">
              <button onClick={() => setShowModal(false)} className="bg-gray-400 text-white px-4 py-2 rounded mr-2">Cancel</button>
              <button onClick={handleBooking} className="bg-green-500 text-white px-4 py-2 rounded">Book</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResidentServices;
