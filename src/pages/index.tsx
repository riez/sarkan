import { NextPage } from "next";
import { useList, useSize, useArea, useCity } from "../utils/hooks";

import Page from "../component/Page";
import { Container } from "react-bootstrap";
import Search from "../component/Search/Search";
import Step from "../component/Step/Step";
import Subscribe from "../component/Subscribe/Subscribe";

const Homepage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const { data: dataCity, error: errorCity } = useCity();
  const { data: dataSize, error: errorSize } = useSize();
  if (errorCity || errorSize) {
    return renderErrorPage();
  }
  if (!dataCity || !dataSize) {
    return renderLoadingPage();
  }
  return (
    <Page>
      <Container>
        <Search dataCity={dataCity} dataSize={dataSize} />
        <Step />
        <Subscribe />
      </Container>
    </Page>
  );
};

export default Homepage;
