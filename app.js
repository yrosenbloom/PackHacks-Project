import React, {Component}  from 'react';
class App extends Component{

  state = {
    isSelected : false
  };

  onChange = e =>{
    this.setState({isSelected : e.target.checked});
  }

  render(){
    const{isSelected} = this.state;
    this.return(
      <form>
        <h1>
          Include this calendar? : {isSelected ? "Yes" : "No"}
        </h1>
        <label>
          Include this calendar?
          <input type="checkbox"
          check={isSelected}
          onChange={onChange}>
          </input>
        </label>
      </form>
    )
  }
}
export default App;