import React, {Component} from "react";
import {Redirect} from "react-router-dom";
import AuthService from "../../Services/AuthService";

interface CallbackProps {
  match: {
    params: {
      token: string;
    }
  }
}

export default class LoginCallback extends Component<CallbackProps, {redirect: boolean}> {
  constructor(props) {
    super(props);
    
    this.state = {
      redirect: false
    };
  }
  
  componentDidMount() {
    AuthService.login(this.props.match.params.token)
      .then(() => {
        this.setState({
          redirect: true
        });
      });
  }
  
  render(): JSX.Element {
    if (!this.state.redirect) return null;
    
    return <Redirect to={"/"}/>
  }
}