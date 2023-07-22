import { Link } from "react-router-dom";
import "./EmployeeTable.css";
import { useEffect } from "react";

let missingEmployees = [];

const EmployeeTable = ({ employees, onDelete }) => {
  
  const handleCheckbox = (event) => {
    const id = event.target.id;
    if (event.target.checked) {
      const indexOfEmpToDelete = missingEmployees.indexOf(missingEmployees.find(emp => emp._id === id));
      missingEmployees.splice(indexOfEmpToDelete, 1);
    } 
    else {
      missingEmployees.push(employees.find((employee) => employee._id === id));
    };
    localStorage.setItem("missingEmployees", JSON.stringify(missingEmployees));
  };

  useEffect(() => {
    if (missingEmployees.length === 0) {
      missingEmployees.push(...employees);
      localStorage.setItem("missingEmployees", JSON.stringify(missingEmployees));
    }
  }, []);

  return <div className="EmployeeTable">
            <table>
              <thead>
                <tr>
                  <th>Present</th>
                  <th>Name</th>
                  <th>Level</th>
                  <th>Position</th>
                  <th>Equipment</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id}>
                    <td><input type="checkbox" id={employee._id} onClick={handleCheckbox}/></td>
                    <td>{employee.name}</td>
                    <td>{employee.level}</td>
                    <td>{employee.position}</td>
                    <td>{Object.entries(employee.equipment).map((keyValue) => (<p key={keyValue}>{keyValue[0]}:  {keyValue[1]}</p>))}</td>
                    <td>
                      <Link to={`/update/${employee._id}`}>
                        <button type="button">Update</button>
                      </Link>
                      <button type="button" onClick={() => onDelete(employee._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
         </div>
};

export default EmployeeTable;
