import { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";
import cookies from 'js-cookie';
import { useRouter } from "next/router";

const admin_dashboard = () => {
  const [user, setUser] = useState(null); 
  const [loading, setLoading] = useState(true); 
  const router = useRouter();

  useEffect(() => {
    const users = cookies.get("user");
    if (users) {
      setUser(JSON.parse(users));
    }
    setLoading(false); 
  }, []);

  useEffect(() => {
    if (!loading) {
      if (user && user.user_type !== "admin") {
        router.push('/dashboard');
      }
    }
  }, [loading, user, router]);

  if (loading) {
    return <div>Loading...</div>; 
  }

  if (user && user.user_type === "admin") {
    return (
      <Layout>
        <h1>This is the admin Dashboard page</h1>
      </Layout>
    );
  }

  return null; 
};

export default admin_dashboard;
