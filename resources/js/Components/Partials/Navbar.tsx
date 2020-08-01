import React, {Component} from "react";
import {Link} from "react-router-dom";
import AuthService from "../../Services/AuthService";
import Auth from "../../Services/API/Auth";
import {CSSTransition} from "react-transition-group";

let activeClasses = "px-3 py-2 rounded-md text-sm font-medium text-white bg-gray-900 focus:outline-none focus:text-white focus:bg-gray-700",
  nonActiveClasses = "px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700";

export default class Navbar extends Component<{active: string}, {userDropdown: boolean}> {
  constructor(props) {
    super(props);
    
    this.state = {
      userDropdown: false
    };
  }
  
  toggleUserDropdown = () => {
    this.setState({
      userDropdown: !this.state.userDropdown
    })
  };
  
  logout = () => {
    if (!AuthService.loggedIn) return;
    
    Auth.logout()
      .then(res => {
        AuthService.logout();
        this.forceUpdate();
      });
  };
  
  renderLink = (route, key): JSX.Element => {
    if (route.secured && !AuthService.loggedIn) return;
    
    return (
      <Link to={route.path} key={key}
            className={((this.props.active === route.activeKey) && activeClasses || nonActiveClasses) + ' mr-3'}>
        {route.text}</Link>
    )
  }
  
  render(): JSX.Element {
    let mainRoutes = [
      {
        path: "/",
        activeKey: "home",
        text: "Home"
      },
      {
        path: "/images",
        activeKey: "images",
        text: "Images"
      },
      {
        path: "/settings",
        activeKey: "settings",
        text: "Settings",
        secured: true
      }
    ];
    
    return (
      <nav className="bg-gray-800">
        <div className="container">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 ml-4">
                <img className="h-8 w-8" src="https://tailwindui.com/img/logos/workflow-mark-on-dark.svg" alt="Workflow logo"/>
              </div>
              <div className="hidden md:block">
                <div className="ml-10 flex items-baseline">
                  {mainRoutes.map(this.renderLink)}
                </div>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="ml-4 flex items-center md:ml-6">
                {AuthService.loggedIn && (
                  <div>
                    <img className="inline-block h-8 w-8 rounded-full mr-3" src={AuthService.user.avatar} alt="User Avatar" />
  
                    <div className="relative inline-block text-left">
                      <div>
                        <button onClick={() => this.toggleUserDropdown()}
                          className="flex items-center text-gray-200 hover:text-gray-400 focus:outline-none focus:text-gray-400"
                          aria-label="Options" id="options-menu" aria-haspopup="true" aria-expanded="true">
                          {AuthService.user.name}
                        </button>
                      </div>
                      
                      <CSSTransition in={this.state.userDropdown} timeout={{enter: 100, exit: 75}} classNames="dropdown-transition" unmountOnExit>
                        <div className="origin-top-right absolute right-0 mt-4 w-56 rounded-md shadow-lg">
                          <div className="rounded-md bg-white shadow-xs">
                            <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                              <a href="#"
                                 className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                 role="menuitem">Account settings</a>
                              <a href="#"
                                 className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                 role="menuitem">Support</a>
                              <a href="#"
                                 className="block px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                 role="menuitem">License</a>
                              <button type="submit" onClick={() => this.logout()}
                                      className="block w-full text-left px-4 py-2 text-sm leading-5 text-gray-700 hover:bg-gray-100 hover:text-gray-900 focus:outline-none focus:bg-gray-100 focus:text-gray-900"
                                      role="menuitem">
                                <i className="fad fa-sign-out mr-2"/>
                                Logout
                              </button>
                            </div>
                          </div>
                        </div>
                      </CSSTransition>
                    </div>
                    {/*<button onClick={() => this.logout()}>Logout</button>*/}
                  </div>
                ) || (
                  <Link to={"/login"}
                    className="ml-4 px-3 py-2 rounded-md text-sm font-medium text-gray-300 hover:text-white hover:bg-gray-700 focus:outline-none focus:text-white focus:bg-gray-700">Login</Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}