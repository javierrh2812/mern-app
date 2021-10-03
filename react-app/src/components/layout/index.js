import Sidebar from "components/sidebar";
import { useAuth } from "hooks/useUser";

const Layout = (props) => {
  const { user } = useAuth();
  return (
    <div style={{ display: "flex" }}>
      {user && <Sidebar />}
      <div
        style={{
          height: "100vh",
          backgroundColor: "#cdcdcd",
          overflow: "auto",
          flexGrow: 1,
          padding: "2%",
        }}
      >
        {props.children}
      </div>
    </div>
  );
};

export default Layout;
