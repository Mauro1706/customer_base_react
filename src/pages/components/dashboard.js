import React, {Component} from 'react';

class Deshboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: [],
        };
    }

    render() {
        return (
            <div className="my-5 container">
                <h1>Bem Vindo a <b className={'text-warning'}>MyClient</b>!</h1>
            </div>
        )
    }
}

export default Deshboard;