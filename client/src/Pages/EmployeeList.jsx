import { useEffect, useState } from "react";
import Loading from "../Components/Loading";
import EmployeeTable from "../Components/EmployeeTable";
import Pagination from "../Components/Pagination/Pagination";
const levels = require("../levels.json");
const positions = require("../positions.json");

const fetchEmployees = () => {
  return fetch("/api/employees").then((res) => res.json());
};

const deleteEmployee = (id) => {
  return fetch(`/api/employees/${id}`, { method: "DELETE" }).then((res) =>
    res.json()
  );
};

const sortEmployeesByOption = (employeesCopy, option) => {
  let sortedEmployees;
  switch(option) {
    case "First Name":
      sortedEmployees = employeesCopy.sort((a, b) => 
          a.name.split(" ")[0] < b.name.split(" ")[0] ? -1 
        : a.name.split(" ")[0] > b.name.split(" ")[0] ? 1
        : 0 
      );
      break;
    case "Middle Name":
      sortedEmployees = employeesCopy
        .filter((employee) => 
          employee.name.split(" ")[1].length === 2 &&
          employee.name.split(" ")[1][1] === "."
        )
        .sort((a, b) => 
            a.name.split(" ")[1] < b.name.split(" ")[1] ? -1
          : a.name.split(" ")[1] > b.name.split(" ")[1] ? 1
          : 0  
        );
      break;
    case "Last Name":
      sortedEmployees = employeesCopy.sort((a, b) => {
        if (a.name === "Robert De Niro" || a.name === "Benicio Del Toro" || a.name === "Robert Downey Jr.") {
          return a.name.split(" ")[1] < b.name.split(" ")[b.name.split(" ").length - 1] ? -1 
               : a.name.split(" ")[1] > b.name.split(" ")[b.name.split(" ").length - 1] ? 1
               : 0
        } else if (b.name === "Robert De Niro" || b.name === "Benicio Del Toro" || b.name === "Robert Downey Jr.") {
          return a.name.split(" ")[a.name.split(" ").length - 1] < b.name.split(" ")[1] ? -1 
               : a.name.split(" ")[a.name.split(" ").length - 1] > b.name.split(" ")[1] ? 1
               : 0
        } else {
          return a.name.split(" ")[a.name.split(" ").length - 1] < b.name.split(" ")[b.name.split(" ").length - 1] ? -1 
               : a.name.split(" ")[a.name.split(" ").length - 1] > b.name.split(" ")[b.name.split(" ").length - 1] ? 1
               : 0 
        }
      });
      break;
    case "Position":
      sortedEmployees = employeesCopy.sort((a, b) => 
          a.position < b.position ? -1
        : a.position > b.position ? 1
        : 0 
      );
      break;
    case "Level":
      sortedEmployees = employeesCopy.sort((a, b) => 
          a.level < b.level ? -1
        : a.level > b.level ? 1
        : 0 
      );
      break;
  }
  return [...sortedEmployees];
}

const sortEmployeesByName = (employees, setEmployees, sortByName, setSortByName) => {
  if (sortByName === "asc") {
    setEmployees(employees.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      else if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
      else return 0;
    }));
    setSortByName("desc");
  } else if (sortByName === "desc") {
    setEmployees(employees.sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return 1;
      else if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
      else return 0;
    }));
    setSortByName("asc");
  }
}

const EmployeeList = () => {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState(null);
  const [employeesCopy, setEmployeesCopy] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [employeesPerPage, setEmployeesPerPage] = useState(10);
  const [sortByName, setSortByName] = useState("asc");


  const handleDelete = (id) => {
    deleteEmployee(id);

    setEmployees((employees) => {
      return employees.filter((employee) => employee._id !== id);
    });
  };

  const handleSearchInput = (event) => {
    if (positions.includes(event.target.value)) {
      setEmployees((empoyees) => employees.filter((employee) => employee.position === event.target.value));
      setCurrentPage(1); 
    } else if (levels.includes(event.target.value)) {
      setEmployees((employees) => employees.filter((employee) => employee.level === event.target.value));
      setCurrentPage(1);
    } else {
      setEmployees(employeesCopy);
    }
  };

  const handleSelectOption = (event) => {
    const option = event.target.value;
    const sortedEmployees = sortEmployeesByOption(employeesCopy, option);
    setEmployees(sortedEmployees);
    setCurrentPage(1);
  };

  const changeToPrev = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const changeToNext = () => {
    if (currentPage < Math.ceil(employees.length / employeesPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  useEffect(() => {
    fetchEmployees()
      .then((employees) => {
        setLoading(false);
        setEmployees(employees);
        setEmployeesCopy(employees);
      })
  }, []);

  const handleSortByName = () => sortEmployeesByName(employees, setEmployees, sortByName, setSortByName);

  if (loading) {
    return <Loading />;
  }

  const currentDisplayedEmployees = employees.slice((currentPage - 1) * employeesPerPage, currentPage * employeesPerPage);
  
  return (
    <div className="EmployeeList">
      <select onChange={handleSelectOption}>
        <option value="" hidden>Sort by</option>
        <option value="First Name">First Name</option>
        <option value="Middle Name">Middle Name</option>
        <option value="Last Name">Last Name</option>
        <option value="Position">Position</option>
        <option value="Level">Level</option>
      </select>
      <input type="search" placeholder="Search by Position/Level" onChange={handleSearchInput}/>
      <EmployeeTable 
        employees={employees}
        currentDisplayedEmployees={currentDisplayedEmployees} 
        onDelete={handleDelete} 
        handleSortByName={handleSortByName}
      />
      <Pagination 
        changeToPrev={changeToPrev}
        changeToNext={changeToNext}
        currentPage={currentPage}
      />
    </div>
  );
};

export default EmployeeList;
