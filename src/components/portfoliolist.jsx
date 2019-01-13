import React, {Component} from 'react';
import Portfolio from "./portfolio";

// Show the name for the portfolio and gives the portfolio a close button.
class PortfolioList extends Component {
    render=()=>{
        return (
            <div className="container">
                <ul className="text-center">
                    {
                        Object.keys(this.props.portfolios).map(function(portfolio) {
                            return (
                                <div>
                                    <li className="list-group-item m-2">
                                        <div className="navbar navbar-light">
                                            <h1>{this.props.portfolios[portfolio][0].key}</h1>
                                            <button onClick= {() => this.onRemovePortfolio(this.props.portfolios[portfolio][0].props.id)} className="close"> X</button>
                                        </div>
                                        <Portfolio/>
                                    </li>
                                </div>)
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    };

    //The remove portfolio button in /App
    onRemovePortfolio(id){
        return this.props.onRemovePortfolio(id)
    }

}



export default PortfolioList;
