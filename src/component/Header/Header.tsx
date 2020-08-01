import styles from './Header.module.scss';
import { FunctionComponent } from "react";
import {Navbar, Nav, Row, Col, Container} from "react-bootstrap";

const Header: FunctionComponent<{}> = ({}) => {
  return (
    <>
      <div className={styles.headline}>
        <Container>
          <Row className={styles.row}>
            <Col className={styles.left} xs={6}>
              hotline: +62 811 523 373
            </Col>
            <Col className={styles.right} xs={6}>
              EN
            </Col>
          </Row>
        </Container>
      </div>
      <Container>
        <Navbar className={`${styles.navHeader}`}  collapseOnSelect expand="lg">
          <Navbar.Brand href="#home">SARKAN</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="justify-content-end">
            <Nav>
              <Nav.Link href="/admin">Admin Panel</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Container>
    </>
  )
}

export default Header;