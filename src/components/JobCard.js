import React from "react";
import { Button, Card, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import moment from "moment"

const JobCard = ({ job }) => {
  const navigate = useNavigate();

  return (
    <Card
      style={{ width: "24rem", backgroundColor: "lightgray" }}
      className="ms-3 mt-3"
    >
      <Card.Body className="d-flex flex-column justify-content-between">
        <Card.Title>
          
              <b>ID :</b>&thinsp;{job.externalReferenceId}
      
        </Card.Title>
        
        <Card.Text className="mt-2 d-flex flex-column">
          <Card.Subtitle className="align-self-center mb-2"><b>Task List</b></Card.Subtitle>
          <Table hover>
            <thead>
                  <tr>
                    <th>#</th>
                    <th>Action Name</th>
                    <th>Location ID</th>
                  </tr>
                </thead>
            {job.taskList?.map((task, index) => (
                
                <tbody key={index}>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{task.actionName}</td>
                    <td>{task.locationId}</td>
                  </tr>
                </tbody>
            ))}
          </Table>
        </Card.Text>
        <Card.Subtitle className="mb-2">
          <b>Job Status :</b>&thinsp;{job.jobStatus}
        </Card.Subtitle>
        <Card.Subtitle className="mt-2 mb-2 text-muted">
          <b>Created At :</b>&thinsp;{moment(job.createdAt).format("LLL")}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          <b>Updated At :</b>&thinsp;{moment(job.updatedAt).format("LLL")}
        </Card.Subtitle>
        <div className="d-flex align-items-center justify-content-center">
          <Button
            type="button"
            variant="outline-success"
            className="border-0"
            onClick={() => navigate(`/Jobupdaterobot/${job._id}`)}
          >
            Job Update Robot
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default JobCard;
