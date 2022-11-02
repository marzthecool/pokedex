import { useStyles } from '../styles/muiStyles'
import { Box, AppBar, Toolbar, Typography, Container, TableContainer, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material'

export default function Home({ PokemonData }) {
  const classes = useStyles();

  console.log('PokemonData', PokemonData)

  return (
    <>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Pokemon list
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>

      <Container sx={{ display:"flex", justifyContent:"center", alignItems:"center" }}>
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
              {PokemonData.map((pokemon, index) => { 
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

  const fetchPokemonById = (idx) => {
    return fetch(`https://pokeapi.co/api/v2/pokemon/${idx}`)
      .then(response => response.json())
      .then(data => data)
  }

  let arrayPokemon = []

  for (let index = 1; index <= 200; index++) {
    let data1 = await fetchPokemonById(index)
    arrayPokemon.push(data1)
  }

  let PokemonData = arrayPokemon.map(pokemon => {
    return({
      id: pokemon.id,
      name: pokemon.name,
      image_url: pokemon.sprites.other.dream_world.front_default,
      species_url: pokemon.species.url,
    })
  })

  return {
    props: {
      PokemonData
    },
  }
}