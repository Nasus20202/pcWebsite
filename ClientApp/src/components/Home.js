import React, { Component } from 'react';

export class Home extends Component {
  static displayName = Home.name;

  constructor(props) {
    super(props);
    this.state = { computers: [], loading: true };
  }

  componentDidMount() {
    this.populateComputersData();
  }

  static renderComputers(computers) {
    return (
        <table className='table table-striped' aria-labelledby="tabelLabel">
          <thead>
          <tr>
            <th>Name</th>
            <th>About</th>
            <th>Price</th>
            <th>Parts</th>
          </tr>
          </thead>
          <tbody>
          {computers.map(computer =>
              <tr key={computer.computerId}>
                <td>{computer.name}</td>
                <td>{computer.about}</td>
                <td>{computer.price/100} zł</td>
                <td>
                    {computer.parts.map(part =>
                        <span key={part.partId}>{part.name} </span> 
                    )}
                </td>
              </tr>
          )}
          </tbody>
        </table>
    );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Home.renderComputers(this.state.computers);

    return (
        <div>
          <h1 id="tabelLabel" >Polecane computery</h1>
          <p>This component demonstrates fetching data from the server.</p>
          {contents}
        </div>
    );
  }

  async populateComputersData() {
    const response = await fetch('api/computers');
    const data = await response.json();
    this.setState({ computers: data, loading: false });
  }
}
