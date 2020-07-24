import React,{Component} from 'react';
import {movieAPIKey, movieURI} from '../config';


export default class Home extends Component {
  constructor(props) {
    super(props);
  }
  useEffect() {

  }
  render() {
    return(
      <div>
        <h1>{config.mongoURI}</h1>
        <h2 style={{textAlign: "center"}}>Home Page</h2>
      </div>
    );
  }
}
