import styles from "./Step.module.scss";
import cls from "classnames";
import { FunctionComponent } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import { CheckCircleFill } from "react-bootstrap-icons";

const Step: FunctionComponent<{}> = ({}) => {
  return (
    <div className={styles.segment}>
      <Row className={cls(styles.segmentTitle, styles.row)}>
        <strong>See</strong>&nbsp;How It Works
      </Row>
      <Row className={styles.row}>
        <Col xs={12} lg={4}>
          <Row className={styles.noWrap}>
            <Col className={cls(styles.stepIcon, styles.textRight)} xs="1">
              <CheckCircleFill />
            </Col>
            <Col className={styles.stepTitle}>Find What You Want</Col>
          </Row>
          <Row>
            <Col className={cls(styles.stepNumber, styles.textRight)} xs="1">
              1
            </Col>
            <Col className={styles.stepDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
              elit magna. Vivamus turpis purus, condimentum vitae ....
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={4}>
          <Row className={styles.noWrap}>
            <Col className={cls(styles.stepIcon, styles.textRight)} xs="1">
              <CheckCircleFill />
            </Col>
            <Col className={styles.stepTitle}>Negotiation</Col>
          </Row>
          <Row>
            <Col className={cls(styles.stepNumber, styles.textRight)} xs="1">
              2
            </Col>
            <Col className={styles.stepDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
              elit magna. Vivamus turpis purus, condimentum vitae ....
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={4}>
          <Row className={styles.noWrap}>
            <Col className={cls(styles.stepIcon, styles.textRight)} xs="1">
              <CheckCircleFill />
            </Col>
            <Col className={styles.stepTitle}>Deal</Col>
          </Row>
          <Row>
            <Col className={cls(styles.stepNumber, styles.textRight)} xs="1">
              3
            </Col>
            <Col className={styles.stepDescription}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce et
              elit magna. Vivamus turpis purus, condimentum vitae ....
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Step;
