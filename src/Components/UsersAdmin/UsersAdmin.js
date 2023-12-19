import { React, useState, useEffect } from "react";
import {
  GetAllUsers,
  GetUnidadByUsername,
  RemoveUser,
} from "../../Services/UsersService";
import { UsersAdminRow } from "./UsersAdminRow";
import { UsersAdminModalForm } from "./UsersAdminModalForm";
import { UsersAdminRowUnidad } from "./UsersAdminRowUnidad";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";

const UsersAdmin = () => {
  const [users, setUsers] = useState([]);
  const [visibleForm, setVisibleForm] = useState(false);
  const [visibleFormUnidad, setVisibleFormUnidad] = useState(false);
  const [passForm, setPassForm] = useState(true);
  const [usernameRowSelected, setUsernameRowSelected] = useState("");
  const [tipoPersonaRowSelected, setTipoPersonaRowSelected] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const initialUserForm = {
    dni: null,
    edad: null,
    email: "",
    nombre: "",
    tipoPersona: "Tipo de persona...",
    username: "",
    password: "",
    unidad_id: "",
  };

  const initialUnidades = [
    {
      edificio_id: null,
      estado: null,
      id: null,
      nro: null,
      piso: null,
    },
  ];

  const initialEdificios = [
    {
      edificio_id: null,
      direccion: null,
    },
  ];

  const [userSelected, setUserSelected] = useState(initialUserForm);
  const [render, setRender] = useState(1);
  const [unidades, setUnidades] = useState(initialUnidades);
  const [selectedRow, setSelectedRow] = useState(null);

  const handlerUserSelectedForm = (user, remove = false) => {
    setUserSelected({ ...user });
    if (!remove) {
      setVisibleForm(true);
    } else {
      handlerRemoveUser(user, auth).then(() => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setRender(render * -1); //para renderizar y que se vuelva a ejecutar el useEffect
      });
    }
  };

  useEffect(() => {
    const fetchUsers = async () => {
      let initialUsers = await GetAllUsers(auth);
      return initialUsers;
    };
    fetchUsers().then((res) => setUsers(res.slice(1,)));
  }, [visibleForm, visibleFormUnidad, render]);

  const handlerOpenForm = () => {
    setPassForm(true);
    setVisibleForm(true);
  };

  const handlerAddUnidad = () => {
    const dataNavigate = {
      state: { username: usernameRowSelected },
    };
    if (usernameRowSelected === "") {
      alert("Debe seleccionar un usuario.");
    } else {
      navigate("/usersaddunidad", dataNavigate);
    }
  };

  const handlerRemoveUser = async (user) => {
    // eslint-disable-next-line no-restricted-globals
    let result = confirm("Confirma la eliminacion del usuario?");
    if (result && user.username === "admin") {
      alert("El usuario root no puede ser eliminado");
    } else if (result) {
      const res = await RemoveUser(user.username, auth);
      return res;
    }
  };

  const handleRowClick = (index, username, tipoPersona) => {
    setUsernameRowSelected(username);
    setTipoPersonaRowSelected(tipoPersona);
    setUnidades(initialUnidades);
    setSelectedRow(index);
    handlerGetUnidadByUsername(username, auth).then((res) => {
      if (res) {
        let unidad = [
          {
            edificio_id: res.edificioID,
            estado: res.estado,
            id: res.id,
            nro: res.nro,
            piso: res.piso,
          },
        ];
        console.log(unidad);
        setUnidades(unidad);
      }
    });
  };

  const handlerGetUnidadByUsername = async (username) => {
    const unidades = await GetUnidadByUsername(username, auth);
    return unidades;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
    <Grid container spacing={3}>
      {/* Chart */}
      <Grid item xs={12} md={8} lg={15}>
        <Paper
          sx={{
            p: 2,
            display: "flex",
            flexDirection: "column",
            height: 640,
          }}
        >
      {!visibleForm || (
        <UsersAdminModalForm
          setVisibleForm={setVisibleForm}
          initialUserForm={initialUserForm}
          userSelected={userSelected}
          setUserSelected={setUserSelected}
          passForm={passForm}
          setPassForm={setPassForm}
        />
      )}
      {users.length === 0 ? (
        <div className="alert alert-warning my-4">
          No hay usuarios en el sistema.
        </div>
      ) : (
        <div
          className="scrollable"
          style={{ height: "200px", overflow: "scroll" }}
        >
          <table
            id="users-table"
            className="table table-hover table-stripped table-responsive mh-50 "
          >
            <thead>
              <tr>
                <th>DNI</th>
                <th>Nombre</th>
                <th>Edad</th>
                <th>Tipo usuario</th>
                <th>Username</th>
                <th>Email</th>
                <th></th>
                <th></th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <div className="alert alert-warning my-4">
                  No hay usuarios en el sistema.
                </div>
              ) : (
                users.map(
                  (
                    { nombre, dni, edad, username, email, tipoPersona },
                    index
                  ) => (
                    <UsersAdminRow
                      id={dni}
                      index={index}
                      nombre={nombre}
                      dni={dni}
                      edad={edad}
                      email={email}
                      tipoPersona={tipoPersona}
                      username={username}
                      handlerUserSelectedForm={handlerUserSelectedForm}
                      setPassForm={setPassForm}
                      selectedRow={selectedRow}
                      setSelectedRow={setSelectedRow}
                      handleRowClick={handleRowClick}
                    />
                  )
                )
              )}
            </tbody>
          </table>
        </div>
      )}
      <Grid item >
      <button sx={{ mt: 4, mb: 4 }}
        className="btn btn-primary my-2"
        onClick={handlerOpenForm}
      >
        Nuevo
      </button>
      </Grid>
      <div>
        <h6 className="mt-4">Unidades del usuario</h6>
      </div>
      {selectedRow === null ? (
        <div className="alert alert-warning my-4">
          Seleccionar usuario para ver las unidades habitadas.
        </div>
      ) : (
        <Grid container>
        <table className="table table-hover table-stripped ">
          <thead>
            <tr>
              <th>Nro. Unidad</th>
              <th>Estado</th>
              <th>Direccion</th>
              <th>Piso</th>
              <th>Depto</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {unidades[0].id === null ? (
              <div className="alert alert-warning my-4">
                No hay unidades para mostrar.
              </div>
            ) : (
              unidades.map(({ edificio_id, estado, id, nro, piso }) => (
                <UsersAdminRowUnidad
                  id={id}
                  key={id}
                  estado={estado}
                  nro={nro}
                  piso={piso}
                  handlerUserSelectedForm={handlerUserSelectedForm}
                  setPassForm={setPassForm}
                  usernameRowSelected={usernameRowSelected}
                  handlerGetUnidadByUsername={handlerGetUnidadByUsername}
                  setUnidades={setUnidades}
                  initialUnidades={initialUnidades}
                />
              ))
            )}
          </tbody>
        </table>
        </Grid>
      )}
      <Grid item >
      {tipoPersonaRowSelected !== "Administrador" && (
        <button className="btn btn-primary my-2" onClick={handlerAddUnidad}>
          Asignar unidad
        </button>
      )}
      </Grid>
    </Paper>
    </Grid>
    </Grid>
    </Container>
  );
};

export default UsersAdmin;
