/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import OptionSelectDropdown from "../OptionSelectDropdown";
import { AddUser, RemoveUser, UpdateUser } from "../../Services/UsersService";
import UsersAdmin from "./UsersAdmin";
import useAuth from "../../hooks/useAuth";

export const UsersAdminForm = ({
  handlerCloseForm,
  userSelected,
  setUserSelected,
  initialUserForm,
  passForm,
  setPassForm,
}) => {
  const { auth } = useAuth();
  const handlerAddUser = async (user) => {
    //console.log("este devuelve auth:", auth);
    //console.log("este devuelve auth.token:", auth.token);
    const resUser = await AddUser(user, auth);
    handlerCloseForm();
    return resUser;
  };

  const handlerUpdateUser = async (user) => {
    const resUser = await UpdateUser(user, auth);
    handlerCloseForm();
    return resUser;
  };

  const [userForm, setUserForm] = useState(userSelected);
  const { dni, edad, email, nombre, tipoPersona, username, password } =
    userForm;

  useEffect(() => {
    setUserForm({
      ...userSelected,
      password: "",
    });
  }, [userSelected]);

  const onInputChange = ({ target }) => {
    const { name, value } = target;
    setUserForm({
      ...userForm,
      [name]: value,
    });
    console.log(userForm);
  };

  const onSubmit = (event) => {
    event.preventDefault();

    if (!username || (dni === 0 && !password) || !email) {
      alert("Error de validación");
      return;
    }
    if (!email.includes("@")) {
      alert("Error de validación");
    }
    if (userSelected.dni === null) {
      handlerAddUser(userForm)
        .then((res) =>
          res ? alert("Usuario creado") : alert("No se guardaron los cambios")
        )
        .then(() => {
          return <UsersAdmin />;
        });
    } else {
      handlerUpdateUser(userForm)
        .then((res) =>
          res
            ? alert("Usuario actualizado")
            : alert("No se guardaron los cambios")
        )
        .then(() => {
          return <UsersAdmin />;
        });
    }
  };

  const onCloseForm = () => {
    handlerCloseForm();
    setUserForm(initialUserForm);
    setPassForm(false);
  };

  return (
    <form onSubmit={onSubmit}>
      <input
        className="form-control my-3 w-75"
        placeholder="DNI"
        name="dni"
        value={dni}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Nombre"
        name="nombre"
        value={nombre}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Edad"
        name="edad"
        value={edad}
        onChange={onInputChange}
      />
      <input
        className="form-control my-3 w-75"
        placeholder="Email"
        name="email"
        value={email}
        onChange={onInputChange}
      />
      <OptionSelectDropdown
        listOption={["Administrador", "Inquilino", "Propietario"]}
        userForm={userForm}
        setUserForm={setUserForm}
        tipoPersona={tipoPersona}
      />
      {userSelected.dni === null ? (
        <input
          className="form-control my-3 w-75"
          placeholder="Username"
          name="username"
          value={username}
          onChange={onInputChange}
        />
      ) : (
        <input
          className="form-control my-3 w-75"
          placeholder="Username"
          name="username"
          value={username}
          disabled
          onChange={onInputChange}
        />
      )}
      {passForm && (
        <input
          className="form-control my-3 w-75"
          placeholder="Password"
          type="password"
          name="password"
          value={password}
          onChange={onInputChange}
        />
      )}
      <button className="btn btn-primary" type="submit">
        Guardar
      </button>
      {!handlerCloseForm || (
        <button
          className="btn btn-primary mx-2"
          type="button"
          onClick={() => onCloseForm()}
        >
          Cerrar
        </button>
      )}
    </form>
  );
};
