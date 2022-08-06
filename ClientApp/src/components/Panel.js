import React, { Component } from 'react';
import {UncontrolledCollapse} from "reactstrap";

export class Panel extends Component {
    static displayName = Panel.name;

    constructor(props) {
        super(props);
        this.submitData = this.submitData.bind(this);
        this.handleComputerChange = this.handleComputerChange.bind(this);
        this.removeComputer = this.removeComputer.bind(this);
        this.addPart = this.addPart.bind(this);
        this.handlePartChange = this.handlePartChange.bind(this);
        this.removePart = this.removePart.bind(this);
        this.addComputer = this.addComputer.bind(this);
        this.handleCredentialsChange = this.handleCredentialsChange.bind(this);
        this.state = {
            computers: [],
            username: '',
            password: '',
            message: ''
        }
    }
    componentDidMount() {
        this.populateComputersData();
    }
    
    handleComputerChange(event, index){
        let name = event.target.name, value = event.target.value;
        this.setState({
            computers: this.state.computers.map(computer =>{
                if(computer.computerId === index) {
                    if(name === "name")
                        return {...computer, name: value};
                    if(name === "about")
                        return {...computer, about: value};
                }
                return computer;
            })
        })
    }
    
    removeComputer(event, index) {
        this.setState({
            computers: this.state.computers.filter(c => c.computerId !== index)
        });
    }

    addComputer(event, index) {
        this.setState({
            computers: [...this.state.computers, {name: "Nowy komputer", about:"", price: 0, parts: [], computerId: this.state.computers.length > 0 ? this.state.computers[this.state.computers.length-1].computerId + 1 : 0}]
        });
    }
    
    addPart(event, index){
        this.setState({
            computers: this.state.computers.map(computer =>{
                if(computer.computerId === index) {
                    return {...computer, parts: [...computer.parts, {category: "", name: "Nowy podzespół", price: 0, photo: "", partId: computer.parts.length > 0 ? computer.parts[computer.parts.length-1].partId + 1 : 0}]}
                }
                return computer;
            })
        });
    }

    removePart(event, computerId, index){
        this.setState({
            computers: this.state.computers.map(computer =>{
                if(computer.computerId === computerId) {
                    let newComputer = {...computer, parts: computer.parts.filter(p => p.partId !== index)}
                    return {...newComputer, price: this.calculateComputerPrice(newComputer)}
                }
                return computer;
            })
        });
    }
    
    handlePartChange(event, computerId, index){
        let name = event.target.name, value = event.target.value;
        this.setState({
            computers: this.state.computers.map(computer =>{
                if(computer.computerId === computerId) {
                    let newComputer =  {...computer, parts: computer.parts.map(part => {
                        if(part.partId === index){
                            if(name === "name")
                                return {...part, name: value}
                            if(name === "category")
                                return {...part, category: value}
                            if(name === "about")
                                return {...part, about: value}
                            if(name === "photo")
                                return {...part, photo: value}
                            if(name === "price") {
                                let intValue = parseInt(value)
                                if(value === "")
                                    return {...part, price: 0}
                                else if(!isNaN(intValue))
                                    return {...part, price: intValue}
                                else 
                                    return {...part}
                            }
                        }
                        return part;
                    })}
                    return {...newComputer, price: this.calculateComputerPrice(newComputer)}
                }
                return computer;
            })
        })
    }

    calculateComputerPrice(computer){
        let price = 0;
        computer.parts.forEach(part => {price += part.price});
        return price;
    }
    
    handleCredentialsChange(event){
        this.setState({
            [event.target.name]: event.target.value
        })
    }
    
    async populateComputersData() {
        const response = await fetch('api/computers');
        let data = await response.json();
        this.setState({ computers: data, loading: false });
    }

    async submitData(event){
        event.preventDefault();
        let body = [];
        this.state.computers.forEach(computer => {
            let parts = [];
            computer.parts.forEach(part => {
                parts = [...parts, {name: part.name, about: part.about, price: part.price, category: part.category, photo: part.photo}]
            })
            let computerData = {name: computer.name, about: computer.about, parts: parts}
            body = [...body, computerData]
        })
        const response = await fetch('api/computers', {
            method: 'POST',
            headers: {
                'username': this.state.username,
                'password': this.state.password,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        })
        if(response.status === 200)
            this.setState({message: 'Zaktualizowano dane'})
        else if(response.status === 403)
            this.setState({message: 'Błędne dane logowania'})
        else 
            this.setState({message: 'Błędne dane'})
    }


    render() {
        let message = this.state.message !== '' ? <div className="alert alert-primary mt-3" role="alert">
            {this.state.message}
            </div> : "";
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.computers.map((computer, index) =>
                <div key={computer.computerId} className="list-group-item">
                    <div className="h4" id={"toggler-computer-" + computer.computerId}>{computer.name}<span className="float-end">{(computer.price/100).toFixed(2)} zł</span></div>
                    <UncontrolledCollapse toggler={"#toggler-computer-" + computer.computerId}>
                        <div>
                            <span className="btn btn-danger mb-1 float-end" onClick={(e) => this.removeComputer(e, computer.computerId)}>Usuń</span>
                            <span className="btn mx-1 btn-primary mb-1 float-end" onClick={(e) => this.addPart(e, computer.computerId)}>Dodaj podzespół</span>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">Nazwa</label>
                            <input type="text" className="form-control" name="name" value={computer.name} onChange={(e) => this.handleComputerChange(e, computer.computerId)}/>
                        </div>
                        <div className="mb-2">
                            <label className="form-label">O zestawie</label>
                            <textarea className="form-control" name="about" value={computer.about} onChange={(e) => this.handleComputerChange(e, computer.computerId)}/>
                        </div>
                        <div className="h5">Cena: <b>{(computer.price/100).toFixed(2)} zł</b></div>
                        <div>
                            <div className="h4">Podzespoły</div>
                            {computer.parts.map(part =>
                                <div key={part.partId}>
                                    <div className="h5" id={"toggler-computer-" + computer.computerId + "-part-" + part.partId}>{part.name}</div>
                                    <UncontrolledCollapse defaultOpen={true} toggler={"#toggler-computer-" + computer.computerId + "-part-" + part.partId}>
                                        <div className="mb-2 row">
                                            <div className="col-sm-6">
                                                <label className="form-label">Nazwa</label>
                                                <input type="text" className="form-control" name="name" value={part.name} onChange={(e) => this.handlePartChange(e, computer.computerId, part.partId)}/>
                                            </div>
                                            <div className="col-sm-6">
                                                <label className="form-label">Kategoria</label>
                                                <input type="text" className="form-control" name="category" value={part.category} onChange={(e) => this.handlePartChange(e, computer.computerId, part.partId)}/>
                                            </div>
                                            <div className="col-sm-6 mt-1">
                                                <label className="form-label">Opis</label>
                                                <textarea rows={3} className="form-control" name="about" value={part.about} onChange={(e) => this.handlePartChange(e, computer.computerId, part.partId)}/>
                                            </div>
                                            <div className="col-sm-6 mt-3">
                                                <label className="form-label">Zdjęcie</label>
                                                <input type="text" className="form-control" name="photo" value={part.photo} onChange={(e) => this.handlePartChange(e, computer.computerId, part.partId)}/>
                                                <div className="row mt-1">
                                                    <div className="col-2 mt-1">
                                                        <label className="form-label">Cena</label>
                                                    </div>
                                                    <div className="col-8">
                                                    <input min={0} type="text" className="form-control" name="price" value={part.price} onChange={(e) => this.handlePartChange(e, computer.computerId, part.partId)}/>
                                                    </div>
                                                    <div className="btn btn-danger col-2" onClick={(e) => this.removePart(e, computer.computerId, part.partId)}>Usuń</div>
                                                </div>
                                            </div>
                                        </div>
                                    </UncontrolledCollapse>
    
                                </div>
                            )}
                        </div>
                    </UncontrolledCollapse>
                </div>
            );
        return (
            <div>

                <form className="list-group computer-list" onSubmit={event => event.preventDefault()}>
                    <div className="pb-2 list-group-item">
                        <div className="btn btn-primary float-end mt-3" onClick={this.addComputer}>Dodaj zestaw</div>
                        <h1>Panel</h1>
                    </div>
                    {contents}
                    <div className="list-group-item">
                    <div className="row  py-2" >
                        <div className="col-sm-5">
                            <input type="text" onChange={this.handleCredentialsChange} placeholder="Nazwa użytkownika" className="form-control" name="username" value={this.state.username}/>
                        </div>
                        <div className="col-sm-5">
                            <input type="password" onChange={this.handleCredentialsChange} placeholder="Hasło" className="form-control" name="password" value={this.state.password}/>
                        </div>
                        <div className="col-sm-2">
                            <button onClick={this.submitData} type="button" className="btn btn-primary">Zapisz zmiany</button>
                        </div>
                    </div>
                    </div>
                </form>
                {message}
            </div>
        );
    }
}
