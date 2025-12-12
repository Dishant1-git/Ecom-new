import { useEffect, useState } from "react";
import Header from "./header";
import SiteRoutes from "./routes";
import Userheader from "./userheader";
import context from "./usecontext";
import { Footer } from "./footer";
import { CartProvider } from "./cartcontext";
import { useSelector } from "react-redux";

function App() {
  const [usertype, setUsertype] = useState(null);
  const [flag, setFlag] = useState(null);
  const [orderid, setOrderid] = useState(null);
   const { userid, Loggedin } = useSelector(state => state.userslice);

  useEffect(() => {
   
    const userData = sessionStorage.getItem("userinfo");
    if (userData) {
      const user = JSON.parse(userData);
      setUsertype(user.usertype);
    } else {
      setUsertype(null);
    }
  }, []); 

  return (
      <CartProvider userid={userid} Loggedin={Loggedin}>
    <context.Provider value={{ flag, setFlag, orderid, setOrderid, usertype, setUsertype }}>
      {usertype === "Admin" ? <Header /> : <Userheader />}
      <SiteRoutes />
      <Footer />
    </context.Provider>
    </CartProvider>
  );
}

export default App;
