import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Stock from "./stocks";
import MakeGraph from "./makegraph"
import AddStock from "./addstock"
import RemoveStocks from "./removestocks"


class Portfolio extends Component {
    state = {
        stocks: [
            { id: 0, name: "NOK", unitValue: 4.5221, quantity: 10}
        ],
        maxAmountUniqueStocks: 50,

    };

    constructor(props) {
        super(props);

    }

    handleStock= stockData =>{
        const stocks = [...this.state.stocks];
        var timestamp = (new Date()).getTime();
        const newStock = {
            id:'stock-' + timestamp,
            name: stockData.stockCode,
            unitValue:stockData.unitValue,
            quantity:stockData.quantity
        }
        stocks.push(newStock)
        this.setState({ stocks })

    };

    totalValue(){
        const stocks = [...this.state.stocks];
        let tot = 0;
        for (let i=0; i<this.state.stocks.length; i++){
            tot += (stocks[i].unitValue*stocks[i].quantity);
        }
        return Math.floor(tot * 100) / 100;
    }

    checkAmountUniqueStocks(){
        const stocks = [...this.state.stocks];
        let value = stocks.length;
        return value >=this.state.maxAmountUniqueStocks ? true : false;
    }

    render() {
        return (
            <div>
                <div>
                    {this.state.stocks.map(stock => (
                        <Stock
                            key = {stock.name}
                            stock={stock}
                            state={true}
                        />
                    ))}

                </div>
                <div>
                    <p>Total value of portfolio: {this.totalValue()}</p>
                </div>
                <div className="input-group">
                    <Popup trigger={<button className="btn btn-sm btn-primary" disabled={this.checkAmountUniqueStocks()}> Add Stock</button>} modal>
                        {close => (
                            <div>
                                <div className="nav-item">
                                    <button  className="close" onClick={close}>X</button>
                                </div>
                                <div className="navbar-brand text-right">
                                <h1> Add stocks</h1>
                                </div>

                            <div className="text-body ">
                                <AddStock
                                    onAddStock = {this.handleStock}
                                    AmountUniqueStocks = {this.state.stocks.length}
                                    maxAmountUniqueStocks = {this.state.maxAmountUniqueStocks}
                                />
                            </div>
                            </div>
                        )}
                    </Popup>

                    <MakeGraph/>
                    <RemoveStocks/>
                </div>
            </div>
        );
    }
}



export default Portfolio;
