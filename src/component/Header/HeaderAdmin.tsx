import styles from "./Header.module.scss";
import { FunctionComponent } from "react";
import { Navbar, Nav, Row, Col, Container } from "react-bootstrap";

const HeaderAdmin: FunctionComponent<{}> = ({}) => {
  return (
    <>
      <div className={styles.navHeaderAdmin}>
        <Container>
          <Navbar
            className={`${styles.navHeaderAdmin}`}
            variant="dark"
            collapseOnSelect
            expand="lg"
          >
            <Navbar.Brand href="/">SARKAN</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse
              id="responsive-navbar-nav"
              className="justify-content-end"
            >
              <Nav>
                <Nav.Link href="/">Settings</Nav.Link>
              </Nav>
              <Nav>
                <Nav.Link href="/">Log Out</Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </Navbar>
        </Container>
      </div>
      <div className={styles.pageInfo}>
        <Container>
          <Row>
            {/* TODO */}
          </Row>
        </Container>
      </div>
    </>
  );
};

export default HeaderAdmin;
