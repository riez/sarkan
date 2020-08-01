import styles from "../../styles/HomePage.scss";
import cls from 'classnames';
import { NextPage } from "next";
import { Container, Row, Col } from "react-bootstrap";

import { useList, useSize, useCity } from "../utils/hooks";
import Page from "../component/Page";
import Search from "../component/Search/Search";
import Step from "../component/Step/Step";
import Subscribe from "../component/Subscribe/Subscribe";
import Card from "../component/Card/Card";
import { ListModel } from "../models/list";

const Homepage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const { data: dataListByCity, error: errorListByCity } = useList({
    limit: 3,
    area_kota: "PANDEGLANG"
  });
  const { data: dataBestDeals, error: errorBestDeals } = useList({
    limit: 3,
    sortField: "price",
    sortDirection: "asc",
  });
  const { data: dataCity, error: errorCity } = useCity();
  const { data: dataSize, error: errorSize } = useSize();
  if (errorCity || errorSize || errorBestDeals || errorListByCity) {
    return renderErrorPage();
  }
  if (!dataCity || !dataSize || !dataBestDeals || !dataListByCity) {
    return renderLoadingPage();
  }
  return (
    <Page>
      <Container>
        <Search dataCity={dataCity} dataSize={dataSize} />
        <Step />
        <Row>
          <Container className={cls(styles.innerContainer, styles.titleText)}>Best Deals</Container>
        </Row>
        <Row>
          <Container className={styles.innerContainer}>
            <Row>
              {(dataBestDeals?.items || []).map((item: ListModel) => (
                <Col xs={4}>
                  <Card data={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </Row>
        <Row>
          <Container className={cls(styles.innerContainer, styles.titleText)}>Juragan Pandeglang</Container>
        </Row>
        <Row>
          <Container className={styles.innerContainer}>
            <Row>
              {(dataListByCity?.items || []).map((item: ListModel) => (
                <Col xs={4}>
                  <Card data={item} />
                </Col>
              ))}
            </Row>
          </Container>
        </Row>
        <Subscribe />
      </Container>
    </Page>
  );
};

export default Homepage;
