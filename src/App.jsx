import { useState } from 'react'
import './App.css'

const Card = ({title}) => {
  return (
    <div className="card">
      <h2>{title}</h2>
      <button onClick={() => setHasLiked(true)}>Like</button>
    </div>
  )
}

const App = () => {
  // const [hasLiked, setHasLiked] = useState(initialState: false);
  return (
    <div className="card-container">
      <Card title="Me Before You" rating={5} isCool={true}/>
      <Card title= "Star Wars"/>
      <Card title="The Lion King"/>
    </div>
  )
}


export default App
