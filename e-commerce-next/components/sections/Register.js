import Form from "../elements/Form";
const Register = () => {
  const form = {
    name: "register",
    fields: [
      { label: "Name", type: "text", id: "name" },
      { label: "Email", type: "email", id: "email" },
      { label: "Phone", type: "tel", id: "phone" },
      { label: "password", type: "password", id: "password" },
      { label: "confirm_password", type: "password", id: "confirm_password" },
    ],
  };
  return(
    <Form formData={form}/>
  )
};
export default Register;