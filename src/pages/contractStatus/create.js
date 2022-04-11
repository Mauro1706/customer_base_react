import React, { Component } from 'react';
import { Redirect, Link } from 'react-router-dom';
import api from '../../config/api';

class CreateContractStatus extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      aval: {
        value: "",
      },
      messageError: null,
      redirect: false,
    };
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
    
    api.post('/contract/status', this.state.aval)
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

    const { redirect } = this.state;
    if (redirect) {
      return <Redirect to="/contract/status/list" />;
    } else {
      return(
        <div class="my-5 container">
          <h1 className={'text-center bg-light'}>Cadastro de Cliente</h1>
          <div>{this.state.messageError}</div>
          <div class="my-5">
            <form class="form" onSubmit= { this.hendlerSubmint }>
              <div class="form-group row">
                <label htmlFor="name" class="col-sm-4 col-form-label text-right">Descrição Status:</label>
                <div class="col-sm-6">
                  <input type="input" required="required" class="form-control" name="value" id="value" 
                  placeholder="Descrição do status do contrato"
                  value={this.state.aval.value}
                  onChange={ this.handleInputChange } />
                </div>
              </div>
              <br/>
              <div class="text-center col-md-12">
                  <button type="submit" class="btn btn-success">Gravar</button>
                  <Link to={`/contract/status/list`} class="btn btn-warning mx-2"> Voltar </Link>  
              </div>
            </form>
          </div>
        </div>
      );
    }
  };

};

export default CreateContractStatus;
