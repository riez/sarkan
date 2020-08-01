import styles from "./Card.module.scss";
import cls from "classnames";
import { FunctionComponent } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { ListModel } from "../../models/list";

interface Props {
  data: ListModel;
}

const Card: FunctionComponent<Props> = ({ data }) => {
  return (
    <div className={styles.container}>
      <Container className={styles.blueGradient}>
        <div className={styles.innerContainer}>
          <Row className={styles.stretch}>
            <Container className={styles.komoditasText}>
              {data.komoditas}
            </Container>
          </Row>
          <Row className={cls(styles.stretch, styles.alignCenter)}>
            <Col>
              <Container>
                <Row className={styles.provinceText}>{data.area_provinsi}</Row>
                <Row className={styles.cityText}>{data.area_kota}</Row>
              </Container>
            </Col>
            <Col className={styles.priceText}>{data.price}</Col>
          </Row>
        </div>
      </Container>
    </div>
  );
};

export default Card;
