import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import cookies from 'js-cookie';

const UserEdit = ({ id }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const route = useRouter();
  const formData = {
    name: "UPDATE",
    fields: [
      { label: "Name", type: "text", id: "name" },
      { label: "Email", type: "email", id: "email" }
    ],
  };

  useEffect(() => {
    async function getUser() {
      const token = cookies.get("token");
      try {
        // post user information to laravel api
        if(token){
          const res = await axios.get(`http://localhost:8000/api/users/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setData(res.data);
        }
       
      } catch (error) {
        if (error.response) {
          const errorMessages = error.response.data.errors;
          setError(errorMessages || "An error occurred. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
      }
    }
    getUser();
  }, [id]);

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      // post user information to laravel api
      const res = await axios.post(
        `http://localhost:8000/api/user/${id}`,
        data
      );
      setData({});
      route.push("/users");
    } catch (error) {
      if (error.response) {
        const errorMessages = Object.values(error.response.data.errors)
          .flat()
          .join(", ");
        setError(errorMessages || "An error occurred. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }

  return (
    <div className="container mt-5">
      <span className="text-center text-danger"> {error}</span>
      <h2 className="text-center text-primary">{` ${formData.name.toUpperCase()} FORM`}</h2>
      <form onSubmit={handleSubmit}>
        {formData.fields &&
          formData.fields.map((val, index) => (
            <div className="mb-3" key={index}>
              <label htmlFor="name" className="form-label">
                {val.label}
              </label>
              <input
                type={val.type}
                className="form-control"
                id={val.id}
                placeholder={`Enter your ${val.id}`}
                onChange={handleChange}
                name={val.id}
                value={data[val.id] || ""}
                required
              />
            </div>
          ))}

        <button type="submit" className="btn btn-primary">
          {formData.name.toUpperCase()}
        </button>
      </form>
    </div>
  );
};

export default UserEdit;
