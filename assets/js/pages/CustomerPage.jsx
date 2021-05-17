import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import CustomersAPI from "../services/customersAPI";

const CustomerPage = ({ match, history }) => {
  const { id = "new" } = match.params;
  if (id !== "new") {
    console.log(id);
  }

  const [customer, setCustomer] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });

  const [errors, setErrors] = useState({
    lastName: "",
    firstName: "",
    email: "",
    company: "",
  });

  // détection création ou modification customer
  const [editing, setEditing] = useState(false);

  // Récupération du customer en fonction de l'id
  const fetchCustomer = async id => {
    try {
      const { firstName, lastName, email, company } = await CustomersAPI.find(
        id
      );
      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      // console.log(error.response);
      // history.replace("/customers");
    }
  };

  // Chargement du customer si besoin au chargement du composant ou au changement de l'id
  useEffect(() => {
    if (id !== "new") setEditing(true);
    fetchCustomer(id);
  }, [id]);

  // Gestion des changements des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  //  Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (editing) {
        await CustomersAPI.update(id, customer);
        console.log(response.data);
      } else {
        await CustomersAPI.create(customer);
        history.replace("/customers");
      }
      setErrors({});
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
      }
    }
  };

  return (
    <>
      <div className="col-6">
        {(!editing && <h1>Création d'un client</h1>) || (
          <h1>Modification d'un client</h1>
        )}
        <form onSubmit={handleSubmit}>
          <Field
            name="lastName"
            label="Nom"
            placeholder="Nom de famille du client"
            value={customer.lastName}
            onChange={handleChange}
            error={errors.lastName}
          />
          <Field
            name="firstName"
            label="Prénom"
            placeholder="Prénom du client"
            value={customer.firstName}
            onChange={handleChange}
            error={errors.firstName}
          />
          <Field
            name="email"
            label="Email"
            placeholder="Adresse email du client"
            type="email"
            value={customer.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            name="company"
            label="Entreprise"
            placeholder="Entreprise du client"
            type="text"
            value={customer.company}
            onChange={handleChange}
            error={errors.company}
          />
          <div className="form-group mt-2">
            <button className="btn btn-md btn-success">Enregistrer</button>
            <Link to="/customers" className="btn btn-link">
              Retour à la liste
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default CustomerPage;
