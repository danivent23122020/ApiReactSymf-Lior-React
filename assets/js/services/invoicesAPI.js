import axios from "axios";
import { INVOICES_API } from "../config";

function findAll() {
  return (
    axios
      // .get("https://localhost:8000/api/invoices")
      .get(INVOICES_API)
      .then(response => response.data["hydra:member"])
  );
}

function deleteInvoice(id) {
  // return axios.delete("https://localhost:8000/api/invoices/" + id);
  return axios.delete(INVOICES_API + "/" + id);
}

function find(id) {
  return (
    axios
      // .get("https://localhost:8000/api/invoices/" + id)
      .get(INVOICES_API + "/" + id)
      .then(response => response.data)
  );
}

function update(id, invoice) {
  // return axios.put("https://localhost:8000/api/invoices/" + id, {
  return axios.put(INVOICES_API + "/" + id, {
    ...invoice,
    customer: `/api/customers/${invoice.customer}`,
  });
}

function create(invoice) {
  // return axios.post("https://localhost:8000/api/invoices", {
  return axios.post(INVOICES_API, {
    ...invoice,
    customer: `/api/customers/${invoice.customer}`,
  });
}

export default {
  findAll,
  find,
  create,
  update,
  delete: deleteInvoice,
};
