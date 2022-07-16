
import NavbarComponent from "./components/NavbarComponent";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import JobUpdateRobot from "./pages/JobUpdateRobot";
import Home from "./pages/Home";
import JobCreate from "./pages/JobCreate";
import JobList from "./pages/JobList";
import {ToastContainer} from "react-toastify"
import { useEffect, useRef } from "react";
import { io } from "socket.io-client";
import { all_jobs } from "./redux/features/jobSlice";
import { useDispatch } from "react-redux";


function App() {

  const socket = useRef()
const dispatch = useDispatch()

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
    console.log("connect");
  }, []);

  useEffect(() => {
    socket.current && socket.current.emit("getJobs");
  }, []);

  useEffect(() => {
    socket.current &&
      socket.current.on("listJobs", (data) => {
        dispatch(all_jobs(data))
      });
  }, [socket.current]);


  return (
    <div>
      <Router>
      <NavbarComponent/>
      <ToastContainer/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/jobupdaterobot/:id" element={<JobUpdateRobot/>}/>
        <Route path="/jobcreate" element={<JobCreate/>}/>
        <Route path="/joblist" element={<JobList/>}/>
      </Routes>
      </Router>
      
    </div>
  );
}

export default App;
