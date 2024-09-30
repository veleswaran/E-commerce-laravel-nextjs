import { useEffect, useState } from "react";
import axios from "axios";
import cookies from "js-cookie";
import { useRouter } from "next/router";
import Link from "next/link";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  async function getData(token) {
    try {
      const res = await axios.get("http://localhost:8000/api/users", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {
        setUsers(res.data.users);
        cookies.set("users", JSON.stringify(res.data));
      }
    } catch (error) {
      if (error.response) {
        const errorMessages = Object.values(error.response.data.errors || {})
          .flat()
          .join(", ");
        setError(errorMessages || "An error occurred. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    const token = cookies.get("token");
    getData(token);
  }, []);

  async function handleDelete(id) {
    try {
      const token = cookies.get("token");
      const res = await axios.delete(`http://localhost:8000/api/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.status === 200) {   
        getData(token);
      }
    } catch (error) {
      if (error.response) {
        const errorMessages = Object.values(error.response.data.errors || {})
          .flat()
          .join(", ");
        setError(errorMessages || "An error occurred. Please try again.");
      } else {
        setError("An error occurred. Please try again.");
      }
    }
  }



  return (
    <div className="container mt-3">
      <h2>Users</h2>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Email</th>
            <th>User_Type</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan="4">Loading...</td>
            </tr>
          ) : (
            <>
              {error && (
                <tr>
                  <td colSpan="4" style={{ color: "red" }}>
                    {error}
                  </td>
                </tr>
              )}
              {users.length > 0 ? (
                users.map((item) => (
                  <tr key={item.id}>
                    {" "}
                    {/* Use item.id for unique key */}
                    <td>{item.id || ""}</td>
                    <td>{item.name || ""}</td>
                    <td>{item.email || ""}</td>
                    <td>{item.user_type || ""}</td>
                    <td>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                      <Link href={`/users/${item.id}`} className="btn btn-warning ms-2">Edit</Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4">No users found.</td>
                </tr>
              )}
            </>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Users;
