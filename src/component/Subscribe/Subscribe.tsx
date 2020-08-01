import styles from "./Subscribe.module.scss";
import cls from "classnames";
import { FunctionComponent } from "react";
import { Row, Col, Form } from "react-bootstrap";
import { InboxFill } from "react-bootstrap-icons";

const Subscribe: FunctionComponent<{}> = ({}) => {
  return (
    <div className={styles.segment}>
      <Row className={cls(styles.row, styles.alignCenter)}>
        <Col className={styles.column}>
          <Row className={styles.alignCenter}>
            <Col className={cls(styles.inboxIcon, styles.textRight)} xs="1">
              <InboxFill />
            </Col>
            <Col>
              <Form.Control
                className={styles.inputText}
                type="text"
                placeholder="Email Address"
              />
            </Col>
          </Row>
        </Col>
        <Col xs={12} lg={4} className={cls(styles.column, styles.textRight)}>
          <Row>
            <Col>
              <button className={styles.button}>Clear</button>
            </Col>
            <Col>
              <button className={styles.button}>Search</button>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Subscribe;
