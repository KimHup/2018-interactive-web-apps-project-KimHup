import React, {Component} from 'react';
import { Line } from "react-chartjs-2";
import { MDBContainer } from "mdbreact";
import Select from 'react-select';


// As I've starting to reach the limit of sending the project in I'm goin to leave the graph like this.

class MakeGraph extends Component {
    state = {
            labels: [],
            datasets: [
            ]
    }

// I had HUGE problems in getting the data to my form. Having the data from the stocks loaded when the popup shows
// was difficult. Ended up going with a button which loads the data in.
    //Im using a react-chartjs-2 to make the graph here.
    makeDatasets=() => {
        const datasets = [...this.state.datasets];
        var data= [];
        for (let i=0; i<this.props.stocks.length; i++){
            for (let k=0; k<Object.keys(this.props.stocks[i].history).length; k++){
                data.push(this.props.stocks[i].history[Object.keys(this.props.stocks[i].history)[k]]["1. open"])
            }
            const newdatasets = {
                label: this.props.stocks[i].name,
                fill: false,
                lineTension: 0.1,
                backgroundColor: "rgba(75,192,192,1)",
                borderColor: "rgba("+30*i+",192,192,1)",
                borderCapStyle: "butt",
                borderDash: [],
                borderDashOffset: 0.0,
                borderJoinStyle: "miter",
                pointBorderColor: "#ff9784",
                pointBackgroundColor: "#fff",
                pointBorderWidth: 1,
                pointHoverRadius: 5,
                pointHoverBackgroundColor: "rgba(75,192,192,1)",
                pointHoverBorderColor: "rgba(220,220,220,1)",
                pointHoverBorderWidth: 2,
                pointRadius: 1,
                pointHitRadius: 10,
                data: data
            };
            data=[];
            datasets.push(newdatasets);
            this.setState({ datasets});
        }
        //When the data is added I make the days show up at the bottom.
        this.makeLabels();
    };


    makeLabels=()=>{
        let newlabels = Object.keys(this.props.stocks[0].history);
        this.setState({ labels: newlabels});
    };

    // Problems in using lists, arrays and objects... Ended up with leaving it.
    getDates=()=>{
        let dates= []
        if ((this.props.stocks[0]) !== undefined){
        for (let k=0; k<Object.keys(this.props.stocks[0].history).length; k++){
            dates.push({label:Object.keys(this.props.stocks[0].history[0]),
                value: k})
        }
        return dates
        }
        else {
            this.hideIfEmpty()
        }
    };

    hideIfEmpty(){
        let value = this.props.stocks.length;
        return value >0 ? false : true;
    }
    //The button triggers the sending of data and painting the graph.
    render() {
        return (
            <MDBContainer>
                <h3 className="mt-5">Line chart</h3>
                <button onClick={()=>this.makeDatasets()} className="btn btn-primary" hidden={this.hideIfEmpty()}> Show the Graph! </button>
                <Line data={this.state} options={{ responsive: true }} />
            </MDBContainer>
        );
    }
}

export default MakeGraph;
