import React from "react";
import { Badge, Card, CardBody, Col, Container, Row } from "reactstrap";

const Changelog = () => (
  <Container fluid className="p-0">
    <h1 className="h3 mb-3">Changelog</h1>

    <Row>
      <Col lg="12">
        <Card className="p3 p-lg-4">
          <CardBody>
            <div id="changelog">
              <h4 className="d-inline-block mr-1">
                <Badge color="primary">v1.2.3</Badge>
              </h4>
              <h5 className="d-inline-block">– 10 August, 2019</h5>
              <ul>
                <li>Added projects page (pages/projects)</li>
                <li>Added introduction page (docs/introduction)</li>
                <li>Added changelog page (docs/changelog)</li>
                <li>Added installation page (docs/installation)</li>
                <li>Renamed kanban page to tasks (pages/tasks)</li>
                <li>Fixes issues with router in IE11</li>
                <li>Fixes issues with card height in IE11</li>
                <li>Small visual changes</li>
                <li>Upgraded various dependencies to LTS version</li>
              </ul>

              <h4 className="d-inline-block mr-1">
                <Badge color="primary">v1.2.2</Badge>
              </h4>
              <h5 className="d-inline-block">– 4 June, 2019</h5>
              <ul>
                <li>Improved Google Fonts loading time</li>
                <li>Fixed inconsistent sidebar labels</li>
                <li>Added wizard component (/forms/wizard)</li>
                <li>Added private route example</li>
                <li>Added catch-all route</li>
                <li>Upgraded various dependencies to LTS version</li>
              </ul>

              <h4 className="d-inline-block mr-1">
                <Badge color="primary">v1.2.1</Badge>
              </h4>
              <h5 className="d-inline-block">– 3 April, 2019</h5>
              <ul>
                <li>Fixed issues with Autoprefixer</li>
                <li>Upgraded various dependencies to LTS version</li>
              </ul>

              <h4 className="d-inline-block mr-1">
                <Badge color="primary">v1.2.0</Badge>
              </h4>
              <h5 className="d-inline-block">– 15 March, 2019</h5>
              <ul>
                <li>Added two new themes (corporate and modern)</li>
                <li>Added settings sidebar</li>
                <li>Added landing page</li>
                <li>Added clients page (/pages/clients)</li>
                <li>Restructured sass files</li>
                <li>Upgraded to Bootstrap 4.3.1</li>
                <li>Upgraded various dependencies to LTS version</li>
              </ul>
            </div>
          </CardBody>
        </Card>
      </Col>
    </Row>
  </Container>
);

export default Changelog;
