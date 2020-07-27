import React from 'react';
import { BrowserRouter as Router, Route} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar/NavBar';
import Home from './components/Home/Home';
import Latest from './components/Latest/Latest';
import MovieDetails from './components/MovieDetails/MovieDetails';
import MyFavorites from './components/MyFavorites/MyFavorites';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import { Layout} from 'antd';
import 'antd/dist/antd.css';
const { Footer } = Layout;

function App() {
  return (
    <Router>
      <NavBar/>
      <Route exact path='/' component={Home} />
      <Route exact path='/latest' component={Latest} />
      <Route exact path='/movie/:movieId' component={MovieDetails} />
      <Route exact path='/favorites' component={MyFavorites} />
      <Route exact path='/login' component={Login} />
      <Route exact path='/register' component={Register} />
      <Footer style={{ textAlign: 'center' }}>My-Movie ©2020 Created by SSSAANG</Footer>
    </Router>
  );
}

export default App;
