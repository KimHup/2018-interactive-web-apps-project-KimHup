import React, {Component} from 'react';
import AddPortfolioForm from "./addportfolio";

class NavBar extends Component {
    render () {
    return (
        <nav className="navbar navbar-light bg-light">
            <a className="navbar-brand" href="#">
                <h2>SPMS </h2>
                <h7 className="font-italic" >Stock Portfolio Management System </h7>
            </a>
            <div className="navbar navbar-light m-2">
                <span className={"badge badge-pill badge-secondary m-2"} >{this.props.portfoliosAmount} </span>
            <AddPortfolioForm
                /* A popup button where you add portfolios*/
                addPortfolio = {this.props.onNewPortfolio}
                portfoliosAmount = {this.props.portfoliosAmount}
                maxPortfoliosAmount = {this.props.maxPortfoliosAmount}
            />
            </div>
        </nav>
    );
    }
}

export default NavBar;
