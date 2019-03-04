import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';


const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
// Checking whether you can connect to server or not
socket.on('connect', function () {
  console.log("connected to socket");
});

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
      user: null,
      messages: []
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

  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

    // Writing messages
    socket.on("messages", (messages) => {
      console.log(messages);
      this.setState({ messages }); // This is same as 'this.setState({ messages: messages });'
    });

    // Listening messages
    socket.on("new_message", (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

    // Creating list
    list(item) {
      console.log(item);
      return (
        <li key= {item.id}>
          <p>{item.username}</p>
          <p>{item.content}</p>
        </li>
      )
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
        <ul>
          {this.state.messages.map(item => this.list(item))}
        </ul>
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
