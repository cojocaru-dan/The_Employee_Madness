import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function EmployeesSearcher() {
  const { search } = useParams();
  const [foundEmployees, setFoundEmployees] = useState(null);

  const handleDelete = (id) => {
    fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) => res.json());

    setFoundEmployees((foundEmployees) => {
      return foundEmployees.filter((employee) => employee._id !== id);
    });
  };

  useEffect(() => {
    fetch("/api/employees")
      .then((res) => res.json())
      .then((employees) => {
        const foundEmp = employees.reduce((accumulator, employee) => {
          if (employee.name.toLowerCase().includes(search.toLowerCase())) {
            accumulator.push(employee);
          }
          return accumulator;
        }, []);

        if (foundEmp.length > 0) {
          setFoundEmployees(foundEmp);
        } 
      })
  }, []);

  return (
    <div className="foundEmployees">
      {foundEmployees ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Level</th>
              <th>Position</th>
              <th>Equipment</th>
              <th>FavouriteBrand</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {foundEmployees.map((employee) => (
              <tr key={employee._id}>
                <td>{employee.name}</td>
                <td>{employee.level}</td>
                <td>{employee.position}</td>
                <td>|name: {employee.equipment.name}|----|type: {employee.equipment.type}|----|amount: {employee.equipment.amount}|</td>
                <td>{employee.favouriteBrand.favouriteBrand}</td>
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
      ) : (
        <h3>Your name doesn't exist in the database. Try other name !</h3>
      )}
    </div>
  );
}

export default EmployeesSearcher;