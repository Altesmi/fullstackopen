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

    const osa1 = {
        nimi: 'Reactin perusteet',
        tehtavia: 10
    }

    const osa2 = {
        nimi: 'Tiedonvälitys propseilla',
        tehtavia: 7
    }

    const osa3 = {
        nimi: 'Komponenttien tila',
        tehtavia: 14
    }

    return (

        <div>
            <Otsikko kurssi={kurssi} />
            <Sisalto osa1={osa1.nimi} t1={osa1.tehtavia} 
            osa2={osa2.nimi} t2 = {osa2.tehtavia}
            osa3={osa3.nimi} t3 = {osa3.tehtavia} />
            <Yhteensa yht={osa1.tehtavia+osa2.tehtavia+osa3.tehtavia} />
        </div>

    )
}


ReactDOM.render(
    <App />, 
    document.getElementById('root')
)
