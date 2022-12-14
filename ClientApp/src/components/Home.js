import React, { Component } from 'react';
import {NavLink, UncontrolledCollapse} from "reactstrap";
import { Parallax } from 'react-parallax';
import {Link} from "react-router-dom";


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
        <div className="list-group computer-list">
          {computers.map(computer =>
              <div className="list-group-item" key={computer.computerId}>
                <div id={"toggler-" + computer.computerId}><span className="h3">{computer.name}</span><span className="float-end">{(computer.price/100).toFixed(2)} zł</span> </div>
                <UncontrolledCollapse toggler={"#toggler-" + computer.computerId} style={{marginTop:'10px'}}>
                <div dangerouslySetInnerHTML={{__html: computer.about}}></div>
                  <table className="table">
                    <thead>
                    <tr>
                      <th scope="col">Kategoria</th>
                      <th scope="col">Nazwa</th>
                      <th scope="col">Cena</th>
                      <th scope="col">Zdjęcie</th>
                    </tr>
                    </thead>
                    <tbody>
                    {computer.parts.map(part =>
                        [<tr key={part.partId}>
                          <td scope="row">{part.category}</td>
                          <th>{part.name}</th>
                          <td>{(part.price/100).toFixed(2)} zł</td>
                          <td>{part.photo !== "" ? <img className="img-fluid part-photo" src={part.photo} alt={part.name} /> : "" } </td>
                        </tr>,
                            part.about !== "" ?
                          <tr key={part.partId + "-about"}>
                            <td colSpan={4} style={{background: '#f9f9f9', fontSize: '0.9em', color: '#444'}} dangerouslySetInnerHTML={{__html: part.about}}></td>
                          </tr> : '']
                        
                    )}
                    </tbody>
                  </table>
                </UncontrolledCollapse>
              </div>
          )}
          <Link style={{color: 'inherit', textDecoration: 'none'}} to="/kontakt" className="list-group-item">Jeśli potrzebujesz pomocy w wyborze komponentów lub złożeniu komputera, zapraszam do kontaktu</Link>
        </div>
    );
  }

  render() {
    let contents = this.state.loading
        ? <p><em>Loading...</em></p>
        : Home.renderComputers(this.state.computers);

    return (
        <div>
          <div className="list-group computer-list list-group-item" style={{margin: '80px 0 30px 0'}}>
            <h1 className="d-flex justify-content-center" style={{fontSize: '3.5em'}}>Polecane komputery</h1>
            <h5 className="d-flex justify-content-center" style={{fontSize: '1.5em'}}>Lista polecanych zestawów podzespołów komputerowych</h5>
          </div>
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
