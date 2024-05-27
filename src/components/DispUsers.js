import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import { AgGridReact } from 'ag-grid-react';
import React, { useEffect, useState } from 'react';

const DispUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: 'id', headerName: 'ID' },
    { field: 'fullname', headerName: 'Full Name' },
    { field: 'email', headerName: 'Email' },
    { field: 'country', headerName: 'Country' }
  ]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/siemens/api/user');
        const result = await response.json();

        if (result.status === 200) {
          setUsers(JSON.parse(result.data));
        } else {
          setError('Failed to fetch users');
        }
      } catch (error) {
        setError('Failed to fetch users');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) {
    return <div className='flex justify-center items-center'>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="flex justify-center items-center my-12">
      <div className="ag-theme-alpine w-[850px]" style={{ height: 350 }}>
        <AgGridReact
          rowData={users}
          columnDefs={colDefs}
        />
      </div>
    </div>
  );
}

export default DispUsers;
