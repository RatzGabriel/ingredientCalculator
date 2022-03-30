import * as React from 'react';
import styled from "styled-components"

import { IngredientList, RecipeList, FormInput } from 'components/index';

//MUI
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from "@mui/material/Button"
import { fontWeight } from '@mui/system';


interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);
  const [createRecipe, setCreateRecipe] = React.useState(false);
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  let bgColor = createRecipe ? "black" : "#1565c0"


  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Ingredient List" {...a11yProps(0)} />
          <Tab label="Recipe List" {...a11yProps(1)} />
        </Tabs>
        <Box sx={{ width: "100%" }}>
          {<Button sx={{ margin: "3rem 0", backgroundColor: bgColor, "&:hover": { backgroundColor: "black" } }} onClick={() => setCreateRecipe(!createRecipe)} variant="contained">{createRecipe ? "X" : "Create new Recipe"}</Button>}
          {createRecipe && <FormInput />}
        </Box>
      </Box>
      <TabPanel value={value} index={0}>
        Here is everything you need to buy!
      </TabPanel>
      <TabPanel value={value} index={1}>
      </TabPanel>
      <RecipeMainDiv>
        {value === 0 && <div> <IngredientList />


        </div>
        }
        {value === 1 && <RecipeList />}
      </RecipeMainDiv>
    </Box >
  );
}

const RecipeMainDiv = styled.div`
display: flex;
justify-content:space-between ;
flex-wrap:wrap ;

`
