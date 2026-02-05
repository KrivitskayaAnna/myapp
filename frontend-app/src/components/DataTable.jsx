import React from 'react';
import TableRow from './TableRow';

const DataTable = ({ data, onDelete, onUpdate }) => {
  return (
    <table className="data-table">
      <thead>
        <tr>
          <th>Data</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map(item => (
          <TableRow 
            key={item.id} 
            item={item} 
            onDelete={onDelete} 
            onUpdate={onUpdate} 
          />
        ))}
      </tbody>
    </table>
  );
};

export default DataTable;
