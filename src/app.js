import React from 'react'
import ReactDOM from 'react-dom'
// import axios from 'axios'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import 'bulma'
import './styles/main.scss'
import Home from './components/common/Home'
import Navbar from './components/common/Navbar'
import ErrorPage from './components/common/Error'
import SecureRoute from './components/common/SecureRoute'
import FilmIndex from './components/films/FilmIndex'
import FilmShow from './components/films/FilmShow'
import FilmNew from './components/films/FilmNew'
import FilmEdit from './components/films/FilmEdit'
import Register from './components/auth/Register'
import Login from './components/auth/Login'

const App = () => (
  <BrowserRouter>
    <main>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <SecureRoute path="/films/:id/edit" component={FilmEdit} />
        <SecureRoute path="/films/new" component={FilmNew} />
        <Route path="/films/:id" component={FilmShow} />
        <Route path="/films" component={FilmIndex} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/*" component={ErrorPage} /> 
      </Switch>
    </main>
  </BrowserRouter>
)
ReactDOM.render(
  <App />,
  document.getElementById('root')
)




// class App extends React.Component {
//   state = { films: [] }
//   async componentDidMount() {
//     try {
//       const res = await axios.get('/api/films')
//       this.setState({ films: res.data })
//     } catch (err) {
//       console.log(err)
//     }
//   }
//   render() {
//     console.log(this.state.films)
//     return (
//       <>
//       <h1>James Bond Films</h1>
//       <div>
//         {this.state.films.map(film => (
//           <div key={film._id}> <h2>{film.name}</h2><img src={film.image} /><p>Actor: {film.actor}</p><p>Year: {film.year}</p></div>
//         ))}
//       </div>
//     </>
//     )
//   }
// }

// ReactDOM.render(
//   <App />,
//   document.getElementById('root')
// )