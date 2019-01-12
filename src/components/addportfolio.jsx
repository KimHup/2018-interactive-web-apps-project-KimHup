import React, {Component} from 'react';


class AddPortfolioForm extends Component {
    createPortfolio = (e) =>  {
        e.preventDefault();
        //get the fruit object name from the form
        var portfolio = this.refs.portfolioName.value;

        //if we have a value
        //call the addFruit method of the App component
        //to change the state of the fruit list by adding an new item
        if(typeof portfolio === 'string' && portfolio.length > 0) {
            this.props.addPortfolio(portfolio);
            //reset the form
            //console.log(this.props);

            this.refs.portfolioForm.reset();

        }
    };
    render  = () =>  {
        return(
            <form className="form-inline" ref="portfolioForm" onSubmit={this.createPortfolio}>
                <div className="form-group">
                    <label for="portfolioItem">
                        Portfolios Name
                        <input type="text" id="portfolioItem" placeholder="..." ref="portfolioName" className="form-control m-2" />
                    </label>
                </div>
                <button type="submit" className={"btn btn-primary"} disabled={this.checkPortfolioAmount()}>Add Portfolio</button>
            </form>
        );
    }
    checkPortfolioAmount() {
        let value = this.props.portfoliosAmount;
        return value >=this.props.maxPortfoliosAmount ? true : false;
    }
}


export default AddPortfolioForm;
