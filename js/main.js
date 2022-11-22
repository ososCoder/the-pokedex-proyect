'use strict';

//selección form
const pokeForm = document.forms.pokeForm;

//seleccion de button
const pokeBtn = pokeForm.elements.pokeBtn;

//selección del ul POKELIST
const pokeList = document.querySelector('ul.pokeList');

//selección del h2 del header listed-pokemon
const listedPokemon = document.querySelector('h2.listed-pokemon');

//eventListener Btn click con función getPokemon!
pokeBtn.addEventListener('click', (e) => {
  e.preventDefault();

  //valor del input de búsqueda
  const pokeSearch = pokeForm.elements.pokeSearch.value.toLowerCase();

  /**############################################################################
   * ########################API CALL##############################################
   * ##############################################################################
   */
  const getPokemonList = async (pokeSearch) => {
    try {
      //limpiar html
      pokeList.innerHTML = '';
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=1126}`
      );

      const data = await response.json();

      //creación array pokemon con la call API. Todos los nombres de los pokemon (1126)
      const pokeNamesArray = [];
      for (const pokemon of data.results) {
        pokeNamesArray.push(pokemon.name);
      }

      //filtrado en función del input de búsqueda pokeSearch
      const pokemonFiltered = arrayFilter(pokeNamesArray, pokeSearch);

      //aqui llamar a la función render pasandole el pokemonFiltered
      await renderPokemons(pokemonFiltered);

      //listed pokemon
      if (pokeSearch === '') {
        listedPokemon.innerHTML = `Pokemons listed: ${pokemonFiltered.length}`;
      } else {
        listedPokemon.innerHTML = `Pokemons listed as '${pokeSearch}': ${pokemonFiltered.length}`;
      }
    } catch (err) {
      console.error(err);
    }

    //borrado del input al pulsar el botón de búsqueda
    pokeForm.elements.pokeSearch.value = '';
  };
  //llamada a la función principal´
  getPokemonList(pokeSearch);

  //reseteo de pokemon listados
  listedPokemon.innerHTML = '';
});

/**#############################################################################
 * ########################FUNCIÓN FILTRADO#####################################
 * #############################################################################
 */
const arrayFilter = (arr, input) => {
  const newArray = arr.filter((element) => {
    return element.startsWith(input);
  });
  return newArray;
};

/**#############################################################################
 * ########################FUNCIÓN RENDER POKEMON###############################
 * #############################################################################
 */
const renderPokemons = async (pokemonFiltered) => {
  //Frag
  const frag = document.createDocumentFragment();

  //empezar loading
  pokeList.innerHTML = `
  <div class="loader-container">
    <img class="loader" src="/css/gifs/loaderAshPika.gif"/>
    <h2 class="loader-text">Loading...</h2>
  </div>
  `;

  //llamada a los objetos con los datos de cada pokemon
  for (const pokemon of pokemonFiltered) {
    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      const data = await response.json();

      //destructuring del object de cada pokemon
      const { name, height, weight, stats, types, sprites } = data;

      //NAME, HEIGHT, WEIGHT
      const pokeName = name;
      const pokeHeight = height;
      const pokeWeight = weight;

      //STATS
      const pokeHp = stats[0].base_stat ? stats[0].base_stat : 'N/D';
      const pokeAttack = stats[1].base_stat ? stats[1].base_stat : 'N/D';
      const pokeDefense = stats[2].base_stat ? stats[2].base_stat : 'N/D';
      const pokeSpeed = stats[5].base_stat ? stats[5].base_stat : 'N/D';

      //TYPES
      const pokeType1 = types[0].type.name ? types[0].type.name : 'N/D';
      const pokeType2 = types[1] ? types[1].type.name : '';

      //SPRITES
      const pokeFrontSprite = sprites.front_default
        ? sprites.front_default
        : 'css/icons/not-available.png';
      const pokeBackSprite = sprites.back_default
        ? sprites.back_default
        : 'css/icons/not-available.png';

      //crear li
      const li = document.createElement('li');

      //agregar contenido al li
      li.innerHTML = `
      <div class="flip-container">
              <div class="card">
                <div class="front ${pokeType1}fondo">
                  <img
                    class="pokemon-front"
                    src="${pokeFrontSprite}"
                    alt="${pokeName} front"
                  />
                  <h2 class="pokeName">${pokeName}</h2>
                </div>
                <div class="back ${pokeType1}">
                  <ul class="types">
                    <li class="${pokeType1}">${pokeType1}</li>
                    <li class="${pokeType2}">${pokeType2}</li>
                  </ul>
                  <div class="container-back">
                    <img
                      class="pokemon-back"
                      src="${pokeBackSprite}"
                      alt="${pokeName} back"
                    />
                    <ul class="stats">
                      <li><h3>Ps: ${pokeHp}</h3></li>
                      <li><h3>Attack: ${pokeAttack}</h3></li>
                      <li><h3>Defense: ${pokeDefense}</h3></li>
                      <li><h3>Speed: ${pokeSpeed}</h3></li>
                    </ul>
                  </div>
                  <div class="heightWeight">
                    <ul class="pokemon-height">
                      <li>
                        <img
                          src="/css/icons/ruler_svg_color.svg"
                          alt="height"
                        />
                        <h3>${pokeHeight}</h3>
                      </li>
                    </ul>
                    <ul class="pokemon-weight">
                      <li>
                        <img
                          src="/css/icons/weigh_svg_color.svg"
                          alt="weight"
                        />
                        <h3>${pokeWeight}</h3>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
      `;

      //append del li al frag
      frag.append(li);
    } catch (err) {
      console.error(err);
    }
  }
  //acabar loading
  pokeList.innerHTML = '';

  //append del frag
  pokeList.append(frag);

  //llamada a función card flip
  cardFlipFunction();
};

/**#############################################################################
 * ########################FUNCIÓN PARA CARD FLIP###############################
 * #############################################################################
 */
const cardFlipFunction = () => {
  const card = document.getElementsByClassName('card');

  for (let i = 0; i < card.length; i++) {
    card[i].addEventListener('click', () => {
      card[i].classList.toggle('flipCard');
    });
  }
};

/**#############################################################################
 * ##################################MUSICA#####################################
 * #############################################################################
 */
const track = document.querySelector('audio');
const musicBtnPlay = document.querySelector('.musicBtnPlay');

musicBtnPlay.addEventListener('click', () => {
  if (track.paused) {
    track.play();
    musicBtnPlay.src = 'css/icons/soundOn.svg';
  } else {
    track.pause();
    musicBtnPlay.src = 'css/icons/soundOff.svg';
  }
});
