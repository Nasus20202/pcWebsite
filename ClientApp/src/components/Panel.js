import React, { Component } from 'react';

export class Panel extends Component {
    static displayName = Panel.name;

    constructor(props) {
        super(props);
        this.submitData = this.submitData.bind();
        this.handleComputerChange = this.handleComputerChange.bind(this);
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

    async populateComputersData() {
        const response = await fetch('api/computers');
        const data = await response.json();
        this.setState({ computers: data, loading: false });
    }

    render() {
        let contents = this.state.loading
            ? <p><em>Loading...</em></p>
            : this.state.computers.map((computer, index) =>
                <div key={computer.computerId}>
                    <div>Komputer {index+1}</div>
                    <input type="text" className="form-control" name="name" value={computer.name} onChange={(e) => this.handleComputerChange(e, computer.computerId)}/>
                    <textarea className="form-control" name="about" value={computer.about} onChange={(e) => this.handleComputerChange(e, computer.computerId)}/>
                    <div>{computer.name}</div>
                    <div>{computer.about}</div>
                    <div>{computer.price/100} zł</div>
                    <div>
                        {computer.parts.map(part =>
                            <span key={part.partId}>{part.name} </span>
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
