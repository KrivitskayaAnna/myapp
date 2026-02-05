import React, { useState } from 'react';

const TableRow = ({ item, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState(item.data);

  const handleSave = () => {
    onUpdate(item.id, editedData);
    setIsEditing(false);
  };

  return (
    <tr>
      <td>
        {isEditing ? (
          <input
            type="text"
            value={editedData}
            onChange={(e) => setEditedData(e.target.value)}
            onBlur={handleSave}
            autoFocus
          />
        ) : (
          <span onClick={() => setIsEditing(true)}>{item.data}</span>
        )}
      </td>
      <td>
        <button onClick={() => onDelete(item.id)}>Delete</button>
      </td>
    </tr>
  );
};

export default TableRow;
