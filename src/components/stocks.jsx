import React, {Component} from 'react';


class Stock extends Component {
    render() {
        console.log(Object.values(this.props.stock))
        return (
            <tr>


                            <th scope="row"> {this.props.stock.name} </th>
                            <td>{this.twoDecimals(this.props.stock.unitValue)} {this.props.onCheckCurrency} </td>
                            <td>{this.props.stock.quantity} </td>
                            <td>{this.twoDecimals(this.props.stock.unitValue*this.props.stock.quantity)} {this.props.onCheckCurrency} </td>
                            <td>
                                <button
                                    onClick={() => this.props.onDelete(this.props.stock.id)}
                                    className="btn-danger btn btn-sm"
                                >
                                    Delete
                                </button>
                            </td>



            </tr>
        );
    }
    twoDecimals (num){
        return Math.floor(num * 100) / 100;
    }
}

export default Stock;
