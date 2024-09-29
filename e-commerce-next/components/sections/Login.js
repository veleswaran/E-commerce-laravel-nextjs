import Form from "../elements/Form";
const Login = () => {
  const form = {
    name: "login",
    fields: [
      { label: "Email", type: "email", id: "email" },
      { label: "password", type: "password", id: "password" },
    ],
  };
  return(
    <Form formData={form}/>
  )
};
export default Login;