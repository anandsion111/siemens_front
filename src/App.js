import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid
import { Route, Routes } from "react-router-dom";
import AddUsers from './components/AddUsers';
import DispUsers from './components/DispUsers';
import Header from './components/Header';

function App() {
  return (
    <>
      <Header />
      <Routes> 
        <Route path="/" element={<AddUsers />} />
        <Route path="/user-table" element={<DispUsers />} />
      </Routes>
    </>
  );
}

export default App;
