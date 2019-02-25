import React from "react";

import pf from "petfinder-client";
import Pet from "./Pet";

const petfinder = pf({
  key: process.env.API_KEY,
  secret: process.env.API_SECRET
});

class Results extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      pets: []
    };
  }
  componentDidMount() {
    // const promise = petfinder.breed.list({ animal: "dog"})
    // promise.then(console.log, console.error);
    console.log("look here");
    console.log(petfinder.pet);
    petfinder.pet
      .find({ output: "full", location: "Seattle, WA" })
      .then(data => {
        console.log(data);
        let pets;

        if (data.petfinder.pets && data.petfinder.pets.pet) {
          if (Array.isArray(data.petfinder.pets.pet)) {
            pets = data.petfinder.pets.pet;
          } else {
            pets = [data.petfinder.pets.pet];
          }
        } else {
          pets = [];
        }

        console.log(pets);
        this.setState({
          pets: pets
        });
      });
  }

  render() {
    return (
      /* <pre>
          <code>{JSON.stringify(this.state, null, 4)}</code>
        </pre> */
      <div className="search">
        {console.log(this.state.pets)}
        {this.state.pets.map(pet => {
          let breed;
          if (Array.isArray(pet.breeds.breed)) {
            breed = pet.breeds.breed.join(", ");
          } else {
            breed = pet.breeds.breed;
          }
          return (
            <Pet
              key={pet.id}
              animal={pet.animal}
              name={pet.name}
              breed={breed}
              media={pet.media}
              id={pet.id}
              location={`${pet.contact.city}, ${pet.contact.state}`}
            />
          );
        })}
      </div>
    );
  }
}

export default Results;
