import { useState } from 'react'
import { useStyles } from '../styles/muiStyles'
import { Stack, Button, Box, AppBar, Toolbar, Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function Home({ pokemonData, genders, PokemonByGender, colors, PokemonByColor }) {
  console.log('pokemonData', pokemonData)

  const classes = useStyles();
  const [pokemon, setPokemon] = useState(pokemonData)

  const genderFilter = (selectedGender) => {
    setPokemon(pokemonData)
    let arrayTemp=[]

    switch (selectedGender) {
      case 'all_pokemon':
        console.log('all_pokemon')
        setPokemon(pokemonData)
        break;
      case 'female':
        arrayTemp = PokemonByGender[0]
        break;
      case 'male':
        arrayTemp = PokemonByGender[1]
        break;
      case 'genderless':
        arrayTemp = PokemonByGender[2]
        break;
    }
    
    console.log(arrayTemp)

    let arrayNames = []
    arrayTemp.pokemonGenderList.map(pokemon => {arrayNames.push(pokemon.pokemon_species.name)})
    
    console.log(arrayNames)

    let filteredDataByGender = []
    arrayNames.map(name => {
      pokemonData.map(pokemon => {
        if (pokemon.name == name) {
          filteredDataByGender.push(pokemon)
        }
      })
    })

    console.log('filtered by gender',filteredDataByGender)

    
    setPokemon(filteredDataByGender)
  }

  const colorFilter = (selectedColor) => {
    setPokemon(pokemonData)
    let arrayTemp=[]

    switch (selectedColor) {
      case 'all_pokemon':
        console.log('all_pokemon')
        setPokemon(pokemonData)
        break;
      case 'black':
        arrayTemp = PokemonByColor[0]
        break;
      case 'blue':
        arrayTemp = PokemonByColor[1]
        break;
      case 'brown':
        arrayTemp = PokemonByColor[2]
        break;
      case 'gray':
        arrayTemp = PokemonByColor[3]
        break;
      case 'green':
        arrayTemp = PokemonByColor[4]
        break;
      case 'pink':
        arrayTemp = PokemonByColor[5]
        break;
      case 'purple':
        arrayTemp = PokemonByColor[6]
        break;
      case 'red':
        arrayTemp = PokemonByColor[7]
        break;
      case 'white':
        arrayTemp = PokemonByColor[8]
        break;
      case 'yellow':
        arrayTemp = PokemonByColor[9]
        break;
    }
    
    console.log(arrayTemp)

    let arrayNames = []
    arrayTemp.pokemonColorList.map(pokemon => {arrayNames.push(pokemon.name)})
    
    console.log(arrayNames)

    let filteredDataByColor = []
    arrayNames.map(name => {
      pokemonData.map(pokemon => {
        if (pokemon.name == name) {
          filteredDataByColor.push(pokemon)
        }
      })
    })

    console.log('filtered by gender',filteredDataByColor)
    
    setPokemon(filteredDataByColor)
  }

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6' component='div' sx={{ flexGrow: 1 }}>
              Pokemon list
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      
      <Container sx={{ padding:'20px' }}>
        {/* Buttons to filter by gender */}
        <Stack spacing={2} direction='row'>
          <Typography>Filter by gender:</Typography>
          <Button variant='outlined' onClick={() => genderFilter('all_pokemon')}>Show all</Button>
          {genders.map((gender) => {
            return (
              <Button variant='outlined' onClick={() => genderFilter(gender.name)}>
                {gender.name}
              </Button>
            )
          })}
        </Stack>

        {/* Buttons for filter by color */}
        <Stack spacing={2} direction='row' sx={{ marginTop:'5px' }}>
          <Typography>Filter by color:</Typography>
          <Button variant='outlined' onClick={() => colorFilter('all_pokemon')}>Show all</Button>
          {colors.map((color) => {
            return (
              <Button variant='outlined' onClick={() => colorFilter(color.name)}>
                {color.name}
              </Button>
            )
          })}
        </Stack>
      </Container>

      <Container sx={{ display:'flex', justifyContent:'center', alignItems:'center' }}>
        <TableContainer sx={{ width: '50%' }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '10%' }}>ID</TableCell>
                <TableCell sx={{ width: '20%' }}>Name</TableCell>
                <TableCell sx={{ width: '20%' }}>Image</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {pokemon.map((pokemon, index) => { 
                return (
                  <TableRow>
                    <TableCell>{pokemon.id}</TableCell>
                    <TableCell sx={{ textTransform: 'capitalize' }}>{pokemon.name}</TableCell>
                    <TableCell>
                      <Box>
                        <img src={pokemon.image_url} alt={pokemon.name} style={{width: '75px', height: '75px'}} />
                      </Box>
                    </TableCell>
                  </TableRow>
              )})}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  )
}

export async function getServerSideProps() {
  //list of colors
  const fetchColors = await fetch(`https://pokeapi.co/api/v2/pokemon-color`)
  const colors = await fetchColors.json()

  //fetching all pokemon by color data
  const fetchPokemonByColor = async (idx) => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon-color/${idx}`);
    const data = await response.json();
    return data;
  }

  let arrayPokemonByColor = []

  for (let index = 1; index <= 10; index++) {
    let data = await fetchPokemonByColor(index)
    arrayPokemonByColor.push(data)
  }

  let PokemonByColor = arrayPokemonByColor.map(color => {
    return({
      color: color.name,
      pokemonColorList: color.pokemon_species,
    })
  })

  ////////////////////////

  //list of genders
  const fetchGenders = await fetch(`https://pokeapi.co/api/v2/gender`)
  const genders = await fetchGenders.json()

  //fetching all pokemon by gender data
  const fetchPokemonByGender = (idx) => {
    return fetch(`https://pokeapi.co/api/v2/gender/${idx}`)
      .then(response => response.json())
      .then(data => data)
  }

  let arrayPokemonByGender = []

  for (let index = 1; index <= 3; index++) {
    let data = await fetchPokemonByGender(index)
    arrayPokemonByGender.push(data)
  }

  let PokemonByGender = arrayPokemonByGender.map(gender => {
    return({
      gender: gender.name,
      pokemonGenderList: gender.pokemon_species_details,
    })
  })

  ////////////////////////

  //fetching all pokemon data
  const fetchPokemon = (idx) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${idx}`)
      .then(response => response.json())
      .then(data => data)
  }

  let arrayPokemon = []

  for (let index = 1; index <= 150; index++) {
    let data = await fetchPokemon(index)
    arrayPokemon.push(data)
  }

  let pokemonData = arrayPokemon.map(pokemon => {
    return({
      id: pokemon.id,
      name: pokemon.name,
      image_url: pokemon.sprites.other.dream_world.front_default,
      species_url: pokemon.species.url,
    })
  })

  return {
    props: {
      pokemonData,
      genders: genders.results,
      PokemonByGender,
      colors: colors.results,
      PokemonByColor,      
    },
  }
}