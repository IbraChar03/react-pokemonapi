import logo from './logo.svg';
import React, { useState, useEffect } from "react";
import axios from 'axios'
import Header from './components/Header'
import './App.scss';

function App() {
  // const pokemonn = {
  //   name: "bulbasaur",
  //   weight: 68,
  //   height: 7,
  //   abilities: [{
  //     name: "overgrow"
  //   },
  //   {
  //     name: "chlorophyll"
  //   }


  //   ],
  //   sprite: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png"
  // }
  let dataObj = ""
  const [pokemon, setPokemon] = useState(null);
  const [id, setId] = useState(1)
  // useEffect(async () => {
  //   const response = await fetch('https://pokeapi.co/api/v2/pokemon/1')
  //   const data = await response.json()
  //   console.log(data);

  // })
  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then(response => {
        dataObj = response.data
        const poke = objData(dataObj)
        console.log(poke);
        setPokemon(poke)
      }).catch((error) => {
        // Error
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          // console.log(error.response.data);
          // console.log(error.response.status);
          // console.log(error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          // `error.request` is an instance of XMLHttpRequest in the 
          // browser and an instance of
          // http.ClientRequest in node.js
          console.log(error.request);
        } else {
          // Something happened in setting up the request that triggered an Error
          console.log('Error', error.message);
        }
        console.log(error.config);
      });
  }, [id]);
  function objData() {
    const obj = {
      name: dataObj.name,
      weight: dataObj.weight,
      height: dataObj.height,
      abilities: dataObj.abilities,
      sprite: dataObj.sprites.front_default
    }
    return obj;

  }
  function randomId() {
    let random = parseInt(Math.random() * 1000 + 1);
    setId(random)
  }
  return (
    <div className="cont">
      <div className="inner-cont">
        <div className="cont-button">
          <button className="button" onClick={() => randomId()}>Get a random pokemon</button></div>
        <div className="cont-pokemon">
          {
            pokemon && (
              <div className="inner-pokemon">
                <div className="cont-imgPokemon">
                  <img src={pokemon.sprite} className="img" />
                </div>
                <div className="cont-namePokemon">
                  <span> <strong>Name : </strong>{pokemon.name} </span>
                </div>
                <div className="cont-namePokemon">
                  <span> <strong>Weight : </strong>{pokemon.weight} </span>
                </div>
                <div className="cont-namePokemon">
                  <span> <strong>Height : </strong>{pokemon.height} </span>
                </div>
                <div className="cont-abilPokemon">
                  <div className="abilities"> <strong>Abilities: </strong></div>
                  <ul>
                    {pokemon.abilities.map((item, index) => (
                      <li key={index}>{item.ability.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )
          }

        </div>
      </div>
    </div>
  );
}

export default App;
