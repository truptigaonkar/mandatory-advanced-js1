import React, { Component } from 'react';
import './App.css';
import io from 'socket.io-client';
import LoginForm from './components/loginform'; //Component LoginForm from src/components/loginform.js
import { Button, Card, CardHeader, CardBody, Collapse, Navbar, NavbarBrand, Nav, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Spinner, CardFooter } from 'reactstrap';
import user1 from './user1.png';
import Linkify from "react-linkify";
import Emojify from "react-emojione";

//const socket = io('http://localhost:8000');
const socket = io('https://cors-anywhere.herokuapp.com/http://gifted-antonym-257013.appspot.com/');
// Checking if connected to socket or not
socket.on('connect', function () {
  //console.log("connected to socket");
});

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
    //this.socket = io('http://localhost:8000');
    this.socket = io('https://cors-anywhere.herokuapp.com/http://gifted-antonym-257013.appspot.com/');

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
    //console.log(objItem);
    return (
      <p key={objItem.id}>
        <div style={{ marginLeft: '10px' }}><img alt="user pic" width='20px' height='20px' src={require("./user2.png")} /> <strong style={{ color: 'red' }}>{objItem.username} </strong></div>
        <Card body inverse style={{ height: '70px', width: '350px', borderRadius: '20px', marginLeft: '60px', backgroundColor: '#3FE0D0' }}>
          <div>
            <Linkify className="message__content">
              <Emojify color="danger" style={{ height: 20, width: 20, }}>{objItem.content}</Emojify>
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
    this.setState({ message: "halkat" });
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
        <>
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
            <Card style={{ width: '600px' }}>
            <CardHeader color="primary" tag="h5" style={{ backgroundColor: '#87CEFA', position: "fixed-top"  }}><i className="fa fa-comments"></i> Welcome to Live Chat!</CardHeader>
              <div class="scrollbar" id="style-default">
                <div class="force-overflow">
                  <CardBody>
                  {this.state.messages.map(objItem => this.createList(objItem))}
                  </CardBody>
                </div>
              </div>
              <CardFooter style={{ position: "fixed-bottom", display:'flex' }}>
                  <textarea minLength={1} maxLength={200} style={{ width: 500, height: 50, borderRadius: 5 }} type="text" value={this.state.value} onChange={this.handleInput.bind(this)} required="required" placeholder="Type message here ......" />
                  <Button color="danger" style={{ width: 100, height: 50, borderRadius: 5 }} onClick={this.handleButton.bind(this)}><i className="fa fa-send"></i></Button>
              </CardFooter>
            </Card>
          </div> 
        </>

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
