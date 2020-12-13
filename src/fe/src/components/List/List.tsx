import React, {useEffect, useState} from 'react';
import './List.scoped.scss';
import {DogReadModel} from '../../types/models';
import {list} from './Store';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {Sex} from "../../types/enums";
import config from '../../config/api';
import TextField from "@material-ui/core/TextField";

const renderTraining = (dog: DogReadModel) => {
  return (
    <div>
      {dog.hasManners && <span>
        M
      </span>}

      {dog.hasObedience && <span>
        O
      </span>}
    </div>
  );
};

const renderDog = (dog: DogReadModel) => {
  return (
    <TableRow key={dog.id}>
      <TableCell align="left">
        <img src={dog.avatar || config.defaultAvatar} alt={'dog avatar'} />
      </TableCell>
      <TableCell align="left">{dog.name}</TableCell>
      <TableCell align="left">
        {
          dog.sex === Sex.Male ?
            <span>Male</span> :
            <span>Female</span>
        }
      </TableCell>
      <TableCell align="left">{dog.breed}</TableCell>
      <TableCell align="left">{dog.birthDay}</TableCell>
      <TableCell align="left">{renderTraining(dog)}</TableCell>
    </TableRow>
  );
};

function List() {
  const [dogs, setDogs] = useState<DogReadModel[]>([]);

  useEffect(() => {
    void list(0, 10).then((x) => {
      if ((x.status >= 200 || x.status < 300) && x.data.isSucceed) {
        return setDogs(x.data.data);
      }

      throw new Error(JSON.stringify(x));
    });
  }, []);

  return (
    <TableContainer component={Paper}>
      <TextField
        label="Search field"
        type="search"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => list(0, 10, e.target.value)
          .then((x) => {
            if ((x.status >= 200 || x.status < 300) && x.data.isSucceed) {
              return setDogs(x.data.data);
            }

            throw new Error(JSON.stringify(x));
          })}
      />

      <Table aria-label="simple table" className={'plum-dog-list'}>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sex</TableCell>
            <TableCell>Breed</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Training</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dogs.map((dog) => renderDog(dog))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default List;
