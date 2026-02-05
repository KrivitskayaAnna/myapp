import React, { useState, useEffect } from 'react';
import DataTable from './components/DataTable';
import './styles.css';

const API_BASE_URL = '/api/v1';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/getall`);
      const result = await response.json();
      setData(result.data || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAdd = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/addrow?data=New+Entry`, {
        method: 'POST'
      });
      await response.json();
      fetchData();
    } catch (error) {
      console.error('Error adding row:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${API_BASE_URL}/deleterow?id=${id}`, {
        method: 'DELETE'
      });
      await response.json();
      fetchData();
    } catch (error) {
      console.error('Error deleting row:', error);
    }
  };

  const handleUpdate = async (id, newData) => {
    try {
      // Удаляем старую запись и добавляем новую
      await fetch(`${API_BASE_URL}/deleterow?id=${id}`, { method: 'DELETE' });
      const response = await fetch(`${API_BASE_URL}/addrow?data=${encodeURIComponent(newData)}`, {
        method: 'POST'
      });
      await response.json();
      fetchData();
    } catch (error) {
      console.error('Error updating row:', error);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="app">
      <h1>Data Management</h1>
      <button className="add-button" onClick={handleAdd}>
        +
      </button>
      <DataTable 
        data={data} 
        onDelete={handleDelete} 
        onUpdate={handleUpdate} 
      />
    </div>
  );
}

export default App;
