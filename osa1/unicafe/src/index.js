import React from 'react';
import ReactDOM from 'react-dom';

const Button = (props) => {

    return(
        <button onClick={props.onClickFunction}>{props.text}</button>
    )
}

const Statistic = (props) => {

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
            <Statistic text={stats[0].text} value={stats[0].value} />
            <Statistic text={stats[1].text} value={stats[1].value} />
            <Statistic text={stats[2].text} value={stats[2].value} />
            <Statistic text={stats[3].text} value={stats[3].value} />
            <Statistic text={stats[4].text} value={stats[4].value} />
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
    increaseGood = () => { 
        this.setState({good: this.state.good + 1})
    }

    increaseNeutral = () => {
        this.setState({neutral: this.state.neutral+1})
    }

    increaseBad = () => {
        this.setState({bad: this.state.bad+1})
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
                value: this.state.good
            },
    
            {
                text: 'Neutraali',
                value: this.state.neutral
            },
    
            {
                text: 'Huono',
                value: this.state.bad
            },
    
            {
                text: 'Keskiarvo',
                value: this.precise(this.avg())
            },
    
            {
                text: 'Positiivisia',
                value: this.precise(this.percentagePositive())
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
                    <Button onClickFunction={this.increaseGood} text="Hyvä" />
                    <Button onClickFunction={this.increaseNeutral} text="Neutraali" />
                    <Button onClickFunction={this.increaseBad} text="Huono" />
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
