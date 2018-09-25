import React from 'react'

const Otsikko = (props) => {
    return (
        <h1>{props.kurssinNimi}</h1>
    )
}

const Osa = (props) => {
    return (
        <p>{props.osa} {props.tehtavia}</p>
    )
}

const Sisalto = (props) => {
    return (
        <div>
            {props.osat.map(osa =>
                <div key={osa.id}>
                    <Osa osa={osa.nimi} tehtavia={osa.tehtavia} />
                </div>)}
        </div>
    )
}

const Kurssi = (props) => {

    return (
        <div>
            {
                props.kurssit.map(kurssi =>
                    <div key={kurssi.id}>
                        <Otsikko kurssinNimi={kurssi.nimi} />

                        <Sisalto osat={kurssi.osat} />

                        <Yhteensa kurssi={kurssi} />

                    </div>)
            }
        </div>
    )

}

const Yhteensa = (props) => {

    return (
        <div>
            <p> yhteensä {props.kurssi.osat
                .reduce((summa, osa) =>
                    osa.tehtavia + summa, 0)
            } tehtävää </p>
        </div>

    )
}

export default Kurssi
