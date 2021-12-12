import './App.css';

import { BrowserRouter, Route } from 'react-router-dom';

import Login from './public/Login';
import Main from './pages/Main';
import Register from './public/Register';
import axios from 'axios';

function App() {
  axios.defaults.baseURL = 'http://localhost:8014/api/influencer';


  return (
    <div className='App'>

      <BrowserRouter>
        <Route exact path={'/'} component={Main} />
        <Route path={'/login'} component={Login} />
        <Route path={'/register'} component={Register} />
      </BrowserRouter>

    </div >
  );
}

export default App;
