import React, {Component} from 'react';

class AddStock extends Component {

    handleSubmit = (event) => {
        event.preventDefault();
        var stock = {
            stockCode: this.refs.stockCode.value,
            quantity: this.refs.quantity.value,
            unitValue: this.refs.unitValue.value};

        this.props.onAddStock(stock)
        alert("Added "+stock.quantity+" "+ stock.stockCode+" stocks to your portfolio!")
        this.refs.addStockForm.reset();

    };

    checkAmountUniqueStocks(){
        let value = this.props.AmountUniqueStocks;
        return value >=this.props.maxAmountUniqueStocks ? true : false;
    }

    render() {
        return (
            <div>

                <form ref="addStockForm"onSubmit={this.handleSubmit}>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Stock Code</label>
                        <div className="col-sm-10">
                            <input type="text" ref="stockCode" className="form-control" id="CodeInput" placeholder="Stock Code..." />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Unit Value</label>
                        <div className="col-sm-10">
                            <input type="text" ref="unitValue" className="form-control" id="UnitValueInput" placeholder="Value..." />
                        </div>
                    </div>
                    <div className="form-group row">
                        <label className="col-sm-2 col-form-label">Quantity</label>
                        <div className="col-sm-10">
                            <input type="text" ref="quantity" className="form-control" id="QuantityInput" placeholder="Quantity..."  />
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
