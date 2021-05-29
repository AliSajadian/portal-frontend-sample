import React from 'react';

function DepartmentSelection(props) {
    return (
        <Card>
        {/* <Row>
        <Col xl="4"></Col>
        <Col xl="2">
        <select value={company} style={{backgroundColor: "whitesmoke"}} onChange={(e) => this.setState({ company: Number(e.target.value)} )}>
            {props.companys ? props.companys.map((company) => 
            <option key={company.id} value={company.id}>{company.name}</option>
            ) : ''}
        </select>
        </Col>
        <Col xl="2">
        <select value={department} style={{backgroundColor: "whitesmoke"}}
            onChange={this.handleDepartmentEdit(this.state.guestMealsDay && this.state.guestMealsDay.length > 0 ? Number(this.state.guestMealsDay[0]['id']) : 0)}>
            {this.props.departments ? this.props.departments.filter(department => department.company === company).map((department) => 
            <option key={department.id} value={department.id}>{department.name}</option>
            ) : ''}
        </select>
        </Col>
        <Col xl="4"></Col>
        </Row> */}
        </Card>            
    );
}

export default DepartmentSelection;

