import Link from "next/link";
import cookies from "js-cookie";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavBar = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const [navItem, setNavItem] = useState([
    "prouduct",
    "category",
    "about",
  ]);
  const route = useRouter();

  useEffect(() => {
    const userToken = cookies.get("token");
    const userData = cookies.get("user");
    setToken(userToken);
    if (userData) {
      const user = JSON.parse(userData)
      if(user.user_type==="admin"){
        setNavItem(["products","category","users","about"])
      }
      setUser(user);
    }
  }, []);

  function handleLogOut() {
    cookies.set("token", "");
    cookies.set("user", "");
    cookies.set("category", "");
    route.push("dashboard");
  }

  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
      <div className="container">
        <a className="navbar-brand text-info" href="#">
          Smart
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#mynavbar"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="mynavbar">
          <ul className="navbar-nav mx-auto">
            {navItem.map((val, index) => (
              <li className="nav-item" key={index}>
                <Link href={`/${val}`} className="nav-link text-capitalize">
                  {val}
                </Link>
              </li>
            ))}
          </ul>
          <div className="d-flex">
            {token ? (
              <>
                <Link href="/profile" className="btn text-light">
                  {user.name}
                </Link>
                <img
                  src={user.profile_photo_url}
                  className="border rounded-circle"
                  height={40}
                />

                <Link
                  href="/"
                  onClick={handleLogOut}
                  className="btn btn-outline-info ms-3"
                >
                  LogOut
                </Link>
              </>
            ) : (
              <>
                <Link href="/auth/register" className="btn btn-outline-info">
                  Register
                </Link>
                <Link href="/auth/login" className="btn btn-info ms-4">
                  Login
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
