import React, {useState} from 'react';
import './Add.scoped.scss';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import Checkbox from '@material-ui/core/Checkbox';
import {Sex, Breed, Dog} from './Types';
import {onFormChange, onFormEnumChange, onFormCheckboxChange, onAvatarChange} from './Store';
import {Avatar} from '@material-ui/core';
import api from '../../config/api';

function Add(): JSX.Element {
  const [form, setForm] = useState<Dog>({
    name: null,
    sex: null,
    birthDate: null,
    breed: null,
    hasObedience: false,
    hasManners: false,
    avatarUri: null,
  });

  const [isAvatarLoading, setIsAvatarLoading] = useState(false);

  return (
    <form className={'plum-add-form'}>
      <div className={'plum-primary-dog-info'}>
        <TextField
          required
          label='Кличка'
          value={form.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange(e, form, (f, v) => setForm({...f, name: v}))}
        />

        <TextField
          required
          label='Пол'
          select
          value={form.sex}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormEnumChange<Sex>(e, form, (f, v) => setForm({...f, sex: v}))}
        >
          <MenuItem key={'male'} value={'male'}>
            Male
          </MenuItem>
          <MenuItem key={'female'} value={'female'}>
            Female
          </MenuItem>
        </TextField>

        <TextField
          label='День рождения'
          type='date'
          value={form.birthDate}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange(e, form, (f, v) => setForm({...f, birthDate: v}))}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className={'plum-secondary-dog-info'}>
        <FormControl component='fieldset'>
          <FormLabel component='legend'>Breed</FormLabel>
          <RadioGroup
            aria-label='breed'
            name='breed'
            value={form.breed}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              onFormEnumChange<Breed>(e, form, (f, v) => setForm({...f, breed: v}))}
          >
            <FormControlLabel value='shepard' control={<Radio />} label='Shepard' />
            <FormControlLabel value='laika' control={<Radio />} label='Laika' />
          </RadioGroup>
        </FormControl>

        <FormControl component='fieldset'>
          <FormLabel component='legend'>Training</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                name='obedience'
                checked={form.hasObedience}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onFormCheckboxChange(e, form, (f, v) => v === 'obedience' && setForm({...f, hasObedience: !f.hasObedience}));
                }}
              />}
            label='Obedience'
          />
          <FormControlLabel
            control={
              <Checkbox
                name='manners'
                checked={form.hasManners}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  onFormCheckboxChange(e, form, (f, v) => v === 'manners' && setForm({...f, hasManners: !f.hasManners}));
                }}
              />}
            label='Manners'
          />
        </FormControl>
      </div>

      <div className={'plum-image-input'}>
        <input
          accept={'image/*'}
          id={'plum-choose-file'}
          formEncType={'multipart/form-data'}
          name={'avatar'}
          type={'file'}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) return;

            setIsAvatarLoading(true);

            return onAvatarChange(e.target.files[0], form, (f, v) => setForm({...f, avatarUri: v}))
              .then(() => setIsAvatarLoading(false));
          }}
        />
        <label htmlFor={'plum-choose-file'}>
          <Avatar
            className={'plum-avatar'}
            alt={'Dog avatar'}
            src={form.avatarUri || api.defaultAvatar}
          />
          {isAvatarLoading && <div className={'plum-avatar-spinner'}> </div>}
        </label>
      </div>

      <div className={'plum-form-controls'}>
        <FormControl>
          <Button
            variant={'contained'}
            color={'primary'}
            type={'submit'}
          >
            <i className={'material-icons'}>arrow_right_alt</i>
          </Button>
        </FormControl>
      </div>
    </form>
  );
}

export default Add;
