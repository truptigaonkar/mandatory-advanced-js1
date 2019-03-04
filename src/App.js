import React, { Component } from 'react';
import './App.css';

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
