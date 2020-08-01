import styles from "./Footer.module.scss";
import { FunctionComponent } from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer: FunctionComponent<{}> = ({}) => {
  return (
    <div className={styles.segment}>
      <Container>
        <Row>
          <Col xs={12} lg={3}>
            <Row>SARKAN</Row>
          </Col>
          <Col xs={12} lg={3}>
            <Row className={styles.menuTitle}>Getting Started</Row>
            <Row className={styles.menuContent}>Content</Row>
          </Col>
          <Col xs={12} lg={3}>
            <Row className={styles.menuTitle}>Resources</Row>
            <Row className={styles.menuContent}>Content</Row>
          </Col>
          <Col xs={12} lg={3}>
            <Row className={styles.menuTitle}>Policies</Row>
            <Row className={styles.menuContent}>Content</Row>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Footer;
