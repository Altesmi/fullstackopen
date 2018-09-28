import React from "react";
import Axios from "axios";
import FilterInput from "./FilterInput";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      countries: [],
      filterString: "",
      clickedCountryAlpha3Code: ''
    };
  }

  filterCountries = event => {
    this.setState({ 
      filterString: event.target.value,
      clickedCountryAlpha3Code: '' // set this to empty string every time something is written / removed from input field 
    });
  };

  componentDidMount() {
    Axios.get("https://restcountries.eu/rest/v2/all").then(response => {
      this.setState({ countries: response.data });
    });
  }

  countryClicked(alpha3Code) {
    this.setState({ clickedCountryAlpha3Code: alpha3Code });
  }

  generateCountryOutputToRender = countries => {
    if (countries.length > 10) {
      return <div>Too many matches, specify another filter</div>;
    } else if (countries.length <= 10 && countries.length > 1) {
      return (
        <div>
          {countries.map(country => (
            <div
              key={country.alpha3Code}
              onClick={() => this.countryClicked(country.alpha3Code)}
            >
              {country.name}
            </div>
          ))}
        </div>
      );
    } else if (countries.length === 1) {
      return (
        <div>
          <h1>
            {countries[0].name} {countries[0].nativeName}
          </h1>
          <p>Capital: {countries[0].capital}</p>
          <p>Population: {countries[0].population}</p>
          <p>
            <img
              src={countries[0].flag}
              alt="Flag of {countries[0].name}"
              width="50%"
              height="50%"
            />
          </p>
        </div>
      );
    } else {
      return <div>No matches</div>;
    }
  };

  getCountriesFromState = () => {
    if(this.state.filterString.length > 0 && this.state.clickedCountryAlpha3Code.length===0) { //filter countries
    
      return this.state.countries.filter(country =>
          country.name
            .toLowerCase()
            .includes(this.state.filterString.toLowerCase())
        )}
        else if(this.state.clickedCountryAlpha3Code.length > 0) { // one country is clicked return that
          let cc = this.state.countries.filter(country => (
            country.alpha3Code.match(this.state.clickedCountryAlpha3Code)))
            console.log('here')
          return cc
          
        } else {
         return this.state.countries;
        }



  }

  render() {
    let countries = this.getCountriesFromState();
    return (
      <div>
        <FilterInput
          filterString={this.state.filterString}
          filterCountries={this.filterCountries}
        />
        {this.generateCountryOutputToRender(countries)}
      </div>
    );
  }
}

export default App;
