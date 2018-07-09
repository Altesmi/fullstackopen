const osaKentat = ['osa1','osa2','osa3']

const osat = [
{
	nimi: 'testi1',
	teht: 12
},
{
	nimi: 'testi2',
	teht:  9
},
{
	nimi: 'testi3',
	teht: 4
}
]

const tulostaKentat = (kenttaTaulukko,osaTaulukko) => {
	const tuloste = kenttaTaulukko.map((arvo,luku)=>
			arvo +'='+osat[luku].nimi )
	return (
		console.log(tuloste)
	)
}

tulostaKentat(osaKentat,osat)
osat.map((teksti, luku)=>
console.log(osat[luku].teht)
)
