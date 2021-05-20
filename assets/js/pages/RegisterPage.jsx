import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Field from "../components/forms/Field";
import usersAPI from "../services/usersAPI";

const RegisterPage = ({ history }) => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  //
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });
  //
  // Gestion des changements des input dans le formulaire
  const handleChange = ({ currentTarget }) => {
    const { name, value } = currentTarget;
    setUser({ ...user, [name]: value });
  };
  //
  // Gestion de la soumission du formulaire
  const handleSubmit = async event => {
    event.preventDefault();

    // Comparaison des mots de passe
    const apiErrors = {};
    if (user.password !== user.passwordConfirm) {
      apiErrors.passwordConfirm =
        "Attention, vos mots de passe ne correspondent pas !";
      setErrors(apiErrors);
      toast.error("Attention, vos mots de passe ne correspondent pas !");
      return;
    }

    try {
      await usersAPI.register(user);
      setErrors({});
      toast.success(
        "Vous êtes désormais inscrit, vous pous pouvez vous connecter !"
      );
      history.replace("/login");
    } catch (error) {
      console.log(error.response);
      const { violations } = error.response.data;
      if (violations) {
        violations.forEach(violation => {
          apiErrors[violation.propertyPath] = violation.message;
        });
        setErrors(apiErrors);
      }
      toast.error("Veuillez remplir tous les champs du formulaire !");
    }
  };

  //
  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <h1>Inscription</h1>
        <form onSubmit={handleSubmit} className="col-5 mt-2">
          <Field
            name="firstName"
            label="Prénom"
            placeholder="Votre prénom"
            error={errors.firstName}
            value={user.firstName}
            onChange={handleChange}
          />
          <div className="mt-2">
            <Field
              name="lastName"
              label="Nom"
              placeholder="Votre nom"
              error={errors.lastName}
              value={user.lastName}
              onChange={handleChange}
            />
            <div className="mt-2"></div>
            <Field
              name="email"
              label="Email"
              placeholder="Votre email"
              type="email"
              error={errors.email}
              value={user.email}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <Field
              name="password"
              label="Mot de passe"
              placeholder="Votre mot de passe"
              type="password"
              error={errors.password}
              value={user.password}
              onChange={handleChange}
            />
          </div>
          <div className="mt-2">
            <Field
              name="passwordConfirm"
              label="Confirmez mot de passe"
              placeholder="Confirmation du mot de passe"
              type="password"
              error={errors.passwordConfirm}
              value={user.passwordConfirm}
              onChange={handleChange}
            />
          </div>
          <div className="form-group d-flex justify-content-around mt-3">
            <button type="submit" className="btn btn-success">
              Inscription
            </button>
            <Link to="/login" className="btn btn-link">
              J'ai déjà un compte
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default RegisterPage;
