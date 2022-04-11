import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../../config/api';

class App extends Component {
  
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
      messageError: null,
      redirect: false,
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

  exibeErro() {
    const { messageError } = this.state;
    if (messageError) {
        return (
            <div className="alert alert-danger" role="alert">
                Erro de conexão com o servidor
            </div>
        );
    }
  }

  handleInputChange = event =>{
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState(prevState => ({
      aval: {...prevState.aval, [name]: value }
    }));
  }

  hendlerSubmint = event => {
    
    api.post('/client', this.state.aval)
      .then(response => {
        if (!response.data.result){
          this.setState({ messageError: response.data.msg });
        } 
        this.setState({ redirect: true });
      })
      .catch(error => {
        this.setState({ errorMessage: error.message });
      });    

    event.preventDefault();
  };

  render(){

    const { redirect, statusList } = this.state;
    if (redirect) {
      return <Redirect to="/list" />;
    } else {
      return(
        <div class="my-5 container">
          <h1 className={'text-center bg-light'}>Cadastro de Cliente</h1>
          <div>{this.state.messageError}</div>
          <div class="my-5">
            <form class="form" onSubmit= { this.hendlerSubmint }>
              <div class="form-group row">
                <label htmlFor="name" class="col-sm-4 col-form-label text-right">Nome:</label>
                <div class="col-sm-6">
                  <input type="input" required="required" class="form-control" name="name" id="name" 
                  placeholder="Nome Completo do Usuário"
                  value={this.state.aval.name}
                  onChange={ this.handleInputChange } />
                </div>
              </div>
              <br/>
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
                      {statusList.map((status) => (
                          <option value={status.value}>{status.value}</option>
                      ))}
                    </select>
                  </div>
              </div>
              <br/>
              <div class="text-center col-md-12">
                  <button type="submit" class="btn btn-success">Gravar</button>
                  <Link to={`/list`} class="btn btn-warning mx-2"> Voltar </Link>  
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

};

export default App;
