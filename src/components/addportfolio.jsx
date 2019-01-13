import React, {Component} from 'react';


class AddPortfolioForm extends Component {
    createPortfolio = (e) =>  {
        e.preventDefault();
        //This refs method seems to be outdated but im using it here!
        let portfolio = this.refs.portfolioName.value;
        //checks if the text input is empty
        if(typeof portfolio === 'string' && portfolio.length > 0) {
            this.props.addPortfolio(portfolio);
            //resets after use
            this.refs.portfolioForm.reset();
        }
    };
    //This disables the add button if there's too many portfolios
    checkPortfolioAmount() {
        let value = this.props.portfoliosAmount;
        return value >=this.props.maxPortfoliosAmount ? true : false;
    }

    render  = () =>  {
        return(
            <form className="form-inline" ref="portfolioForm" onSubmit={this.createPortfolio}>
                <div className="form-group">
                    <label for="portfolioItem">
                        Portfolios Name:
                        <input type="text" id="portfolioItem" placeholder="..." ref="portfolioName" className="form-control m-2" />
                    </label>
                </div>
                <button type="submit" className={"btn btn-primary"} disabled={this.checkPortfolioAmount()}>Add Portfolio</button>
            </form>
        );
    };
}

export default AddPortfolioForm;
