/* eslint-disable react-refresh/only-export-components */
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { withTranslation } from "react-i18next";
import { INIT_USER_STORAGE, USER_STORAGE } from "constants";
import { useEffect } from "react";
import { userStore } from "store/userStore";
import { getUserByJwtoken } from "utils/jwtdecode";
import { configService } from "services/config";
import { configStore } from "store/configStore";

function App() {
  const { handleLogout, handleUserLogin } = userStore();
  const { setExchangeRate } = configStore();
  const handleCheckUserLogin = () => {
    try {
      const user_storage =
        localStorage.getItem(USER_STORAGE) || JSON.stringify(INIT_USER_STORAGE);
      const userData = JSON.parse(user_storage).state;
      if (userData.token) {
        const user = getUserByJwtoken(userData.token);
        if (user.exp && user.exp > Date.now() / 1000) {
          handleUserLogin(user);
        } else {
          handleLogout();
        }
      } else {
        handleLogout();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getConfig = async () => {
    try {
      const res = await configService.get();
      const data = res.data.data.result?.exchange_rate || 0;
      setExchangeRate(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    handleCheckUserLogin();
    getConfig();
  }, []);
  return <RouterProvider router={router} />;
}

export default withTranslation()(App);
