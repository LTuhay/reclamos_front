import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

export default function GridReclamos( {reclamoList} ) {

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <Title>Ultimos Reclamos</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Titulo</TableCell>
            <TableCell>Descripcion</TableCell>
            <TableCell>Actualizacion</TableCell>
            <TableCell>Estado Reclamo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {reclamoList.map((reclamo) => (
            <TableRow key={reclamo.userid}>
              <TableCell>{reclamo.titulo}</TableCell>
              <TableCell>{reclamo.descripcion}</TableCell>
              <TableCell>{reclamo.actualizacion}</TableCell>
              <TableCell>{reclamo.estadoReclamo}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" onClick={() => navigate("/reclamos")} sx={{ mt: 3 }}>
        Ver mas Reclamos
      </Link>
    </React.Fragment>
  );
}