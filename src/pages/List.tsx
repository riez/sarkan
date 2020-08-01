import styles from "../../styles/ListPage.scss";
import cls from "classnames";
import { NextPage } from "next";
import { Container, Row, Col, Spinner } from "react-bootstrap";
import useSWR, { useSWRPages } from "swr";
import InfiniteScroll from "react-infinite-scroller";

import Page from "../component/Page";
import { useCity, useSize } from "../utils/hooks";
import { getRouter } from "../routes";
import Card from "../component/Card/Card";
import Search from "../component/Search/Search";
import { serialize } from "../utils";
import { ListModel } from "../models/list";

const ListPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const router = getRouter();
  const currentQuery = router?.query || {};
  const { data: dataCity, error: errorCity } = useCity();
  const { data: dataSize, error: errorSize } = useSize();
  const { pages: dataList, loadMore, pageCount, pageSWRs } = useSWRPages(
    "paginate-list",
    (params) => {
      const query = {
        ...currentQuery,
        page: params.offset || 1,
      };
      const { data } = params.withSWR(useSWR(`/api/list?${serialize(query)}`));
      if (!data) {
        return (
          <Row className={cls(styles.innerContainer, styles.placeCenter, styles.stretch)}>
            <Spinner key="loadmore-productlist" animation="border" />
            </Row>
        );
      }
      return data?.items?.map((item: ListModel) => (
        <Col xs={12} md={6} lg={4}>
          <Card data={item} />
        </Col>
      ));
    },
    ({ data }) => {
      return data?.pagination?.currentPage <= data?.pagination?.endPage
        ? data?.pagination?.currentPage + 1
        : null;
    },
    [currentQuery]
  );

  if (errorCity || errorSize) {
    return renderErrorPage();
  }
  if (!dataCity || !dataSize) {
    return renderLoadingPage();
  }
  console.log();
  return (
    <Page>
      <Container>
        <Search dataCity={dataCity} dataSize={dataSize} />
        <Container className={styles.innerContainer}>Search Result</Container>
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={pageCount < pageSWRs?.[0]?.data?.pagination?.endPage}
        >
          <Row className={cls(styles.innerContainer)}>
            {dataList}
          </Row>
        </InfiniteScroll>
      </Container>
    </Page>
  );
};

export default ListPage;
