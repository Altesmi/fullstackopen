import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import counterReducer from './reducer'

const store = createStore(counterReducer)

const Statistiikka = () => {
    const stateNow = store.getState()
    const palautteita = stateNow.ok + stateNow.good + stateNow.bad
    const keskiarvo = (stateNow.good -stateNow.bad) / palautteita

    const zeroAll = () => () => {
        store.dispatch({type: 'ZERO'})
    }

    
    const avgAsString = () => {
        if(keskiarvo <= -0.5) {
            return 'HUONO'
        } else if(keskiarvo >= 0.5) {
            return 'HYVÄ'
        } else {
            return 'NEUTRAALI'
        }
    }
    if (palautteita === 0) {
        return (
            <div>
                <h2>stataistiikka</h2>
                <div>ei yhtään palautetta annettu</div>
            </div>
        )
    }

    return (
        <div>
            <h2>statistiikka</h2>
            <table>
                <tbody>
                    <tr>
                        <td>hyvä</td>
                        <td>{stateNow.good}</td>
                    </tr>
                    <tr>
                        <td>neutraali</td>
                        <td>{stateNow.ok}</td>
                    </tr>
                    <tr>
                        <td>huono</td>
                        <td>{stateNow.bad}</td>
                    </tr>
                    <tr>
                        <td>keskiarvo</td>
                        <td>{avgAsString()}</td>
                    </tr>
                    <tr>
                        <td>positiivisia</td>
                        <td>{Math.floor(stateNow.good/palautteita*100)} %</td>
                    </tr>
                </tbody>
            </table>

            <button onClick={zeroAll()}>nollaa tilasto</button>
        </div >
    )
}

class App extends React.Component {
    klik = (nappi) => () => {
        store.dispatch({type: nappi})
    }

    render() {
        return (
            <div>
                <h2>anna palautetta</h2>
                <button onClick={this.klik('GOOD')}>hyvä</button>
                <button onClick={this.klik('OK')}>neutraali</button>
                <button onClick={this.klik('BAD')}>huono</button>
                <Statistiikka />
            </div>
        )
    }
}

const renderApp = () => {
    ReactDOM.render(<App />, document.getElementById('root'));
}

renderApp()

store.subscribe(renderApp)
