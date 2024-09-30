import { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie"
import {useRouter} from 'next/router'

const Form = ({ formData, }) => {
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const route = useRouter()

  function handleChange(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (formData.name === "register") {
      if (data.password === data.confirm_password && data.password!=="") {
        console.log(data)
        setError("")
        try {
          // post user information to laravel api
          const res = await axios.post(
            "http://localhost:8000/api/auth/register",
            data
          );
          debugger;

          // set user information in cookies
          Cookies.set("token",res.data.token,{expires:1})
          Cookies.set("user",JSON.stringify(res.data.user),{expires:1})
          // clear form data
          setData({});
          route.push('/admin_dashboard')

        } catch (error) {
          if (error.response) {
            const errorMessages = Object.values(error.response.data.errors).flat().join(", ");
            setError(errorMessages || "An error occurred. Please try again.");
          } else {
            setError("An error occurred. Please try again.");
          }
        }
      } else {
        // set error for password varification
        setError("Password mismatch");
      }
    } else {
      try {
        // post user information to laravel api
        const res = await axios.post(
          "http://localhost:8000/api/auth/login",
          data
        );

        console.log(res)
        // set user information in cookies
        Cookies.set("token",res.data.token,{expires:1})
        Cookies.set("user",JSON.stringify(res.data.user),{expires:1})

        // clear form data
        setData({});
        route.push('/admin_dashboard')

      } catch (error) {
        if (error.response) {
          const errorMessages = Object.values(error.response.data.errors).flat().join(", ");
          setError(errorMessages || "An error occurred. Please try again.");
        } else {
          setError("An error occurred. Please try again.");
        }
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

export default Form;
