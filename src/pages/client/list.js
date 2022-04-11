import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import api from '../../config/api';

class ListClient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clients: [],
            statusList: [],
            msg: ""
        };
    }

    async componentDidMount() {
        try {
            const response = await api.get('/client', this.state.aval);
            this.setState({
                clients: response.data.result,
                msg: response.data.msg ?? null
            });
        } catch (e) {
            this.setState({clients: []});
        }

        try {
            const response = await api.get('/contract/status');
            this.setState({
                statusList: response.data.result,
                msg: response.data.msg ?? null
            });
        } catch (e) {
            this.setState({statusList: []});
        }
    }

    handleButtonChange = event => {
        const target = event.target;
        const value = target.value;

        api.delete(`/client/disable/${value}`)
            .then(response => {
                if (!response.error) {
                   window.location.reload();
                }
            }).catch(
                erro => this.setState({erro: erro})
            );

        event.preventDefault();
    }

    handleButtonChangeCobrar = event => {
        const target = event.target;
        const value = target.value;
        console.log(value);
        api.delete(`/client/action/${value}/1`)
            .then(response => {
                if (!response.error) {
                   window.location.reload();
                }
            }).catch(
                erro => this.setState({erro: erro})
            );

        event.preventDefault();
    }

    handleButtonChangeAgradecer = event => {
        const target = event.target;
        const value = target.value;
        api.delete(`/client/action/${value}/0`)
            .then(response => {
                if (!response.error) {
                   window.location.reload();
                }
            }).catch(
                erro => this.setState({erro: erro})
            );

        event.preventDefault();
    }

    handleInputChangeFilter = event =>{
        const target = event.target;
        const value = target.value;

        api.get(`/client/by/${value}`)
        .then(response => {
            if (!response.error) {
                this.setState({
                    clients: response.data.result,
                    msg: response.data.msg ?? null
                });
            }
        }).catch(
            erro => this.setState({erro: erro})
        );   
    }

    render() {

        const {clients} = this.state;

        return (
            <div className="my-5 mx-5">
                <h1>Listar Clientes <a href="/novo" className="btn btn-outline-info" value="Editar">Novo</a></h1>
                <div className="my-4">
                    <div className="form-group row my-3">
                        <div className="col-sm-3">
                            <input type="text" className="form-control" 
                            placeholder="Filtro: Pago"
                            onChange={ this.handleInputChangeFilter } />
                        </div>
                    </div>
                    <table className="table table-bordered table-hover">
                        <thead>
                        <tr className="text-center text-white bg-dark">
                            <th>Código</th>
                            <th>Nome</th>
                            <th>Documento</th>
                            <th>Contato</th>
                            <th>Status</th>
                            <th>Ação</th>
                            <th></th>
                        </tr>
                        </thead>
                        <tbody>
                        {clients.map((client, index) => (
                            <tr key={index}>
                                <td className={'text-center'}>{index + 1}</td>
                                <td>{client.name}</td>
                                <td className={'text-center'}>{client.document}</td>
                                <td className={'text-center'}>{client.telephone}</td>
                                <td className={'text-center'}>{client.contractStatus}</td>
                                <td className={'text-center'}>{client.action ?? '--' }</td>
                                <td className="text-center">
                                    <Link to={`/view/${client._id}`} className="btn btn-outline-info">Visualizar</Link>&nbsp;
                                    <button onClick={this.handleButtonChange} refresh="true" value={client._id}
                                            className="btn btn-outline-danger">Cancelar Contrato
                                    </button>
                                    &nbsp;
                                    <button onClick={this.handleButtonChangeCobrar} refresh="true" value={client._id}
                                        disabled={client.contractStatus !== 'Em Atraso' ? `disabled` : ``}
                                        className="btn btn-outline-warning">Cobrar
                                    </button>
                                    &nbsp;
                                    <button onClick={this.handleButtonChangeAgradecer} 
                                        disabled={client.contractStatus !== 'Pago' ? `disabled` : ``} 
                                        refresh="true" value={client._id}
                                            className="btn btn-outline-success">Agradecer Pagamento
                                    </button>
                                    &nbsp;
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    };
};

export default ListClient;