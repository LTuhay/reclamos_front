import React, {useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useAuth from '../hooks/useAuth';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

export default function ModalAddUser() {

    const { auth } = useAuth();

    const [nombre, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [dni, setDni] = useState("");
    const [edad, setAge] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPwd] = useState("");
    const [tipoPersona, setTipoPersona] = useState("");

    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
    setOpen(true);
    };

    const handleClose = () => {
        setFullName("");
        setEmail("");
        setDni("");
        setAge("");
        setUsername("");
        setPwd("");
        setTipoPersona("");
        setOpen(false);
    };

    const handleChange = (e) => {
        setTipoPersona(e.target.value);
    }

    const handleSubmit = () => {
        handleCreate();
        };

    const handleCreate = async () => {

        const response = await fetch("http://localhost:8080/auth/register", {
            method: "POST",
            withCredentials: true,
            body: JSON.stringify({nombre,email,dni,edad,username,password,tipoPersona}),
            headers: {
              Authorization: "Bearer " + auth.token,
              "Content-Type": "application/json",
            },
            origin: "http://localhost:3000",
            credentials: "include",
            referrerPolicy: "strict-origin-when-cross-origin",
          }).then((res) => res.ok);

        if (response) {
            console.log("created successfully");
            handleClose();
    
           } else {
            console.log("Error");
           }
    };
    
    return (
    <React.Fragment>
        <Button variant="contained" sx={{ mr: 1 }} onClick={handleClickOpen}>
                Add user
              </Button>
        <Dialog open={open} onClose={handleClose} fullWidth>
        <DialogTitle>Add User</DialogTitle>
        <DialogContent>
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Full Name"
            value={nombre}
            onChange={(e) => setFullName(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
            />
        </DialogContent>
        <DialogContent>
            <TextField
            margin="dense"
            id="email"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            fullWidth
            variant="standard"
            required
            />
        </DialogContent>
        <DialogContent>
            <TextField
            margin="dense"
            id="dni"
            label="DNI"
            value={dni}
            onChange={(e) => setDni(e.target.value)}
            type="number"
            fullWidth
            variant="standard"
            required
            />
        </DialogContent>
        <DialogContent>
            <TextField
            margin="dense"
            id="age"
            label="Age"
            value={edad}
            onChange={(e) => setAge(e.target.value)}
            type="number"
            fullWidth
            variant="standard"
            required
            />
        </DialogContent>
        <DialogContent>
            <TextField
            margin="dense"
            id="username"
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
            />
        </DialogContent>
        <DialogContent>
            <TextField
            margin="dense"
            id="pwd"
            label="Password"
            value={password}
            onChange={(e) => setPwd(e.target.value)}
            type="text"
            fullWidth
            variant="standard"
            required
            />
        </DialogContent>
        <DialogContent>
            <FormControl variant="standard" sx={{ m: 1, minWidth: 220 }}>
            <InputLabel id="role">Rol</InputLabel>
            <Select
            id="role"
            value={tipoPersona}
            onChange={handleChange}
            label="Rol"
            required
            >
            <MenuItem value={"Administrador"}>Admin</MenuItem>
            <MenuItem value={"Inquilino"}>Inquilino</MenuItem>
            <MenuItem value={"Propietario"}>Propietario</MenuItem>
            </Select>
        </FormControl>
        </DialogContent>
        <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleSubmit}>Create</Button>
        </DialogActions>
        </Dialog>
    </React.Fragment>
    );
}