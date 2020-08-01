import { FunctionComponent } from "react";
import Footer from "./Footer/Footer";
import Header from "./Header/Header";
import HeaderAdmin from "./Header/HeaderAdmin";

interface Props {
  children: React.ReactNode;
  type?: "admin" | "user";
}

const Page: FunctionComponent<Props> = (props) => {
  const { children, type = "user" } = props;
  return (
    <div>
      {type === "user" ? <Header /> : <HeaderAdmin />}
      {children}
      {type === 'user' && <Footer />}
    </div>
  );
};

export default Page;
