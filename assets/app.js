import React, { useState, useContext } from "react";
import ReactDom from "react-dom";
// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
// start the Stimulus application
import "./bootstrap";
import Navbar from "./js/components/Navbar";
import HomePage from "./js/pages/HomePage";
import {
  HashRouter,
  Switch,
  Route,
  withRouter,
  Redirect,
} from "react-router-dom";
import CustomersPage from "./js/pages/CustomersPage";
import InvoicesPage from "./js/pages/InvoicesPage";
import LoginPage from "./js/pages/LoginPage";
import authAPI from "./js/services/authAPI";
import AuthContext from "./js/contexts/AuthContext";
import PrivateRoute from "./js/components/PrivateRoute";
import CustomerPage from "./js/pages/CustomerPage";
import InvoicePage from "./js/pages/InvoicePage";
import RegisterPage from "./js/pages/RegisterPage";

authAPI.setup();

const App = () => {
  //
  const [isAuthenticated, setIsAuthenticated] = useState(
    authAPI.isAuthenticated()
  );
  //
  const NavbarWithRouter = withRouter(Navbar);
  //
  const contextValue = {
    isAuthenticated,
    setIsAuthenticated,
  };
  //
  return (
    <AuthContext.Provider value={contextValue}>
      <HashRouter>
        <NavbarWithRouter />

        <main className="container pt-5">
          <Switch>
            <Route path="/login" component={LoginPage} />
            <Route path="/register" component={RegisterPage} />
            <PrivateRoute path="/invoices/:id" component={InvoicePage} />
            <PrivateRoute path="/invoices" component={InvoicesPage} />
            <PrivateRoute path="/customers/:id" component={CustomerPage} />
            <PrivateRoute path="/customers" component={CustomersPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </main>
      </HashRouter>
    </AuthContext.Provider>
  );
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App />, rootElement);
