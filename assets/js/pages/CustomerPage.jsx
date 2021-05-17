import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Field from "../components/forms/Field";
import axios from "axios";

const CustomerPage = props => {
  const { id = "new" } = props.match.params;
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

  const fetchCustomer = async id => {
    try {
      const data = await axios
        .get("https://localhost:8000/api/customers/" + id)
        .then(response => response.data);
      const { firstName, lastName, email, company } = data;
      setCustomer({ firstName, lastName, email, company });
    } catch (error) {
      console.log(error.response);
    }
  };

  useEffect(() => {
    if (id !== "new") setEditing(true);
    fetchCustomer(id);
  }, [id]);

  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setCustomer({ ...customer, [name]: value });
  };

  //  Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (editing) {
        const response = await axios.put(
          "https://localhost:8000/api/customers/" + id,
          customer
        );
        console.log(response.data);
      } else {
        const response = await axios.post(
          "https://localhost:8000/api/customers",
          customer
        );
        props.history.replace("/customers");
      }
      setErrors({});
    } catch (error) {
      if (error.response.data.violations) {
        const apiErrors = {};
        error.response.data.violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
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
