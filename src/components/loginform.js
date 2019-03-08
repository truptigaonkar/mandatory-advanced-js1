import React, { Component } from 'react';
import { Button, Form, Card, CardTitle, CardText, CardHeader, InputGroup, InputGroupAddon, FormText } from 'reactstrap'; 

// Component Authentication
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
          rightUsername: true
        };
    
      }
    handleSignIn(e) {
      e.preventDefault()
        let username = this.refs.username.value
        const expression = /^[\w-]+$/;
        //check username
    if (expression.test(username)) {
        this.setState({
          rightUsername: true
        });
        this.props.onSignIn(username)
      } else {
        this.setState({
          rightUsername: false
        });
      }
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
                  <InputGroupAddon addonType="prepend">@</InputGroupAddon><input style={{ width: 350, height: 50, borderRadius: 5 }} type="text" ref="username" required="required" minLength={1} maxLength={12} placeholder="----------------  Enter Username  -----------------" />
                </InputGroup>
                <FormText color="warning">Username must be between 1 and 12 characters long</FormText>
                <FormText color="warning">Username can contain only letters, numbers and symbols</FormText>
              </CardText>
              
              <Button type="submit" value="Login" color="danger"><i className="fa fa-sign-in" style={{ fontSize: '36px' }}></i></Button>{' '}
            </Card>
          </Form>
        </div>
      )
    }
  }

  export default LoginForm;