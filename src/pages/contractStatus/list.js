import React, {Component} from 'react';
import api from '../../config/api';

class ListContractStatus extends Component {
    constructor(props) {
        super(props);
        this.state = {
            statusList: [],
            msg: ""
        };
    }

    async componentDidMount() {
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

        api.delete(`/contract/status/${value}`)
            .then(response => {
                if (!response.error) {
                   window.location.reload();
                }
            }).catch(
                erro => this.setState({erro: erro})
            );

        event.preventDefault();
    }

    render() {

        const {statusList} = this.state;

        return (
            <div class="my-5 container">
                <h1>Listar Status de Contrato</h1>
                <div class="my-5">
                    <table class="table table-bordered table-hover">
                        <thead>
                        <tr class="text-center text-white bg-dark">
                            <th>Código</th>
                            <th>Descrição</th>
                            <th><a href="/contract/status/novo" class="btn btn-outline-info" value="Editar">Novo</a></th>
                        </tr>
                        </thead>
                        <tbody>
                        {statusList.map((status, index) => (
                            <tr key={index}>
                                <td className={'text-center'}>{index + 1}</td>
                                <td className={'text-center'}>{status.value}</td>
                                <td class="text-center">
                                    <button onClick={this.handleButtonChange} refresh="true" value={status._id}
                                            className="btn btn-outline-danger">Deletar
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

export default ListContractStatus;