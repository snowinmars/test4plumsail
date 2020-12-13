import React from 'react';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '../../components/List/List';
import Header from '../../components/Header/Header';
import Create from '../../components/Create/Create';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel = (props: TabPanelProps) => {
  const {children, value, index, ...other} = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
};

function App(): JSX.Element {
  const [value, setValue] = React.useState(0);

  const handleChange = (event: React.ChangeEvent<unknown>, newValue: number): void => {
    setValue(newValue);
  };

  return (
    <div className='plum-app'>
      <Header value={value} setValue={handleChange}/>
      <TabPanel value={value} index={0}>
        <List />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <Create />
      </TabPanel>
    </div>
  );
}

export default App;
