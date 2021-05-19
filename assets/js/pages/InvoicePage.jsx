import Axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import Select from "../components/forms/Select";
import CustomersAPI from "../services/customersAPI";
import invoicesAPI from "../services/invoicesAPI";

const InvoicePage = ({ history, match }) => {
  const { id = "new" } = match.params;

  const [invoice, setInvoice] = useState({
    amount: "",
    customer: "",
    status: "SENT",
  });
  //
  const [customers, setCustomers] = useState([]);
  //
  const [editing, setEditing] = useState(false);
  //
  const [errors, setErrors] = useState({
    amount: "",
    customer: "",
    status: "",
  });

  // Récupérations des customers/clients
  const fetchCustomers = async () => {
    try {
      const data = await CustomersAPI.findAll();
      setCustomers(data);
      if (!invoice.customer) {
        setInvoice({ ...invoice, customer: data[0].id });
      }
    } catch (error) {
      toast.error("Impossible de charger les clients !");
      history.replace("/invoices");
    }
  };
  // Récupération d'une facture
  const fetchInvoice = async id => {
    try {
      const { amount, status, customer } = await invoicesAPI.find(id);

      setInvoice({ amount, status, customer: customer.id });
    } catch (error) {
      toast.error("Impossible de charger la facture demandée !");
      history.replace("/invoices");
    }
  };
  // Récupération de la liste des clients à ,chaque chargement du composant
  useEffect(() => {
    fetchCustomers();
  }, []);
  // Récupération de la bonne facture quand l'identifiant de l'URL change
  useEffect(() => {
    if (id !== "new") {
      setEditing(true);
      fetchInvoice(id);
    }
  }, [id]);
  // Gestion des changements des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setInvoice({ ...invoice, [name]: value });
  };
  //
  // Gestion de la soumission des modifications du formulaire
  const handleSubmit = async event => {
    event.preventDefault();
    try {
      if (editing) {
        await invoicesAPI.update(id, invoice);
        toast.success("La facture a bien été modifiée !");
        history.replace("/invoices");
      } else {
        await invoicesAPI.create(invoice);
        toast.success("La facture a bien été créée !");
        history.replace("/invoices");
      }
    } catch ({ response }) {
      const { violations } = response.data;

      if (violations) {
        const apiErrors = {};
        violations.forEach(({ propertyPath, message }) => {
          apiErrors[propertyPath] = message;
        });
        setErrors(apiErrors);
        toast.error("Attention : compléter tous les champs du formulaire !");
      }
    }
  };
  //
  return (
    <>
      <div className="col-6">
        {(editing && <h1>Modification de la facture</h1>) || (
          <h1>Création d'une facture</h1>
        )}
        <form onSubmit={handleSubmit}>
          <Field
            name="amount"
            type="number"
            placeholder="Montant..."
            label="Montant de la facture"
            onChange={handleChange}
            value={invoice.amount}
            error={errors.amount}
          />
          <Select
            name="customer"
            label="Sélectionnez le client"
            value={invoice.customer}
            error={errors.customer}
            onChange={handleChange}
          >
            {customers.map(customer => (
              <option key={customer.id} value={customer.id}>
                {customer.firstName} {customer.lastName}
              </option>
            ))}
          </Select>
          <Select
            name="status"
            label="Statut de la facture"
            value={invoice.status}
            error={errors.status}
            onChange={handleChange}
          >
            <option value="SENT">Envoyée</option>
            <option value="PAID">Payée</option>
            <option value="CANCELLED">Annulée</option>
          </Select>
          <div className="form-group mt-3">
            <button type="submit" className="btn btn-success">
              Enregistrer
            </button>
            <Link to="/invoices" className="btn btn-link">
              Retour aux factures
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default InvoicePage;
