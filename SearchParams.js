import React from "react";

import pf, { ANIMALS } from "petfinder-client";

  const petfinder = pf({
    key: process.env.API_KEY,
    secret: process.env.API_SECRET
  });

class SearchParams extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      location: "Seattle, WA",
      animal: "",
      breed: "",
      breeds: [],
      loding: true
    };

    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleAnimalChange = this.handleAnimalChange.bind(this);
    this.handleBreedChange = this.handleBreedChange.bind(this);
    this.getBreeds = this.getBreeds.bind(this);
  }

  handleLocationChange(e) {
    console.log(e.target.value);
    this.setState({
      location: e.target.value
    });
  }

  handleAnimalChange(e) {
    this.setState({
      animal: e.target.value,
      breed: ""
    }), this.getBreeds();
  }

  handleBreedChange(e){
    this.setState({
      breed: e.target.value
    })
  }

  getBreeds() {
  if (this.state.animal) {
    petfinder.breed
      .list({ animal: this.state.animal })
      .then(data => {
        if (
          data.petfinder &&
          data.petfinder.breeds &&
          Array.isArray(data.petfinder.breeds.breed)
        ) {
          this.setState({
            breeds: data.petfinder.breeds.breed
          });
        } else {
          this.setState({ breeds: [] });
        }
      })
      .catch(console.error);
  } else {
    this.setState({
      breeds: []
    });
  }
  console.log("Check this when this comes in...")
  console.log(this.state.breeds);
}



  render() {

    return (
      <div className="search-params">
        <label htmlFor="location">
          Location
          <input
            onChange={this.handleLocationChange}
            id="location"
            value={this.state.location}
            placeholder="Location"
          />
        </label>
        <label htmlFor="animal">
          Animal
          <select
            id="animal"
            value={this.state.animal}
            onChange={this.handleAnimalChange}
            onBlur={this.handleAnimalChange}
          >
            <option/>
            {ANIMALS.map(animal => (
              <option key={animal} value={animal}>
                {animal}
              </option>
            ))}
          </select>
        </label>
        <label htmlFor="breed">
          Breed
          <select
            disabled={!this.state.breeds.length}
            id="breed"
            value={this.state.breed}
            onChange={this.handleBreedChange}
            onBlur={this.handleBreedChange}
          >
            <option />
            {this.state.breeds.map(breed => (
              <option key={breed} value={breed}>
                {breed}
              </option>
            ))}
          </select>
        </label>
        <button>Submit</button>
      </div>
    );
  }
}

export default SearchParams;
