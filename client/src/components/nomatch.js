import React,{Component} from 'react';
import styled from 'styled-components';
const Wrapper = styled.div`
  margin-top: 1em;
  margin-left: 6em;
  margin-right: 6em;
`;
export default class NoMatch extends Component {
  render() {
    return(
      <Wrapper>
        <h2>No Match</h2>
      </Wrapper>
    );
  }
}
