import React, {Component, PropsWithChildren} from "react";
import {CSSTransition} from "react-transition-group";

interface ModalState {
  active: boolean;
  anim: boolean;
}

export default class Modal extends Component<PropsWithChildren<{}>, ModalState> {
  constructor(props) {
    super(props);
    
    this.state = {
      active: false,
      anim: false
    };
  }
  
  toggle = () => {
    if (this.state.active) {
      this.setState({
        anim: false
      });
      
      setTimeout(() => {
        this.setState({
          active: false
        })
      }, 200);
      
      return;
    }
    
    this.setState({
      active: true,
      anim: true
    });
  };
  
  render(): JSX.Element {
    //if (!this.state.active) return null;
    
    return (
      <CSSTransition in={this.state.anim} timeout={{enter: 300, exit: 200}} classNames="modal-transition" unmountOnExit>
        {this.props.children}
      </CSSTransition>
    );
  }
}