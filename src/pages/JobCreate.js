import React, { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { Container } from "react-bootstrap";
import { toast } from "react-toastify";
import FormComponent from "../components/FormComponent";

const JobCreate = () => {
  const initialTask = {
    actionName: "",
    locationId: "",
  };
  const [task, setTask] = useState(initialTask);

  const initialState = {
    messageType: "JobCreate",
    externalReferenceId: "",
    taskList: [],
    jobStatus: "",
  };

  const [data, setData] = useState(initialState);

  const [submit, setSubmit] = useState(false);

  const socket = useRef();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    if (
      data.taskList.length !== 0 &&
      data.externalReferenceId !== "" &&
      data.jobStatus !== ""
    ) {
      socket.current && socket?.current.emit("jobCreate", data);
      setData(initialState);
      setTask(initialTask);
      setSubmit(false);
      toast.success("has submitted successfully.");
    }
  }, [submit]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (
      data.taskList.length !== 0 &&
      data.externalReferenceId !== "" &&
      data.jobStatus !== ""
    ) {
      setSubmit(true);
    }
  };

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center"
      style={{ height: "80vh" }}
    >
      
        <h1>ADD NEW JOB</h1>


      <FormComponent
        newTask={task}
        setNewTask={setTask}
        handleSubmit={handleSubmit}
        setSingleJob={setData}
        singleJob={data}
        addJob={true}
      />
    </Container>
  );
};

export default JobCreate;
