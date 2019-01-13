import React, { Component } from 'react';
import NavBar from "./components/navbar";
import PortfolioList from './components/portfoliolist'
import './App.css';
import Portfolio from "./components/portfolio";

// This was a pretty difficult task as React wasn't familiar from before. Lots of time went to getting simple things done.

class App extends Component {
    //State to save portfolios and to easily change limits
    state = {
        portfolios:[],
        maxPortfoliosAmount: 10,
    };

    //Handle new portfolios. Started at addportfolio when Add Portfolio button is pressed.
    handleNewPortfolio = (portfolio) => {
        let timestamp = (new Date()).getTime();
        let newPortfolio = [<Portfolio
            id= {'portfolio-'+portfolio + timestamp}
            key={portfolio}
        />];
        this.setState(prevState =>({ portfolios: [...prevState.portfolios, newPortfolio]}))
    };
    //Handle removing of portfolios. Started at portfoliolist by pressing the X.
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
    return (
        <React.Fragment>
            <NavBar
                //new portfolios come from here
                onNewPortfolio={this.handleNewPortfolio}
                //to show a nice counter of the amount of portfolios
                portfoliosAmount={this.state.portfolios.length}
                //limit on the portfolios to disable the button
                maxPortfoliosAmount={this.state.maxPortfoliosAmount}
            />
            <main className="container">
                <div className="component-wrapper">
                    <PortfolioList
                        //list of Portfolios, has access to the deleting of portfolios and App gives portfolios onward
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
