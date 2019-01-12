import React, {Component} from 'react';
import AddPortfolioForm from "./addportfolio";

//Statelesss Functional Component
class NavBar extends Component {
    render () {
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                Navbar <span className={"badge badge-pill badge-secondary"} >{this.props.totalCounters} </span>
            </a>
            <AddPortfolioForm
                addPortfolio = {this.props.onNewPortfolio}
                portfoliosAmount = {this.props.portfoliosAmount}
                maxPortfoliosAmount = {this.props.maxPortfoliosAmount}
            />
        </nav>
    );
    }
};

export default NavBar;
