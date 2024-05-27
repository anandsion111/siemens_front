import { IxButton, IxSelect, IxSelectItem, showToast } from "@siemens/ix-react";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AddUsers = () => {
  const navigate = useNavigate();

  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
    country: "",
  });

  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch("/siemens/api/country");
        const result = await response.json();

        if (result.status === 200) {
          console.log(result, "RESULT");
          setCountries(JSON.parse(result.data));
        } else {
          setMessage("Failed to fetch countries");
        }
      } catch (error) {
        setMessage("Failed to fetch countries");
      }
    };

    fetchCountries();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value, "NAME VBALUE");
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSelectChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      country: e.detail,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("/siemens/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();

      if (result.status === 200) {
        setMessage("User added successfully");
      }
      if (result.status === 201) {
        showToast({
          message: result.message,
          type: "success",
        });
        navigate("/user-table");
        setMessage("User added successfully");
      } else {
        showToast({
          message: result.message,
          type: "error",
        });
        console.log("IN ELSE");
        setMessage("Failed to add user");
      }
    } catch (error) {
      setMessage("Failed to add user");
    }
  };

  return (
    <div className="flex justify-center items-center my-12">
      <div className="w-[500px]">
        <span className="text-3xl font-bold underline">Add User</span>
        {message && <p>{message}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label htmlFor="fullname">Full Name:</label>
            <input
              type="text"
              id="fullname"
              name="fullname"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-4">
          <label htmlFor="select-country">Select Country:</label>
            <IxSelect
              id="country"
              name="country"
              selected={formData.country}
              onValueChange={(e) => handleSelectChange(e)}
              class="w-full"
            >
              {countries.map((country) => (
                <IxSelectItem
                  key={country.id}
                  value={country.id}
                  label={country.country}
                  selected={country.id === formData.country}
                />
              ))}
            </IxSelect>
          </div>
          <IxButton type="submit" className="mt-8" variant="primary">
            Add User
          </IxButton>
        </form>
      </div>
    </div>
  );
};

export default AddUsers;
