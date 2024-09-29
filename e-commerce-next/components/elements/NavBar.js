import Link from "next/link";
import cookies from 'js-cookie';
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const NavBar = () => {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const route = useRouter()

  useEffect(() => {
    const userToken = cookies.get('token');
    const userData = cookies.get('user');
    console.log(userToken)
    setToken(userToken);
    if (userData) {
      console.log(userData)
      setUser(JSON.parse(userData));
    }
  }, []);

  function handleLogOut(){
    cookies.set("token","")
    cookies.set("user","")
    route.push('dashboard')
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
            <li className="nav-item">
              <Link href="#" className="nav-link">
                Products
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link">
                Category
              </Link>
            </li>
            <li className="nav-item">
              <Link href="#" className="nav-link">
                About
              </Link>
            </li>
          </ul>
          <div className="d-flex">
            {token ? (
              <>
               <Link href="/profile"  className="btn text-light">{user.name}</Link>
              <img src={user.profile_photo_url} className="border rounded-circle" height={40}/>
             
              <Link href="/" onClick={handleLogOut} className="btn btn-outline-info ms-3">LogOut</Link>
              </>
            ) : (
              <>
                <Link href="/auth/register" className="btn btn-outline-info">Register</Link>
                <Link href="/auth/login" className="btn btn-info ms-4">Login</Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
