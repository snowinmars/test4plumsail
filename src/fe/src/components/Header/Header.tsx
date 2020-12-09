import React from 'react';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';

interface Props {
  value: number;
  setValue: (event: React.ChangeEvent<unknown>, newValue: number) => void;
}

function Header(props: Props): JSX.Element {
  const {value, setValue} = props;

  return (
    <header>
      <Tabs value={value} onChange={setValue} aria-label='simple tabs example'>
        <Tab icon={<i className={'material-icons'}>list</i>} />
        <Tab icon={<i className={'material-icons'}>add</i>} />
      </Tabs>
    </header>
  );
}

export default Header;
