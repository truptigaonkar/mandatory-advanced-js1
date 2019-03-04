import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';

const socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');
// Checking if connected to socket or not
socket.on('connect', function () {
  console.log("connected to socket");
});

// Component Authentication
class LoginForm extends React.Component {
  handleSignIn(e) {
    e.preventDefault()
    let username = this.refs.username.value
    this.props.onSignIn(username)
  }
  // Rendering login page
  render() {
    return (
      <form onSubmit={this.handleSignIn.bind(this)}>
        <h3>Sign in</h3>
        <input type="text" ref="username" required="required" minLength={1} maxLength={12} placeholder="Enter username" />
        <input type="submit" value="Login" />
      </form>
    )
  }
}

class App extends Component {
  constructor(props) {
    super(props)
    // the initial application state
    this.state = {
      signedin: false,
      user: null,
      messages: []
    }
  }

  // Authentication signin
  signIn(username) {
    // calling setState will re-render the entire app (efficiently!)
    this.setState({ signedin: true, user: { username } })
  }

  // Authentication signout which clear out user from state
  signOut() {
    this.setState({ signedin: false, user: null })
  }

  // Fetch the data from An External API
  componentDidMount() {
    this.socket = io('http://ec2-13-53-66-202.eu-north-1.compute.amazonaws.com:3000');

    // Writing messages
    socket.on("messages", (messages) => {
      this.setState({ messages }); // This is same as 'this.setState({ messages: messages });'
    });

    // Listening messages
    socket.on("new_message", (message) => {
      this.setState({ messages: [...this.state.messages, message] });
    });
  }

  // Creating list
  createList(objItem) {
    console.log(objItem);
    return (
      <li key= {objItem.id}>
        <p>{objItem.username}</p>
        <p>{objItem.content}</p>
      </li>
    )
  }

  // Rendering page after successfully login
  render() {
    // if statement true, you will see the list of messages
    if (!this.state.signedin) {
      return (
        <div className="App">
          <div className="loginApp">
            {
              (this.state.user) ?
                <Welcome user={this.state.user} onSignOut={this.signOut.bind(this)} />
                :
                <LoginForm onSignIn={this.signIn.bind(this)} />
            }
          </div>
        </div>
      );
    } else {
      return (
        <div className="App">
          <div className="messageList">
            Welcome <strong>{this.state.user.username}</strong>! <br />
            {/* <a href="javascript:;" onClick={onSignOut}>Sign out</a> */}
            <button className="log-out" onClick={this.signOut.bind(this)}>Log Out</button>
            <ul>
              {this.state.messages.map(objItem => this.createList(objItem))}
            </ul>
          </div>
        </div>
      );
    }
  }
}

// Component to add Username to page
const Welcome = ({ user }) => {
  return (
    <div>
      Welcome <strong>{user.username}</strong>! <br />
    </div>
  )
}

export default App;
