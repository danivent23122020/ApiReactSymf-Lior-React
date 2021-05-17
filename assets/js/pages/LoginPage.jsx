import React, { useState, useContext } from "react";
import AuthAPI from "../services/authAPI";
import AuthContext from "../contexts/AuthContext";
import Field from "../components/forms/Field";

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
      history.replace("/customers");
      //
    } catch (error) {
      setError("Aucun compte ne possède cette adresse email ou mot de passe !");
    }
  };
  //
  return (
    <>
      <h1>Connexion à l'application</h1>

      <form onSubmit={handleSubmit}>
        {/* input adresse email */}
        <Field
          label="Adresse email"
          name="username"
          value={credentials.username}
          onChange={handleChange}
          type="email"
          error={error}
          placeholder="Adresse email"
        />
        {/* input password */}
        <Field
          name="password"
          label="Mot de passe"
          value={credentials.password}
          onChange={handleChange}
          type="password"
          error=""
          placeholder="Votre mot de passe"
        />
        <div className="form-group">
          <button type="submit" className="btn btn-success mt-2">
            Je me connecte
          </button>
        </div>
      </form>
    </>
  );
};

export default LoginPage;
