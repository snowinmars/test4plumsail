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
import {Sex} from '../../types/enums';
import config from '../../config/api';
import TextField from '@material-ui/core/TextField';
import Chip from "@material-ui/core/Chip";
import {TablePagination} from "@material-ui/core";

const renderTraining = (dog: DogReadModel) => {
  return (
    <div>
      {dog.hasManners && <Chip label="Manners" />}
      {dog.hasObedience && <Chip label="Obedience" />}
    </div>
  );
};

const renderDog = (dog: DogReadModel) => {
  return (
    <TableRow key={dog.id}>
      <TableCell align='left'>
        <img src={dog.avatar || config.defaultAvatar} alt={'dog avatar'} />
      </TableCell>
      <TableCell align='left'>{dog.name}</TableCell>
      <TableCell align='left'>
        {
          dog.sex === Sex.Male ?
            <span>Male</span> :
            <span>Female</span>
        }
      </TableCell>
      <TableCell align='left'>{dog.breed}</TableCell>
      <TableCell align='left'>{dog.birthDay}</TableCell>
      <TableCell align='left'>{renderTraining(dog)}</TableCell>
    </TableRow>
  );
};

const searchOff = () => <i className={'material-icons'}>search_off</i>;

function List(): JSX.Element {
  const [dogs, setDogs] = useState<DogReadModel[]>([]);
  const [dogsCount, setDogsCount] = useState<number>(0);
  const [page, setPage] = useState(0);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
    loadDogs(newPage);
  };

  const loadDogs = (page: number, search = '') => {
    void list(page, config.paging.perPage, search).then((x) => {
      if ((x.status >= 200 || x.status < 300) && x.data.isSucceed) {
        setDogs(x.data.data);
        setDogsCount(x.data.count);
        return 0;
      }

      throw new Error(JSON.stringify(x));
    });
  };

  useEffect(() => {
    loadDogs(0);
  }, []);

  return (
    <TableContainer component={Paper}>
      <TextField
        label='Search field'
        type='search'
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => loadDogs(0, e.target.value)}
      />

      <Table aria-label='simple table' className={'plum-dog-list'}>
        <TableHead>
          <TableRow>
            <TableCell>Avatar</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Sex {searchOff()}</TableCell>
            <TableCell>Breed {searchOff()}</TableCell>
            <TableCell>Birthday</TableCell>
            <TableCell>Training {searchOff()}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dogs.map((dog) => renderDog(dog))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={dogsCount}
        rowsPerPage={config.paging.perPage}
        rowsPerPageOptions={[config.paging.perPage]}
        page={page}
        onChangePage={handleChangePage}
      />
    </TableContainer>
  );
}

export default List;
