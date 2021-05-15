/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */
// les imports importants
import React from "react";
import ReactDom from "react-dom";
// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";
// start the Stimulus application
import "./bootstrap";
import Navbar from "./js/components/Navbar";
import HomePage from "./js/pages/HomePage";
import { HashRouter, Switch, Route } from "react-router-dom";
import CustomersPage from "./js/pages/CustomersPage";
import InvoicesPage from "./js/pages/InvoicesPage";

console.log("hello world !!!");
const App = () => {
  return (
    <HashRouter>
      <Navbar />
      <main className="container pt-5">
        <Switch>
          <Route path="/invoices" component={InvoicesPage} />
          <Route path="/customers" component={CustomersPage} />
          <Route path="/" component={HomePage} />
        </Switch>
      </main>
    </HashRouter>
  );
};

const rootElement = document.querySelector("#app");
ReactDom.render(<App />, rootElement);
