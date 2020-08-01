import "../../styles/globals.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import App from "next/app";
import { SWRConfig } from "swr";
import { Spinner } from "react-bootstrap";

const renderLoadingPage = (): any => (
  <div className="spinner">
    <Spinner animation="grow" />
  </div>
);
const renderErrorPage = (): any => <div>Error!</div>;

class Root extends App {
  render(): React.ReactElement {
    const { Component, pageProps } = this.props;
    return (
      <SWRConfig
        value={{
          fetcher: (url: string) => fetch(url).then((res) => res.json()),
        }}
      >
        <Component
          {...pageProps}
          renderErrorPage={renderErrorPage}
          renderLoadingPage={renderLoadingPage}
        />
      </SWRConfig>
    );
  }
}
export default Root;
