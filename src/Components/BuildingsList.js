import * as React from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';
import { useNavigate } from 'react-router-dom';

export default function GridEdificios( {buildingList} ) {

    const navigate = useNavigate();
  return (
    <React.Fragment>
      <Title>Lista Edificios</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Edificio ID</TableCell>
            <TableCell>Direccion</TableCell>
            <TableCell>Unidades</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {buildingList.map((b) => (
            <TableRow key={b.id}>
                <TableCell>{b.id}</TableCell>
              <TableCell>{b.direccion}</TableCell>
              <TableCell>{b.unidades.length}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Link color="primary" onClick={() => navigate("/edificios")} sx={{ mt: 3 }}>
        Ver mas Edificios
      </Link>
    </React.Fragment>
  );
}