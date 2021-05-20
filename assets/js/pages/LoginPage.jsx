import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const LoginPage = ({ history }) => {
  //
  const { setIsAuthenticated } = useContext(AuthContext);
  //
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  //
  const [error, setError] = useState("");

  // gestion des champs
  const handleChange = ({ currentTarget }) => {
    const { value, name } = currentTarget;
    setCredentials({ ...credentials, [name]: value });
  };

  // gestion du submit
  const handleSubmit = async event => {
    event.preventDefault();
    //
    try {
      await AuthAPI.authenticate(credentials);
      setError("");
      setIsAuthenticated(true);
      toast.success("Vous êtes connecté !");
      history.replace("/customers");
      //
    } catch (error) {
      setError("Aucun compte ne possède cette adresse email ou mot de passe !");
      toast.error("Vérifiez votre email ou mot de passe");
    }
  };
  //
  return (
    <>
      <div className="d-flex flex-column align-items-center mt-5">
        <h1>Connexion à l'application</h1>

        <form onSubmit={handleSubmit} className="col-5">
          {/* input adresse email */}
          <div className="mt-1">
            <Field
              label="Adresse email"
              name="username"
              value={credentials.username}
              onChange={handleChange}
              type="email"
              error={error}
              placeholder="Adresse email"
            />
          </div>
          {/* input password */}
          <div className="mt-3">
            <Field
              name="password"
              label="Mot de passe"
              value={credentials.password}
              onChange={handleChange}
              type="password"
              error=""
              placeholder="Votre mot de passe"
            />
          </div>
          <div className="form-group d-flex justify-content-around mt-3">
            <button type="submit" className="btn btn-success">
              Je me connecte
            </button>
            <Link to="/register" className="btn btn-link">
              Je n'ai pas encore de compte
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginPage;
