import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import { Button, Form, Card, CardTitle, CardText, CardHeader, InputGroup, InputGroupAddon, Collapse, Navbar, NavbarBrand, Nav,UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, ListGroup, ListGroupItem } from 'reactstrap';

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
      <div style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}>
        <Form onSubmit={this.handleSignIn.bind(this)}>
          <CardHeader tag="h1">CHAT Application</CardHeader>
          <Card body inverse color="info">
            <CardTitle tag="h5">SIGN-IN</CardTitle>
            <CardText>
            <InputGroup>
            <InputGroupAddon addonType="prepend">@</InputGroupAddon><input style={{width: 350, height: 50, borderRadius:5}} type="text" ref="username" required="required" minLength={1} maxLength={12} placeholder="-----------------  Enter Username  -----------------" /> 
              </InputGroup>
              </CardText>
            <Button type="submit" value="Login" color="danger">LOGIN</Button>{' '}
          </Card>
        </Form>
      </div> 
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

  // Input button function
  handleInput(e){
    this.setState({
      message: e.target.value
    });
  }

  // Submit button function
  handleButton(){
    socket.emit("message", {
      username: this.state.user.username,
      content: this.state.message,
    }, (status) => {
        this.setState({ messages: [...this.state.messages, status.data.newMessage]});
    });
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
          <Navbar color="dark" style={{color: 'white'}} light expand="md">
          <NavbarBrand><Spinner type="grow" color="warning" style={{ width: '2rem', height: '2rem' }}/>CHAT</NavbarBrand>
          <Collapse isOpen={this.state.isOpen} navbar>
            <Nav className="ml-auto" navbar>
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret style={{color: 'white'}}>
                <span style={{color: 'white', fontSize:10}}>Welcome! You're logged in as</span> <strong style={{color: 'orange', fontSize:20}}>{this.state.user.username} <Spinner size="sm" color="primary" />{' '}</strong>
                </DropdownToggle>
                <DropdownMenu right>
                  <DropdownItem>
                  <Button color="danger" style={{width: 100, height: 40, borderRadius:5}} onClick={this.signOut.bind(this)}>SIGNOUT</Button>
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </Nav>
          </Collapse>
        </Navbar>
            <ul>
              {this.state.messages.map(objItem => this.createList(objItem))}
            </ul>
            <input type="text" value={this.state.value} onChange={this.handleInput.bind(this)}/>
            <button onClick={this.handleButton.bind(this)}>Submit</button>
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
