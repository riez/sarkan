import styles from "./Footer.module.scss";
import { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: FunctionComponent<{}> = ({}) => {
  return (
    <div className={styles.segment}>
      <Container>
        <Row>
          <Col xs={6} lg={3}>
            <Container>
              <Row>SARKAN</Row>
            </Container>
          </Col>
          <Col xs={6} lg={3}>
            <Container>
              <Row className={styles.menuTitle}>Getting Started</Row>
              <Row className={styles.menuContent}>Content</Row>
            </Container>
          </Col>
          <Col xs={6} lg={3}>
            <Container>
              <Row className={styles.menuTitle}>Resources</Row>
              <Row className={styles.menuContent}>Content</Row>
            </Container>
          </Col>
          <Col xs={6} lg={3}>
            <Container>
              <Row className={styles.menuTitle}>Policies</Row>
              <Row className={styles.menuContent}>Content</Row>
            </Container>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
