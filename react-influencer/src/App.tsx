import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './public/Login';
import Main from './pages/Main';
import Rankings from './pages/Rankings';
import Register from './public/Register';
import Stats from './pages/Stats';
import axios from 'axios';
import { constants } from './constants';

function App() {
  axios.defaults.baseURL = constants.BASE_URL;


  return (
    <div className='App'>

      <BrowserRouter>
        <Route exact path={'/'} component={Main} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
        <Route path={'/rankings'} component={Rankings} />
        <Route path={'/stats'} component={Stats} />
      </BrowserRouter>

    </div >
  );
}

export default App;
