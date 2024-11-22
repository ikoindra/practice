import React from "react";
import styled from "styled-components";
import { FaTrashAlt, FaEdit } from "react-icons/fa";
import { useNavigate } from "@tanstack/react-router";
import { toast } from "react-toastify";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { deleteModels, getModels } from "../../service/models";
import { useSelector } from "react-redux";

const TableContainer = styled.div`
  max-width: 100%;
  margin: 20px auto;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  padding: 0;
  overflow-x: auto;

   @media (max-width: 768px) {
    border-radius: 0px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background-color: #fff;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller font size on mobile */
    padding: 8px;
  }
`;

const TableHead = styled.thead`
  background-color: #007bff;
  color: #fff;
  width: 100%;

  @media (max-width: 768px) {
    font-size: 14px; /* Adjust header font size for mobile */
  }
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f8f9fa;
  }
`;

const TableCell = styled.td`
  padding: 12px 15px;
  border-bottom: 1px solid #dee2e6;
  font-size: 14px;
  color: #495057;
  text-align: center;

  @media (max-width: 768px) {
    padding: 8px 10px; /* Less padding on mobile */
    font-size: 12px; /* Smaller text on mobile */
  }
`;

const TableHeaderCell = styled.th`
  padding: 12px 15px;
  font-weight: bold;
  font-size: 16px;
  color: #fff;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 14px; /* Smaller header font on mobile */
  }
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  flex-direction: row;

  @media (max-width: 768px) {
    flex-direction: column; /* Stack buttons vertically on small screens */
    align-items: center;
  }
`;

const DeleteButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid #dc3545;
  background-color: #fff;
  color: #dc3545;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller button font */
    padding: 5px 10px; /* Reduced padding */
  }
`;

const EditButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #28a745;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 6px 12px;
  cursor: pointer;
  font-size: 14px;

  @media (max-width: 768px) {
    font-size: 12px; /* Smaller button font */
    padding: 5px 10px; /* Reduced padding */
  }
`;

const ModelsTable = ({ carsModels, setCarsModels }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const onDelete = async (id) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this data?",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const result = await deleteModels(id);
            if (result?.success) {
              toast.success("Data deleted successfully!");

              const refreshModels = await getModels();
              if (refreshModels?.success) {
                setCarsModels(refreshModels.data);
              } else {
                setCarsModels([]);
              }

              return;
            }

            toast.error(result?.message);
          },
        },
        {
          label: "No",
          onClick: () => {},
        },
      ],
    });
  };

  const handleEdit = (id) => {
    navigate({ to: `/models/edit/${id}` });
  };

  return (
    <TableContainer>
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Model Name</TableHeaderCell>
            <TableHeaderCell>Manufacture</TableHeaderCell>
            <TableHeaderCell>Transmission</TableHeaderCell>
            <TableHeaderCell>Type_Id</TableHeaderCell>
            <TableHeaderCell>Description</TableHeaderCell>
            <TableHeaderCell>Specs</TableHeaderCell>
            <TableHeaderCell>Options</TableHeaderCell>
            {user?.role_id === 1 && <TableHeaderCell>Actions</TableHeaderCell>}
          </TableRow>
        </TableHead>
        <tbody>
          {carsModels.map((carModel) => (
            <TableRow key={carModel.id}>
              <TableCell>{carModel.model_name}</TableCell>
              <TableCell>{carModel.manufacturer}</TableCell>
              <TableCell>{carModel.transmission}</TableCell>
              <TableCell>{carModel.type_id}</TableCell>
              <TableCell>{carModel.description}</TableCell>
              <TableCell>
                {Array.isArray(carModel.specs) ? (
                  <div style={{ textAlign: "left" }}>
                    {carModel.specs.map((spec, index) => (
                      <div key={index}>- {spec}</div>
                    ))}
                  </div>
                ) : (
                  carModel.specs
                )}
              </TableCell>
              <TableCell>
                {Array.isArray(carModel.options) ? (
                  <div style={{ textAlign: "left" }}>
                    {carModel.options.map((option, index) => (
                      <div key={index}>- {option}</div>
                    ))}
                  </div>
                ) : (
                  carModel.options
                )}
              </TableCell>
              {user?.role_id === 1 && (
                <TableCell>
                  <ButtonContainer>
                    <DeleteButton onClick={() => onDelete(carModel.id)}>
                      <FaTrashAlt style={{ marginRight: "4px" }} />
                      Delete
                    </DeleteButton>
                    <EditButton onClick={() => handleEdit(carModel.id)}>
                      <FaEdit style={{ marginRight: "4px" }} />
                      Edit
                    </EditButton>
                  </ButtonContainer>
                </TableCell>
              )}
            </TableRow>
          ))}
        </tbody>
      </StyledTable>
    </TableContainer>
  );
};

export default ModelsTable;
