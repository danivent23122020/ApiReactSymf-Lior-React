import React from "react";

const HomePage = props => {
  return (
    <div className="list-group d-flex align-items-center mt-5 homepage p-5">
      <div className="col-5 d-flex flex-column align-items-center">
        <h1 className="mb-1">INVOICES MANAGER</h1>
        <h3 className="mt-5">
          Bonjour et bienvenue sur mon site de gestion d'utilisateurs, de
          clients et de factures avec :
        </h3>
        <div className="d-flex flex-column align-items-center mt-2">
          <h3>Symfony 5 </h3> <h3>API Platform</h3> <h3>React</h3>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
