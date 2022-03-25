import './App.css';
import FormInput from './components/FormInput';
import IngredientList from './components/IngredientList/IngredientList';
import RecipeList from './components/RecipeList';
import configAppStore from './store/configureStore';
import { Provider } from "react-redux";
import styled from "styled-components";
import Navbar from './components/Navbar';
import TabPanel from "./components/Tabs"
const store = configAppStore()

function App() {

  return (
    <Provider store={store}>
      <Navbar />
      <MainDiv>
        <TabPanel />
      </MainDiv>
    </Provider>
  );
}

export default App;

const TitleRecipes = styled.h2`
font-size: 2rem;
font-weight:bold ;
margin-bottom:2rem ;
margin-top:2rem ;
`

const FormInputDiv = styled.div`
width:50% ;
`

const TitleH1 = styled.h1`
font-size:3rem ;
margin-bottom:2rem ;
font-weight:bold ;
`

const IngredientListDiv = styled.div`
width:20% ;
`

const MainDiv = styled.div`
display:flex ;
flex-direction: column;
padding-top:2rem ;
width:80% ;
margin:0 auto ;
`

const MainUpperDiv = styled.div`
display:flex ;
justify-content:space-between ;
`