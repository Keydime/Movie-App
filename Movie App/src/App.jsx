const Card = ({title}) => {
  return (
    <div style ={{
      border: '1px solid #a83cc9ff',
      backgroundColor: '#31363f',
      padding: '20px',
      borderRadius: '10px',
      margin: '10px',
      minHeight: '100px',
    }} >
      <h2>{title}</h2>
    </div>
  )
}




const App = () => {

  return (
    <div className= "card-container">
      <Card title="Star Wars" rating={5} isCool={true} />
      <Card title="Avatar" />
      <Card title="The Lion King" />
    </div>
  )
}

export default App
