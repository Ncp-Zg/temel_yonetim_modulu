
import React, { useEffect, useRef, useState } from "react";
import { Container} from "react-bootstrap";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import FormComponent from "../components/FormComponent";

const JobUpdateRobot = () => {
  const [singleJob, setSingleJob] = useState();
  const [newTask, setNewTask] = useState({
    actionName: "",
    locationId: "",
  });
  const [submit, setSubmit] = useState(false);
  const params = useParams();
  const socket = useRef();
  const { job } = useSelector((state) => state);
  useEffect(() => {
    if (job.length !== undefined) {
      setSingleJob(job?.filter((jb) => jb._id === params.id)[0]);
    }
  }, [job]);
  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    if (submit) {
      console.log(singleJob);
      socket.current && socket?.current.emit("JobUpdate", singleJob);
      toast.success("job is updated successfully")
      setSubmit(false)
    }
  }, [submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      singleJob.taskList.length !== 0 &&
      singleJob.externalReferenceId !== "" &&
      singleJob.jobStatus !== ""
    ) {
      setSubmit(true);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center "
      style={{ height: "80vh" }}
    >
   
        <h1>JOB UPDATE</h1>

      <FormComponent
        setSingleJob={setSingleJob}
        singleJob={singleJob}
        newTask={newTask}
        setNewTask={setNewTask}
        handleSubmit={handleSubmit}
      />
    </Container>
  );
};

export default JobUpdateRobot;
