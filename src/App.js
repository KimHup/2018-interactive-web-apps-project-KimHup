import React, { Component } from 'react';
import NavBar from "./components/navbar";
import Counters from './components/counters'
import PortfolioList from './components/portfoliolist'
import './App.css';
import Counter from "./components/counter";


class App extends Component {
    state = {
        counters: [
            { id: 1, value: 4},
            { id: 2, value: 0},
            { id: 3, value: 0},
            { id: 4, value: 0},
        ],
        portfolios:[],
        maxPortfoliosAmount: 10,
    };

    handleDelete = (counterId) => {
        const counters = this.state.counters.filter(c => c.id !== counterId);
        this.setState({ counters})
    };

    handleReset = () => {
        const counters = this.state.counters.map(c => {
            c.value = 0;
            return c;
        });
        this.setState({counters});
    };
    handleIncrement = counter => {
        const counters = [...this.state.counters];
        const index = counters.indexOf(counter);
        counters[index] = {...counter};
        counters[index].value++;
        this.setState({ counters })
    };
    handleNewPortfolio = (portfolio) => {
        //const portfolios = [...this.state.portfolios];
        var timestamp = (new Date()).getTime();
        this.state.portfolios['portfolio-' + timestamp ] = portfolio;
        var newPortfolio = [<Counters
            id= {'portfolio-'+portfolio + timestamp}
            key={portfolio}
            counters={this.state.counters}
            onReset={this.handleReset}
            onIncrement={this.handleIncrement}
            onDelete={this.handleDelete}
        />];
        this.setState(prevState =>({ portfolios: [...prevState.portfolios, newPortfolio]}))
    };
    handleRemovePortfolio = (id) => {
        for (let i=0; i<this.state.portfolios.length; i++){
            let portfolioId = this.state.portfolios[i][0].props.id;
            if (portfolioId === id) {
                this.state.portfolios.splice(i,1)
            }
            this.setState( this.state )
        }
    };


    render() {
        console.log("in App render: "+JSON.stringify(this.state.portfolios))
    return (
        <React.Fragment>
            <NavBar
                totalCounters={this.state.counters.filter(c => c.value > 0).length}
                onNewPortfolio={this.handleNewPortfolio}
                portfoliosAmount={this.state.portfolios.length}
                maxPortfoliosAmount={this.state.maxPortfoliosAmount}
            />
            <main className="container">
                <div className="component-wrapper">
                    <PortfolioList
                        portfolios={this.state.portfolios}
                        onRemovePortfolio={this.handleRemovePortfolio}
                    />

                </div>
            </main>
        </React.Fragment>
    );
  }
}

export default App;

class Label extends React.Component {
    render() {
        var labelStyle = {
            fontFamily: "sans-serif",
            fontWeight: "bold",
            padding: 13,
            margin: 0
        };

        return (
            <p style={labelStyle}>{this.props.color}</p>
        )
    };
}

class Square extends React.Component {
    render(){
        var squareStyle = {
            height: 150,
            backgroundColor:  this.props.color
        };

        return(
            <div style={squareStyle}>

            </div>
        );
    }
}

class Card extends React.Component {
    render(){
        var cardStyle = {
            height: 200,
            width: 150,
            padding: 0,
            backgroundColor: "#FFF",
            WebkitFilter: "drop-shadow(0px 0px 5px #666)",
            filter: "drop-shadow(0px 0px 5px #666)"
        };

        return (
            <div style={cardStyle}>
                <Square color={this.props.color}/>
                <Label color={this.props.color}/>
            </div>
        );
    }
}
