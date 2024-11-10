/* eslint-disable react-refresh/only-export-components */
import { RouterProvider } from "react-router-dom";
import { router } from "./routes";
import { withTranslation } from "react-i18next";

function App() {
  return <RouterProvider router={router} />;
}

export default withTranslation()(App);
