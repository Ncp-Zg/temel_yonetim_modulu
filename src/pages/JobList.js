import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Container } from "react-bootstrap";
import JobCard from "../components/JobCard";
import { useDispatch } from "react-redux";
import { all_jobs } from "../redux/features/jobSlice";

const JobList = () => {
  const socket = useRef();

  const dispatch = useDispatch();

  const [jobs, setJobs] = useState([]);
  console.log(jobs);

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
        setJobs(data);
        dispatch(all_jobs(data));
      });
  }, [socket.current]);

  useEffect(() => {
    socket.current &&
      socket.current.on("jobList", (data) => {
        setJobs(data);
        dispatch(all_jobs(data));
      });
  }, [socket.current]);

  useEffect(() => {
    socket.current &&
      socket.current.on("updatedJobList", (data) => {
        setJobs(data);
        dispatch(all_jobs(data));
      });
  }, [socket.current]);

  return (
    <div className="d-flex flex-column">
      <div className="d-flex align-items-center justify-content-center">
      <h1 className="">JOB LIST</h1>
    
      </div>
      <Container className="d-flex flex-wrap justify-content-evenly">
        {jobs?.map((job) => (
          <JobCard job={job} key={job._id} />
        ))}
      </Container>
    </div>
  );
};

export default JobList;
