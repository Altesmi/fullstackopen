import React from 'react';
import ReactDOM from 'react-dom';

const Otsikko = (props) => {
    return(
        <h1>{props.kurssi}</h1>
    )
} 

const Osa = (props) =>{
    return(
    <div>
        <p>{props.osa} {props.tehtavia}</p>
    </div>
    )
}

const Sisalto = (props) => {
    
    return(
        <div>
            <Osa osa={props.osa1} tehtavia={props.t1}/>
            <Osa osa={props.osa2} tehtavia={props.t2}/>
            <Osa osa={props.osa3} tehtavia={props.t3}/>
        </div>
    )
}

const Yhteensa = (props) => {
    return(
    <div>
        <p> yhteensä {props.yht} tehtävää </p>
    </div>
    )
}

const App = () => {
    const kurssi = 'Half Stack -sovelluskehitys'
    const osat = [
    {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    },

    {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    },

    {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }
    ]
    
    return (

        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa1={osat[0].nimi} osa2={osat[1].nimi} osa3 = {osat[2].nimi}
                            t1={osat[0].tehtavia} t2 = {osat[1].tehtavia}
                            t3 ={osat[2].tehtavia} />
            <Yhteensa yht={osat[0].tehtavia+osat[1].tehtavia+osat[2].tehtavia} />
        </div>

    )
}


ReactDOM.render(
    <App />, 
    document.getElementById('root')
)
