import React, {useState} from 'react';
import Radio from '@material-ui/core/Radio';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import Checkbox from '@material-ui/core/Checkbox';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import FormLabel from '@material-ui/core/FormLabel';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import api from '../../config/api';
import {Breed, Sex} from '../../types/enums';
import {DogCreateModel} from '../../types/models';
import {onFormChange, save, onFormEnumChange, onFormCheckboxChange, onAvatarChange} from './Store';
import './Create.scoped.scss';

function Create(): JSX.Element {
  const [form, setForm] = useState<DogCreateModel>({
    name: null,
    sex: null,
    birthDay: null,
    breed: null,
    hasObedience: false,
    hasManners: false,
    avatar: null,
  });

  const [isAvatarLoading, setIsAvatarLoading] = useState(false);
  const [isCreated, setIsCreated] = useState(false);

  return (
    <form
      className={'plum-create-form'}
      onSubmit={(e) => {
        e.preventDefault();
        return save(form)
          .then((x) => {
            setIsCreated(x);

            return setTimeout(() => {
              setIsCreated(false);
            }, 1000);
          });
      }}
    >
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
          required
          label='День рождения'
          type='date'
          value={form.birthDay}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            onFormChange(e, form, (f, v) => setForm({...f, birthDay: v}))}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </div>

      <div className={'plum-secondary-dog-info'}>
        <FormControl
          required
          component='fieldset'
        >
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

            return onAvatarChange(e.target.files[0], form, (f, v) => setForm({...f, avatar: v}))
              .then(() => setIsAvatarLoading(false));
          }}
        />
        <label htmlFor={'plum-choose-file'}>
          <Avatar
            className={'plum-avatar'}
            alt={'Dog avatar'}
            src={form.avatar || api.defaultAvatar}
          />
          {isAvatarLoading && <div className={'plum-avatar-spinner'}> </div>}
        </label>
      </div>

      <div className={'plum-form-controls'}>
        <FormControl>
          <Button
            disabled={!form.name || !form.sex || !form.birthDay || !form.breed}
            variant={'contained'}
            color={'primary'}
            type={'submit'}
          >
            {isCreated && <i className={'material-icons'}>done</i>}
            {!isCreated && <i className={'material-icons'}>arrow_right_alt</i>}
          </Button>
        </FormControl>
      </div>
    </form>
  );
}

export default Create;
