import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function MissingEmployees() {
  const [ missingEmps, setMissingEmps] = useState(null);
  
  useEffect(() => {
    setMissingEmps(JSON.parse(localStorage.getItem("missingEmployees")));
  }, []);

  const handleDelete = (id) => {
    fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) => res.json());

    setMissingEmps(missingEmps.filter((employee) => employee._id !== id));
  };

  return (
    <div className="MissingEmployees">
        {
          <table>
            <thead>
              <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Position</th>
              <th>Equipment</th>
              <th />
              </tr>
            </thead>
            <tbody>
              {missingEmps && missingEmps.map((employee) => (
                <tr key={employee._id}>
                  <td>{employee.name}</td>
                  <td>{employee.level}</td>
                  <td>{employee.position}</td>
                  <td>{Object.entries(employee.equipment).map((keyValue) => (<p key={keyValue}>{keyValue[0]}:  {keyValue[1]}</p>))}</td>
                  <td>
                  <Link to={`/update/${employee._id}`}>
                      <button type="button">Update</button>
                  </Link>
                  <button type="button" onClick={() => handleDelete(employee._id)}>
                      Delete
                  </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        }
    </div>
  )
}