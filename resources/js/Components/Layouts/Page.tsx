import React, {Component, PropsWithChildren, Fragment} from "react";
import Navbar from "../Partials/Navbar";

export default class Page extends Component<PropsWithChildren<{noContainer?: boolean, active: string}>> {
  render(): JSX.Element {
    let {noContainer} = this.props;
    
    return (
      <Fragment>
        <Navbar active={this.props.active} />

        <div className={!noContainer && "container my-3" || ""}>
          {this.props.children}
        </div>
      </Fragment>
    );
  }
}