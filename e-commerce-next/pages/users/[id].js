import { useRouter } from "next/router";
import Layout from "../../components/layout/Layout";
import UserEdit from "../../components/sections/user/UserEdit";

const product = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout>
     <UserEdit id={id} />
    </Layout>
  );
};

export default product;
