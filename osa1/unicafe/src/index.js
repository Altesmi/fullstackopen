import React from 'react';
import ReactDOM from 'react-dom';

class App extends React.Component {
    constructor(props) {
        super(props)
        this.state={
            good: 0,
            neutral: 0,
            bad: 0
        }
    }
    increaseGood = () => { 
        console.log(this.state.good)
        this.setState({good: this.state.good + 1})
    }

    increaseNeutral = () => {
        this.setState({neutral: this.state.neutral+1})
    }

    increaseBad = () => {
        this.setState({bad: this.state.bad+1})
    }
    render() {
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <button onClick={this.increaseGood}>Hyvä</button>
                    <button onClick={this.increaseNeutral}>Neutraali</button>
                    <button onClick={this.increaseBad}>Huono</button>
                </div>

                <h1>Statistiikka</h1>

                <div>
                    hyvä {this.state.good} <br />
                    neutraali {this.state.neutral} <br/>
                    huono {this.state.bad} <br />
                </div>
            </div> 
        )

    }
}


ReactDOM.render(<App />, document.getElementById('root'));
