const Friend = (props) => (
  <>
    <p>My friend named {props.name}</p>
  </>
)

const App = () => {
  const friends = [ 'Peter', 'Maya']
  
  return (
    <div id="friends">
    { friends.map((name)=>(<Friend name={name} />)) }
    </div>
  );
}

export default App;