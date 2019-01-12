import React, {Component} from 'react';
import Portfolio from "./portfolio";


class PortfolioList extends Component {
    render=()=>{

       // //this was a PAIN to do and took a lot of time!! A double nested list to access the objects inside!
       // var list = Object.values(this.props.portfolios).map(function (keys) {
       //     var keys = Object.values(keys).map(function (stuff ) {
       //         return stuff.key
       //     });
       //     return keys
       // });


      //  console.log("in Portfoliolist render: "+ (list));
      // // const stuff = Object.values(list.map(function (key) {
      // //     return key
////
      // // }));
      //  console.log("in Portfoliolist render: "+ JSON.stringify(list));
        return (
            <div className="container">
                <ul className="text-center">
                    {

                        Object.keys(this.props.portfolios).map(function(portfolio) {

                            return (
                                <div>

                                    <div className="navbar">
                                        <h1>{this.props.portfolios[portfolio][0].key}</h1>
                                        <button onClick= {() => this.onRemovePortfolio(this.props.portfolios[portfolio][0].props.id)} className="close"> X</button>
                                    </div>
                                    <li className="list-group-item"> <Portfolio/> </li>
                                    <li className="list-group-item">{this.props.portfolios[portfolio]}</li>
                                </div>)
                        }.bind(this))
                    }
                </ul>
            </div>
        );
    }
    onRemovePortfolio(id){
        return this.props.onRemovePortfolio(id)
    }

}



export default PortfolioList;
