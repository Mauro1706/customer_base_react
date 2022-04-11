import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../../config/api';

class Editar extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      aval: {
        name: "",
        document: "",
        telephone: "",
        contractNumber: "",
        contractValue: "",
        contractStatusId: ""
      },
      statusList: [],
      erro: null,
      redirect: false,
    };
  }

  async componentDidMount() {
    const { id } = this.props.match.params;
    api.get(`/client/${id}`).then(
      client => { this.setState({ aval: client.data.result }) }
    ).catch(
      erro => this.setState({ erro: erro })
    ); 

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

  exibeErro() {
      const { erro } = this.state;

      if (erro) {
          return (
              <div className="alert alert-danger" role="alert">
                  Erro de conexão com o servidor
              </div>
          );
      }
  }

  render(){
    const { redirect, statusList } = this.state;
    if (redirect) {
      return <Redirect to={`/view/${this.state.aval._id}`} />;
    } else {
      return(
        <div class="my-5 container">
          <h1>Atualizar Cliente</h1>
          <div class="my-5">
            <form class="form" onSubmit={this.handleSubmit}>
              <div class="form-group row">
                <label htmlFor="name" class="col-sm-4 col-form-label text-right">Nome:</label>
                <div class="col-sm-6">
                  <input type="input" required="required" class="form-control" name="name" id="name" 
                  placeholder="Nome Completo do Usuário"
                  value={this.state.aval.name}
                  onChange={ this.handleInputChange } />
                </div>
              </div><br/>
              <div class="form-group row">
                  <label htmlFor="document" class="col-sm-4 col-form-label text-right">CPF/CNPJ:</label>
                  <div class="col-sm-6">
                    <input type="input" required="required" class="form-control" name="document" id="document" 
                    placeholder="000.000.000-00"
                    value={this.state.aval.document}
                    onChange={ this.handleInputChange } />
                  </div>
              </div>
              <br/>
              <div class="form-group row">
                  <label htmlFor="telephone" class="col-sm-4 col-form-label text-right">Telefone:</label>
                  <div class="col-sm-6">
                    <input type="input" required="required" class="form-control" name="telephone" id="telephone" 
                    placeholder="(00) 0 0000-0000"
                    value={this.state.aval.telephone}
                    onChange={ this.handleInputChange } />
                  </div>
              </div>
              <br/>
              <div class="form-group row">
                  <label htmlFor="contractValue" class="col-sm-4 col-form-label text-right">Valor do Contrato:</label>
                  <div class="col-sm-6">
                    <input type="input" required="required" class="form-control" name="contractValue" id="contractValue" 
                    placeholder="2149.98"
                    value={this.state.aval.contractValue}
                    onChange={ this.handleInputChange } />
                  </div>
              </div>
              <br/>
              <div class="form-group row">
                  <label htmlFor="contractStatus" class="col-sm-4 col-form-label text-right">Status:</label>
                  <div class="col-sm-6">
                    <select className={"form-control"} required="required" name="contractStatus" id="contractStatus" 
                     onChange={ this.handleInputChange }>
                       <option value="">Selecione</option>
                      {statusList.map((status, index) => (
                          <option key={index} value={status.value}>{status.value}</option>
                      ))}
                    </select>
                  </div>
              </div>
              <br/>
              <div class="text-center col-md-12">
                  <button type="submit" class="btn btn-success mx-2">Gravar</button>
                  <Link to={`/view/${this.state.aval._id}`} class="btn btn-warning mx-2"> Voltar </Link>  
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

  handleInputChange = event =>{
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      aval: {...prevState.aval, [name]: value }
    }));
  }

  handleSubmit = event => {
    const { id } = this.props.match.params;
    
    api.put(`/client/${id}`, this.state.aval)
    .then(response => {
      if (!response.error){
        this.setState({ redirect: true });
      } else {
        this.setState({ erro: response });
      }
    }).catch(
      erro => this.setState({ erro: erro })
    );    

    event.preventDefault();
  };

};

export default Editar;