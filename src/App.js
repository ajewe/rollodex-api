import React from 'react';
import './App.css';

class App extends React.Component {
  
  state = {
    users: [],
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData() {
    fetch('https://randomuser.me/api?results=25')
    .then(response => response.json())
    .then(parsedJSON => parsedJSON.results.map(user => (
      {
        name: `${user.name.first} ${user.name.last}`,
        picture: `${user.picture.thumbnail}`,
        username: `${user.login.username}`,
        city: `${user.location.city}`,
        state: `${user.location.state}`,
        country: `${user.location.country}`,
        age: `${user.dob.age}`,
      }
    )))
    .then(users => this.setState({
      users,
    }))
    .catch(error => console.log('parsing failed', error))
  }

  render() {
    return (
      <div>
        <div className="users">
          {this.state.users.map((user, i) => {
            return (<UserListItem
            key={i}
            name={user.name}
            picture={user.picture}
            username={user.username}
            city={user.city}
            state={user.state}
            country={user.country}
            age={user.age}
            />)
          })
        }
        </div>
      </div>
    );
  }
}

class UserListItem extends React.Component {
  state = {
    moreInfoClicked: false,
  }

  toggleMoreInfo = () => {
    this.setState({moreInfoClicked: !this.state.moreInfoClicked})
  }

  render() {
    return(
      <div style={{margin: "40px"}}>
        <img src={this.props.picture} />
        <h1 style={{display: "inline", padding: "10px"}}>{this.props.name}</h1>
        {this.state.moreInfoClicked ? 
          <>
            <button onClick={this.toggleMoreInfo}>Hide Info</button>
            <h2>{this.props.username}</h2>
            <p>{this.props.city}, {this.props.state}</p>
            <p>Country: {this.props.country}</p>
            <p>Age: {this.props.age}</p>
          </>
          :
          <button onClick={this.toggleMoreInfo}>More Info</button>
        } 
      </div>
  )
  }
}

export default App;
