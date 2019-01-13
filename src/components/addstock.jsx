import React, {Component} from 'react';

class AddStock extends Component {

    //Didnt want to add State here but didn't get it to work otherwise
    state = {
        unitValue: '',
        history:[]
    };

    //Disabling the button in this view as well. The button on the Add stock pop up AND the one in the
    // portfolio are disabled when the limit is reached
    checkAmountUniqueStocks(){
        let value = this.props.AmountUniqueStocks;
        return value >=this.props.maxAmountUniqueStocks ? true : false;
    }

    //API call for stock values. I went with days instead of weeks or months.
    getValue =()=>{
        let typing= [this.refs.stockCode.value];
        if (typing !== ""){
            let Httpreq = new XMLHttpRequest();
            Httpreq.open("GET","https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+typing+"&apikey=HLLSC0ZZV82CRHHB",false);
            Httpreq.send(null);
            let json_obj = JSON.parse(Httpreq.responseText);
            if (json_obj['Time Series (Daily)']!== undefined){
                const value = json_obj['Time Series (Daily)'][Object.keys(json_obj['Time Series (Daily)'])[0]]['1. open'];
                const history = json_obj['Time Series (Daily)'];
                //Saves the history for the graph and the values for the stock table.
                this.setState({
                    history: history,
                    unitValue: value
                });
            }
            else{
                alert(json_obj['Note'])
            }
        }
    };

    handleSubmit = (event) => {
        event.preventDefault();
        //Saves up the info.
        var stock = {
            stockCode: this.refs.stockCode.value,
            quantity: this.refs.quantity.value,
            unitValue: this.refs.unitValue.value,
            history: this.state.history
        };
        //Check if stock value is got
        if (stock.unitValue !== "") {
            //Check if empty
            if(typeof stock.stockCode === 'string' && stock.stockCode.length > 0) {
                if( stock.quantity.length > 0){
                    this.props.onAddStock(stock)
                    alert("Added "+stock.quantity+" "+ stock.stockCode+" stocks to your portfolio!");
                    this.setState({
                        unitValue: ''
                    });
                    this.refs.addStockForm.reset();
                }
                else{
                    alert(stock.quantity+" Not a valid Amount!")
                }
            }
            else{
                alert(stock.stockCode+" is not a valid Code!")
            }

        }
        else{
            this.getValue()
            alert("This is the current value. Add to Portfolio?")
        }
    };

    // We got a check Value button to check if the stock code is true and to get it's value from the API.
    // The submit button informs you if you are missing something.
    render() {
        return (
            <div>

                <form ref="addStockForm"onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Stock Code</label>
                        <div className="col-sm-10 input-group" >

                            <input  type="text" ref="stockCode" className="form-control" id="CodeInput" placeholder="Stock Code..." />
                            <span className="input-group-btn">
                            <button onClick={this.getValue.bind(this.refs.stockCode, 'value')} type="button" className="btn btn-sm btn-secondary m-1"> Check Value </button>
                            </span>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Unit Value</label>
                        <div className="col-sm-10">
                            <input type="text" ref="unitValue" className="form-control" id="UnitValueInput"  value={this.state.unitValue} placeholder="Value..." readOnly/>
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input type="number" ref="quantity" className="form-control" id="QuantityInput" placeholder="Quantity..."  />
                        </div>
                    </div>
                    <div className="form-group row">
                        <div className="col-sm-10">
                            <button type="submit"   className="btn btn-sm m-2 btn-primary" disabled={this.checkAmountUniqueStocks()}>Submit </button>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddStock;
