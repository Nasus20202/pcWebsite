import React, { Component } from 'react';

export class Panel extends Component {
    static displayName = Panel.name;

    constructor(props) {
        super(props);
        this.submitData = this.submitData.bind();
        this.handleComputerChange = this.handleComputerChange.bind(this);
        this.removeComputer = this.removeComputer.bind(this);
        this.addPart = this.addPart.bind(this);
        this.handlePartChange = this.handlePartChange.bind(this);
        this.removePart = this.removePart.bind(this);
        this.state = {
            computers: []
        }
    }
    componentDidMount() {
        this.populateComputersData();
    }
    
    submitData(event){
        event.preventDefault();
        alert(12)
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
    
    addPart(event, index){
        this.setState({
            computers: this.state.computers.map(computer =>{
                if(computer.computerId === index) {
                    return {...computer, parts: [...computer.parts, {category: "", name: "", price: 0, photo: "", partId: computer.parts.length + 1}]}
                }
                return computer;
            })
        });
    }

    removePart(event, computerId, index){
        this.setState({
            computers: this.state.computers.map(computer =>{
                if(computer.computerId === computerId) {
                    return {...computer, parts: computer.parts.filter(p => p.partId !== index)}
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
                    return {...computer, parts: computer.parts.map(part => {
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
                                let floatValue = parseFloat(value)
                                if(value === "")
                                    return {...part, price: 0}
                                else if(!isNaN(floatValue))
                                    return {...part, price: floatValue}
                                else 
                                    return {...part}
                            }
                        }
                        return part;
                    })}
                }
                return computer;
            })
        })
    }

    async populateComputersData() {
        const response = await fetch('api/computers');
        let data = await response.json();
        this.setState({ computers: data, loading: false });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.computers.map((computer, index) =>
                <div key={computer.computerId}>
                    <div>
                        <div className="h4">Komputer {index+1}</div>
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
                    <div>{computer.name}</div>
                    <div>{computer.about}</div>
                    <div>{computer.price/100} zł</div>
                    <div>
                        <div className="h5">Podzespoły</div>
                        {computer.parts.map(part =>
                            <div key={part.partId}>
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
                                <hr/>
                            </div>
                        )}
                        {computer.parts.map(part =>
                            <div key={part.partId}>
                                {part.name}
                                {part.price}
                            </div>
                        )}
                    </div>
                </div>
            );
        return (
            <div>
                <h1>Panel</h1>
                <form onSubmit={event => event.preventDefault()}>
                    {contents}
                    <button onClick={this.submitData} type="button" className="btn btn-primary">Submit</button>
                </form>
            </div>
        );
    }
}
