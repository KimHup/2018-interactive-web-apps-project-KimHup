import React, {Component} from 'react';


class Stock extends Component {
    render() {
        console.log(Object.values(this.props.stock))
        return (
            <div>
                <table className="table table-responsive table-hover">
                    <thead className="thead-light">
                        <tr className="d-table-row">
                            <th scope="col">Name</th>
                            <th scope="col">Unit Value</th>
                            <th scope="col">Quantity</th>
                            <th scope="col">Total Value</th>
                            <th scope="col">Select</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <th scope="row"> {this.props.stock.name} </th>
                            <td>{this.twoDecimals(this.props.stock.unitValue)} </td>
                            <td>{this.props.stock.quantity} </td>
                            <td>{this.twoDecimals(this.props.stock.unitValue*this.props.stock.quantity)} </td>
                            <td>
                                <div className="container">
                                    asd
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
        );
    }
    twoDecimals (num){
        return Math.floor(num * 100) / 100;
    }
}

export default Stock;
