import React from 'react'
import { Button, Container, Form, InputGroup } from 'react-bootstrap';
import { toast } from 'react-toastify';

const FormComponent = ({addJob,handleSubmit,singleJob,setSingleJob,newTask,setNewTask}) => {
  return (
    <Form style={{ width: "50vw" }} onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>External Reference ID</Form.Label>
          {singleJob && (
            <Form.Control
              value={singleJob.externalReferenceId}
              placeholder="Enter reference ID"
              onChange={(e) =>
                setSingleJob({
                  ...singleJob,
                  externalReferenceId: e.target.value,
                })
              }
            />
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Job Status</Form.Label>
          {singleJob && (
            <Form.Control
              value={singleJob.jobStatus}
              placeholder="Enter Job Status"
              onChange={(e) =>
                setSingleJob({ ...singleJob, jobStatus: e.target.value })
              }
            />
          )}
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicCheckbox">
         {(!addJob || singleJob.taskList.length !== 0) && <Form.Label>Current Tasks</Form.Label>}
          {singleJob &&
            singleJob.taskList.map(({ locationId, actionName }, index) => (
              <InputGroup className="mb-3" key={index}>
                <Form.Select
                  value={actionName}
                  aria-label="Floating label select example"
                  onChange={(e) => {
                    let arr = [...singleJob.taskList];
                    const currentAction = {
                      ...singleJob.taskList[index],
                      actionName: e.target.value,
                    };
                    arr.splice(index, 1, currentAction);
                    setSingleJob({ ...singleJob, taskList: [...arr] });
                  }}
                >
                  <option>Select Action Type</option>
                  <option value="Pickup">Pickup</option>
                  <option value="Deliver">Deliver</option>
                </Form.Select>
                <Form.Control
                  value={locationId}
                  placeholder="Enter Location ID"
                  className="rounded-end"
                  onChange={(e) => {
                    let arr = [...singleJob.taskList];
                    const currentAction = {
                      ...singleJob.taskList[index],
                      locationId: e.target.value,
                    };
                    arr.splice(index, 1, currentAction);
                    setSingleJob({ ...singleJob, taskList: [...arr] });
                  }}
                />
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  fill="red"
                  className="bi bi-x-square-fill align-self-center ms-2"
                  viewBox="0 0 16 16"
                  onClick={() => {
                    let arr = [...singleJob.taskList];
                    if (arr.length === 1) {
                    } else {
                      arr.splice(index, 1);
                      setSingleJob({ ...singleJob, taskList: [...arr] });
                    }
                  }}
                >
                  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z" />
                </svg>
              </InputGroup>
            ))}

          <Form.Label>Add New Task</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select
              aria-label="Floating label select example"
              onChange={(e) => {
                setNewTask({ ...newTask, actionName: e.target.value });
              }}
            >
              <option>Select Action Type</option>
              <option value="Pickup">Pickup</option>
              <option value="Deliver">Deliver</option>
            </Form.Select>
            <Form.Control
              onChange={(e) => {
                setNewTask({ ...newTask, locationId: e.target.value });
              }}
              placeholder="Enter Location ID"
              className="rounded-end"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              fill="green"
              class="bi bi-plus-square-fill align-self-center ms-2"
              viewBox="0 0 16 16"
              onClick={() => {
                let arr = [...singleJob.taskList];
                if (newTask.actionName !== "" && newTask.locationId !== "") {
                  arr.push(newTask);
                  setSingleJob({ ...singleJob, taskList: [...arr] });
                } else {
                  toast.warn("Please fill all fields and try again.");
                }
              }}
            >
              <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm6.5 4.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3a.5.5 0 0 1 1 0z" />
            </svg>
          </InputGroup>
        </Form.Group>
        <Container className="mt-5 p-0">
          <Button style={{ width: "100%" }} variant="primary" type="submit">
            {addJob ? "Submit" : "Edit"}
          </Button>
        </Container>
      </Form>
  )
}

export default FormComponent