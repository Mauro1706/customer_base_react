import React, { Component } from 'react';
import { Link } from "react-router-dom";
import api from '../../config/api';

class Detailer extends Component {
  
  constructor(props) {
    super(props);
    
    this.state = {
      client: {},
      messageError: "",
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    api.get(`/client/${id}`).then(
      client => { this.setState({ client: client.data.result }) },
    ).catch(
      erro => this.setState({ messageError: erro })
    );
  }

  render(){

    const { client } = this.state;

    return(
      <div class="my-5 container">
        <h1>Detalhes do Cliente</h1>
        <div class="my-5">
        <div className="usuario-info">
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Nome:</b> {client.name}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Documento:</b> {client.document}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Telefone:</b> {client.telephone}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Numero de Contrato:</b> {client.contractNumber}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Valor de Contrato:</b> {client.contractValue}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Situação Contrato:</b> {client.contractStatus}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Criado em:</b> {client.createdAt}</label>
          </div>
          <div class="form-group row">
            <label class="col-sm-12 col-form-label"><b>Ação:</b> {client.action}</label>
          </div>
              <br />
              <Link to={`/list`} class="btn btn-info mx-2"> Voltar </Link>
              <Link to={`/update/${client._id}`} class="btn btn-warning mx-2"> Editar </Link> 
          </div >
        </div>
      </div>
    );
  };

};

export default Detailer;
