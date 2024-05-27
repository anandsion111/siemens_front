import { IxApplicationHeader, IxButton } from '@siemens/ix-react';
import React from 'react';
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
    <IxApplicationHeader name="Demo App">
    <Link to="/">
        <IxButton ghost>Add User</IxButton>
    </Link>
    <Link to="/user-table">
        <IxButton ghost>User List</IxButton>
    </Link>
    </IxApplicationHeader> 
    </>
  )
}

export default Header
