import './App.css';
import configAppStore from './api/store/configureStore';
import { Provider } from "react-redux";
import styled from "styled-components";
import Navbar from './components/Navbar/Navbar';
import TabPanel from "./pages/tabs"
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


const MainDiv = styled.div`
display:flex ;
flex-direction: column;
padding-top:2rem ;
width:80% ;
margin:0 auto ;
`

