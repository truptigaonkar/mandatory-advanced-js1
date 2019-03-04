import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

//----------- Checking connection to server, Listening and writing messages from and to console -------------//
const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
// Checking whether you can connect to server or not
socket.on('connect', function () {
  console.log("connected to socket");
});
// Listening messages from console
socket.on('new_message', function(message){
  console.log(message);
});
// Writing messages to console
socket.emit("message",{"username":"User11","content":"hej!"}, function(message){
   console.log(message);
})
//----------- End of Checking connection to server, Listening and writing messages from and to console -------------//

// Component Authentication 
class LoginForm extends React.Component {
  handleonSubmit(e) {
    e.preventDefault()
    let username = this.refs.username.value
    this.props.onSignIn(username)
  }
  // Rendering login page
  render() {
    return (
      <form onSubmit={this.handleonSubmit.bind(this)}>
        <h3>Sign in</h3>
        <input type="text" ref="username" required="required" minLength={1} maxLength={12} placeholder="Enter USERNAME" />
        <input type="submit" value="Login" />
      </form>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: null
    }
  }

  // Signin with authenticated user
  signIn(username) {
    // calling setState will re-render the entire app efficiently.
    this.setState({ user: {username} })
  }

  // Authentication signout which clear out user from state
  signOut() {
    this.setState({ user: null })
  }

  // Rendering page after successfully login 
  render() {
    return (
      <div className="App">
        <h1>Chat App</h1>
        {
          (this.state.user) ?
            <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)} />
            :
            <LoginForm onSignIn={this.signIn.bind(this)} />
        }
      </div>
    );
  }
}

// Component to add Username and signout button to page
const Welcome = ({ user, onSignOut }) => {
  return (
    <div>
      Welcome <strong>{user.username}</strong>! <br />
      <a href="javascript:;" onClick={onSignOut}>Sign out</a>
    </div>
  )
}

export default App;
