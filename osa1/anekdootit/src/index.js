import React from 'react'
import ReactDOM from 'react-dom'

class App extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selected: 0,
            points: new Array(this.props.anecdotes.length).fill(0),
            bestAnecdote: 0
        }
    }

    drawRandomAnecdote = () => {
        return () => {
            this.setState({selected: Math.floor(Math.random() * this.props.anecdotes.length)} )
        }
    }

    vote = () => {
        const copyOfArray = [...this.state.points]
        copyOfArray[this.state.selected] += 1

        return () => {
            this.setState({points: copyOfArray})
            /* update the best anecdote*/
            this.setState({bestAnecdote: copyOfArray.indexOf(Math.max(...copyOfArray))})
        }
    }



    render() {
        console.log(this.state.points)
        return(
            <div>
                {this.props.anecdotes[this.state.selected]} <br />
                <p><b>This Anecodte has {this.state.points[this.state.selected]} votes</b></p>
                <button onClick={this.drawRandomAnecdote()}> Next anecdote </button>
                
                <button onClick={this.vote()}>Vote this anecdote</button>
            

                <h1>Anecdote with most votes</h1>
                <i>{this.props.anecdotes[this.state.bestAnecdote]}</i> <br />
                Leading the vote with {this.state.points[this.state.bestAnecdote]} votes
            </div>
        )
    }
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmes write code that humand can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition , not smart enough to debug it.',
]

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById('root'));

