import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
} from "reactstrap";
import { PlusCircle } from "react-feather";
import { connect } from "react-redux";
import {
  RemoveCompany,
  GetCompaniesModal,
  AddCompanyModel
} from "../../../../../redux/actions/companiesActions";
import * as types from "../../../../../redux/constants";
import { BaseTable } from "../../../../../components/tables/BaseTable";
import '../../baseInfo.css'


const columnList = [
  {
      Header: 'نام شرکت',
      accessor: 'name',
      maxWidth: '90%',
      minWidth: '80%',
      width: '85%',
  },
]
const CompaniesList = (props) => {
    return (
      <Card className="card3D">
        <CardHeader>
          <CardTitle tag="h5">
            شرکتها
          </CardTitle>
        </CardHeader>
        <CardBody >
        <BaseTable
          dataRecords={props.companies}
          columnList={columnList}
          editRecord={props.getCompaniesModal}
          removeRecord={props.removeCompany}
          />
        </CardBody>
        <CardFooter>
          <PlusCircle
                onClick={() =>
                  props.addCompanyModel()
                }
                className="align-middle"
                size={18}
            />
        </CardFooter>
      </Card>
    );
}

const mapStateToProps = store => {
  return {
    companies: store.companies.companies
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeCompany: id => {
      if (window.confirm("آیا از حذف رکورد مورد نظر مطمئن هستید ?")) {
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
