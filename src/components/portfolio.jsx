import React, {Component} from 'react';
import Popup from "reactjs-popup";
import Stock from "./stocks";
import MakeGraph from "./makegraph"
import AddStock from "./addstock"

//Pretty much the second "Big Hub" after App.
class Portfolio extends Component {
    //state contains stocks and max stock amount
    state = {
        stocks: [],
        maxAmountUniqueStocks: 50,
    };

    //New Stocks are made here. Similiar to how portfolios are made.
    handleStock= stockData =>{
        const stocks = [...this.state.stocks];
        var timestamp = (new Date()).getTime();
        const newStock = {
            id:'stock-' + timestamp,
            name: stockData.stockCode,
            unitValue:stockData.unitValue,
            quantity:stockData.quantity,
            currency: "USD",
            history: stockData.history
        };
        stocks.push(newStock);
        this.setState({ stocks })
    };

    //Counts the totalvalue that's under the table
    totalValue= () =>{
        const stocks = [...this.state.stocks];
        let tot = 0;
        for (let i=0; i<this.state.stocks.length; i++){
            tot += (stocks[i].unitValue*stocks[i].quantity);
        }
        // Adds the correct currency symbol
        let cur = this.checkCurrency();
        return (Math.floor(tot * 100) / 100+" "+ cur)} ;

        //For EUR € and for USD $
    checkCurrency= () =>{
        const stocks = [...this.state.stocks];
        if (stocks[0] !== undefined){
            if (stocks[0].currency === "USD") return "$";
            if (stocks[0].currency === "EUR") return "€";
        }
        else return "";

    };
        //Checks the amount of "different" stocks in the portfolio. Disables new stocks if limit is met.
        checkAmountUniqueStocks(){
        const stocks = [...this.state.stocks];
        let value = stocks.length;
        return value >=this.state.maxAmountUniqueStocks ? true : false;
    }
        //Handles the stock delete
    handleStockDelete= (stockID) =>{
        const stocks = this.state.stocks.filter(c => c.id !== stockID);
        this.setState({ stocks})
    };

        //Change to Dollar/Euro changes the currency state to the other one.
    changeToEuro= () =>{
        const stocks = [...this.state.stocks];
        if (stocks[0] !== undefined){
            if (stocks[[0]].currency === "USD"){
                let rate = this.checkRate("EUR");
                for (let i=0; i<stocks.length; i++){
                    stocks[i].currency = "EUR";
                    stocks[i].unitValue = stocks[i].unitValue*rate;
                    stocks[i].unitValue = Math.floor(stocks[i].unitValue * 10000) / 10000
                }
            }
            this.setState({
                stocks
            });
        }
    };
    changeToDollar= () =>{
        const stocks = [...this.state.stocks];
        if (stocks[0] !== undefined){
            if (stocks[[0]].currency === "EUR"){
                let rate = this.checkRate("USD");
                if (rate !== 1){
                    for (let i=0; i<stocks.length; i++){
                        stocks[i].currency = "USD";
                        stocks[i].unitValue = stocks[i].unitValue*rate;
                        stocks[i].unitValue = Math.floor(stocks[i].unitValue * 10000) / 10000
                    }
                    this.setState({
                        stocks
                    });
                }
            }
        }
    };

    // API Call for checking rates
    checkRate(cur){
        var Httpreq = new XMLHttpRequest();
        if (cur === "EUR"){
            Httpreq.open("GET","https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=USD&to_currency=EUR&apikey=HLLSC0ZZV82CRHHB",false);
        }
        if (cur === "USD"){
            Httpreq.open("GET","https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=EUR&to_currency=USD&apikey=HLLSC0ZZV82CRHHB",false);
        }
        Httpreq.send(null);
        var json_obj = JSON.parse(Httpreq.responseText);
        if (json_obj['Realtime Currency Exchange Rate']!== undefined) {
            const value = json_obj['Realtime Currency Exchange Rate']['5. Exchange Rate']
            console.log("this is the Exchange Rate: " + JSON.stringify(value))
            return value;
        }
        else {
            alert(json_obj['Note'])
            return 1;
        }

    }
    /// A Table with the Stocks. Followed by two popup buttons for Adding Stocks and looking at the graph.
    /// The Exchange buttons are at the end.
    render() {
        return (
            <div>
                <span className="float-left badge badge-pill badge-secondary m-2" >{this.state.stocks.length} </span>
                <div>
                    <table className="table table-hover table-responsive-sm table-bordered">
                        <thead className="thead-light">
                            <tr className="">
                                <th scope="col">Name</th>
                                <th scope="col">Unit Value</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Total Value</th>
                                <th scope="col">Delete</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.stocks.map(stock => (
                                <Stock
                                    key = {stock.name}
                                    stock={stock}
                                    onCheckCurrency={this.checkCurrency()}
                                    state={true}
                                    onDelete={this.handleStockDelete}
                                />
                            ))}

                        </tbody>
                    </table>
                </div>
                <div>
                    <p>Total value of portfolio: {this.totalValue()}</p>
                </div>
                <div className="navbar">
                    <Popup trigger={<button className="btn btn-sm btn-primary" disabled={this.checkAmountUniqueStocks()}> Add Stock</button>} modal>
                        {close => (
                            <div>
                                <div className="nav-item">
                                    <button  className="close m-3" onClick={close}>X</button>
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
                    <Popup trigger={<button className="btn btn-sm btn-primary"> Check Graph</button>} modal>
                        {close => (
                            <div>
                                <div className="nav-item">
                                    <button  className="close m-3" onClick={close}>X</button>
                                </div>
                                <div className="navbar-brand text-right">
                                    <h1> Portfolio Timeline</h1>
                                </div>

                                <div className="modal-body align-content-center" >
                                    <MakeGraph
                                    stocks={this.state.stocks}
                                    />
                                </div>
                            </div>
                        )}
                    </Popup>

                    <div>
                        <button onClick={() =>this.changeToEuro()} className="btn btn-secondary m-2">€</button>
                        <button onClick={() =>this.changeToDollar()} className="btn btn-secondary m-2">$</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Portfolio;
