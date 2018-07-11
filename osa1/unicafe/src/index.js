import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {

    return(
        <button onClick={props.onClickFunction}>{props.text}</button>
    )
}

const Statistic = (props) => {
    if(props.isPercentage===1) {
        return(
            <div>
                {props.text}: {props.value}%
            </div>
        )
    }
    return(
        
        <div>
            {props.text}: {props.value} 
        </div>
    )
}

const Statistics = (props) => {
    const {stats} = props
    return (
        <div>
            <Statistic text={stats[0].text} value={stats[0].value} isPercentage={stats[0].isPercentage} />
            <Statistic text={stats[1].text} value={stats[1].value} isPercentage={stats[1].isPercentage} />
            <Statistic text={stats[2].text} value={stats[2].value} isPercentage={stats[2].isPercentage} />
            <Statistic text={stats[3].text} value={stats[3].value} isPercentage={stats[3].isPercentage} />
            <Statistic text={stats[4].text} value={stats[4].value} isPercentage={stats[4].isPercentage} />
        </div>
    )
}


class App extends React.Component {
    constructor(props) {
        super(props)
        
        this.state={
            good: 0,
            neutral: 0,
            bad: 0
        }
    }

    buttonEventHandler = (fieldName) => {
        return () => {
            this.setState({[fieldName]: this.state[fieldName] +1})
        }
    }

    avg = () => {
        return ( (this.state.good+this.state.bad*(-1))
        /(this.state.good+this.state.neutral+this.state.bad) )
    }

    percentagePositive = () => {
        return (this.state.good/(this.state.good+this.state.neutral+this.state.bad)*100)
    }

    precise = (number) => {
        return (Number.parseFloat(number).toFixed(1))
    }



    render() {
      const stats = [
            {
                text: 'Hyvä',
                value: this.state.good,
                isPercentage: 0
            },
    
            {
                text: 'Neutraali',
                value: this.state.neutral,
                isPercentage: 0
            },
    
            {
                text: 'Huono',
                value: this.state.bad,
                isPercentage: 0
            },
    
            {
                text: 'Keskiarvo',
                value: this.precise(this.avg()),
                isPercentage: 0
            },
    
            {
                text: 'Positiivisia',
                value: this.precise(this.percentagePositive()),
                isPercentage: 1
            }
    
        ]

        const allStatsText = () => {
            if((this.state.bad+this.state.good+this.state.neutral)=== 0) {
                return (
                    <div>
                        Yhtään palautetta ei ole annettu
                    </div>
                )
            }

            return (
                <Statistics stats = {stats} />
            )
        }
    
        return (
            <div>
                <h1>Anna palautetta</h1>
                <div>
                    <Button onClickFunction={this.buttonEventHandler('good')} text="Hyvä" />
                    <Button onClickFunction={this.buttonEventHandler('neutral')} text="Neutraali" />
                    <Button onClickFunction={this.buttonEventHandler('bad')} text="Huono" />
                </div>

                <h1>Statistiikka</h1>

                <div>
                    {allStatsText()} 
                </div>
            </div> 
        )

    }
}


ReactDOM.render(<App />, document.getElementById('root'));
