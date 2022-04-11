import React, { Component } from 'react';

class Header extends Component {

    render(){
    
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-dark"> 
                    <a className="navbar-brand text-warning mx-5" href="/">MyClient</a>
                    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item">
                                <a className={"nav-link text-white"} href="/list">Clientes</a>
                            </li>
                            <li className="nav-item">
                                <a className={"nav-link text-white"} href="/contract/status/list">Status Contrato</a>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        )
    };            
};

export default Header;