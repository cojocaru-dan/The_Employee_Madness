import { useEffect, useState } from "react";

const EmployeeForm = ({ onSave, disabled, employee, onCancel }) => {
  const [name, setName] = useState(employee?.name ?? "");
  const [level, setLevel] = useState(employee?.level ?? "");
  const [position, setPosition] = useState(employee?.position ?? "");
  const [equipment, setEquipment] = useState(employee?.equipment ?? "");
  const [allEquipments, setAllEquipments] = useState(null);

  useEffect(() => {
    fetch("http://127.0.0.1:8080/equipments")
      .then(res => res.json())
      .then(equipments => setAllEquipments(equipments));
  }, []);

  function handleAssignEquipment(event) {
    const [selectedEquipmentName, selectedEquipmentAmount] = event.target.value.split(",");
    const selectedEquipment = allEquipments.find(equipment => equipment.name === selectedEquipmentName && equipment.amount === Number(selectedEquipmentAmount));
    setEquipment({...selectedEquipment});
  }

  const onSubmit = (e) => {
    e.preventDefault();

    if (employee) {
      return onSave({
        ...employee,
        name,
        level,
        position,
        equipment
      });
    }

    return onSave({
      name,
      level,
      position,
      equipment
    });
  };

  return (
    <form className="EmployeeForm" onSubmit={onSubmit}>
      <div className="control">
        <label htmlFor="name">Name:</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          id="name"
        />
      </div>

      <div className="control">
        <label htmlFor="level">Level:</label>
        <input
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          name="level"
          id="level"
        />
      </div>

      <div className="control">
        <label htmlFor="position">Position:</label>
        <input
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          name="position"
          id="position"
        />
      </div>

      <div className="control">
        <label htmlFor="equipment">Equipment:</label>
          <label htmlFor="equipment-name">Equipment Name:</label>
            <input
              value={equipment.name}
              onChange={(e) => setEquipment({...equipment, name: e.target.value})}
              name="equipment-name"
              id="equipment-name"
            />
          <label htmlFor="equipment-type">Equipment Type:</label>
            <input
              value={equipment.type}
              onChange={(e) => setEquipment({...equipment, type: e.target.value})}
              name="equipment-type"
              id="equipment-type"
            />
          <label htmlFor="equipment-amount">Equipment Amount:</label>
            <input
              value={equipment.amount}
              onChange={(e) => setEquipment({...equipment, amount: e.target.value})}
              name="equipment-amount"
              id="equipment-amount"
            />
        <label htmlFor="equipment-dropdown">Assign equipment:
          <select name="equipment-dropdown" onChange={handleAssignEquipment}>
            <option value="" hidden></option>
            {allEquipments && allEquipments.map((equipment, idx) => <option value={[equipment.name, equipment.amount]} key={idx}>{equipment.name}</option>)}
          </select>
        </label>
      </div>

      <div className="buttons">
        <button type="submit" disabled={disabled}>
          {employee ? "Update Employee" : "Create Employee"}
        </button>

        <button type="button" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
