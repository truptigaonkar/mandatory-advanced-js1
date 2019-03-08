import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import { Button, Form, Card, CardTitle, CardText, CardHeader, InputGroup, InputGroupAddon, Collapse, Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, CardFooter } from 'reactstrap';
import user1 from './user1.png';
import Linkify from "react-linkify";
import Emojify from "react-emojione";

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
      <div className="login__form">
        <Form onSubmit={this.handleSignIn.bind(this)}>
          <CardHeader tag="h1" style={{ backgroundColor: '#7FDBFF' }}>Real-Time Chat</CardHeader>
          <Card body inverse color="info">
            <CardTitle tag="h5">SIGN-IN</CardTitle>
            <CardText>
              <InputGroup>
                <InputGroupAddon addonType="prepend">@</InputGroupAddon><input style={{ width: 350, height: 50, borderRadius: 5 }} type="text" ref="username" required="required" minLength={1} maxLength={12} placeholder="-----------------  Enter Username  -----------------" />
              </InputGroup>
            </CardText>
            <Button type="submit" value="Login" color="danger"><i className="fa fa-sign-in" style={{ fontSize: '36px' }}></i></Button>{' '}
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
      messages: [],
      message: "",
      path: './user1.png'
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
      <p>
        <div style={{ marginLeft: '10px' }}><img alt="user pic" width='20px' height='20px' src={require("./user2.png")} /> <strong style={{ color: 'red', fontSize: '20px' }}>{objItem.username} </strong></div>
        <Card body inverse color="primary" style={{ height: '70px', width: '350px', borderRadius: '20px', marginLeft: '60px' }}>
          <div>
            <Linkify style={{ color: "white" }}>
              <Emojify style={{ height: 20, width: 20 }}>{objItem.content}</Emojify>
            </Linkify>
          </div>
        </Card>
      </p>
    )
  }

  // Input button function
  handleInput(e) {
    this.setState({
      message: e.target.value
    });
  }

  // Submit button function
  handleButton() {
    socket.emit("message", {
      username: this.state.user.username,
      content: this.state.message,
    }, (status) => {
      this.setState({ messages: [...this.state.messages, status.data.newMessage] });
    });
    this.setState({ message: "" });
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
          {/* After login window */}
          <div className="loginPage" >
            <Navbar color="dark" className="navbar__header" light expand="md">
              <NavbarBrand className="navbar__brand" style={{ color: '#39ff14' }}><Spinner type="grow" color="warning" style={{ width: '2rem', height: '2rem' }} />Real-Time Chat</NavbarBrand>
              <Collapse isOpen={this.state.isOpen} navbar>
                <Nav className="ml-auto" navbar>
                  <UncontrolledDropdown nav inNavbar>
                    <DropdownToggle nav caret style={{ color: 'white' }}>
                      <span style={{ color: 'white', fontSize: 10 }}>Welcome! You're logged in as</span> <img src={user1} alt="User image" width="25px" /><strong style={{ color: 'orange', fontSize: 20 }}>{this.state.user.username} <Spinner size="sm" color="primary" />{' '}</strong>
                    </DropdownToggle>
                    <DropdownMenu right>
                      <DropdownItem>
                        <Button color="danger" style={{ width: 100, height: 40, borderRadius: 5 }} onClick={this.signOut.bind(this)}><i className="fa fa-sign-out">Signout</i></Button>
                      </DropdownItem>
                    </DropdownMenu>
                  </UncontrolledDropdown>
                </Nav>
              </Collapse>
            </Navbar>
            <br />
          </div>
          {/* Chat window */}
          <div className="messageList" style={{ position: 'absolute', left: '30%', top: '10%', bottom: '50%' }} >
            <Card className="chatWindow" style={{ width: 500, position: 'absolute' }}>
              <CardHeader tag="h5" style={{ backgroundColor: '#87CEFA' }}><i className="fa fa-comments"></i> Welcome to Live Chat!</CardHeader>
              {this.state.messages.map(objItem => this.createList(objItem))}
              <CardFooter>
                <Navbar style={{ color: 'white', position: 'fixed', bottom: '3%', left: '30%', width: 500, backgroundColor: '#87CEFA' }} expand="md">
                  <input style={{ width: 500, height: 50, borderRadius: 5 }} type="text" value={this.state.value} onChange={this.handleInput.bind(this)} required="required" placeholder="Type message here ......" />
                  <Button color="danger" style={{ width: 100, height: 50, borderRadius: 5 }} onClick={this.handleButton.bind(this)}><i className="fa fa-send"></i></Button>
                </Navbar>
              </CardFooter>
            </Card>
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
