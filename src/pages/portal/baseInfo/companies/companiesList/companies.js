import React, { Component } from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Table
} from "reactstrap";
import { Edit2, Trash, PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveCompany,
  GetCompaniesModal,
  AddCompanyModel
} from "../../../../../redux/actions/companiesActions";
import * as types from "../../../../../redux/constants";
import '../../baseInfo.css'

 

class CompaniesList extends Component {
  // generateCode = () => {
  //   let text = "QWERTYUIOPASDFGHJKLZXCVBNM123456789QWERTYUIOPASDFGHJKLZXCVBNM123456789"
  //   let code = ''

  //   for(var i=0; i<6; i++){
  //     let start = Math.floor(Math.random() * text.length + 1)  
  //     console.log('Math.random(): ', Math.random());
  //     console.log('text.Length: ', text.length);
  //     console.log('start: ', start);

  //     let one_char = text.substring(start, start + 1);
  //     console.log('one_char: ', one_char);

  //     code += one_char;
  //     console.log('========================');
  //   }
  //   console.log('security code: ', code);
  // }
  render = () => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            شرکتها
          </CardTitle>
        </CardHeader>
        <CardBody >
          <Table style={{direction:'rtl'}} hover striped responsive>
            <thead id="th">
              <tr id="tr">
                <th >#</th>
                <th style={{ width: "100%", textAlign:'center' }}>نام شرکت</th>
                <th />
                <th />
              </tr>
            </thead>
            <tbody id="tb">
              {this.props.companies && this.props.companies.length > 0 ? (
                this.props.companies.map((company, index) => {
                  return ( 
                    <tr key={index}>
                      <td style={{ width: "4%"}}>{index+1}</td>
                      <td style={{ width: "90%", textAlign:'center' }}>{company.name}</td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Edit2
                          onClick={() =>
                            this.props.getCompaniesModal(company.id)
                          }
                          className="align-middle mr-1"
                          size={18}
                        />
                      </td>
                      <td style={{ width: "3%"}} className="table-action">
                        <Trash
                          onClick={() =>
                            this.props.removeCompany(company.id)
                          }
                          className="align-middle "
                          size={18}
                        />
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr><td>not found</td></tr>
              )}
            </tbody>
          </Table>
        </CardBody>
        <CardFooter>
          <PlusCircle
                onClick={() =>
                  this.props.addCompanyModel()
                  // this.generateCode()
                }
                className="align-middle"
                size={18}
            />
        </CardFooter>
      </Card>
    );
  };
}

const mapStateToProps = store => {
  return {
    companies: store.companies.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCompany: id => {
      if (window.confirm("آیا مطمئن هستید ?")) {
        dispatch(RemoveCompany(id));
      }
    },
    toggleModal: () =>
      dispatch({
        type: types.TOGGLE_COMPANY_MODAL
      }),
    getCompaniesModal: id => {
      dispatch(GetCompaniesModal(id))}, 
    addCompanyModel: () => {
      dispatch(AddCompanyModel())}
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompaniesList);
