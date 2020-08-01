import styles from "./DataTable.module.scss";
import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { Router, getRouter } from "../../routes";
import { serialize } from "../../utils";

interface Props {
  params: any;
}

const Filter: FunctionComponent<Props> = (props) => {
  const { params } = props;
  const { key, name, placeholder } = params;
  const router = getRouter();
  const currentQuery = router?.query || {};
  const [state, setState] = useState("");

  useEffect(() => {
    const initialValue = currentQuery[key];
    if (initialValue) {
      setState(initialValue.toString());
    }
  });

  const handleChange = useCallback(
    (e) => {
      setState(e.target.value);
    },
    [state]
  );

  const handleSubmit = useCallback(() => {
    const query = {
      ...currentQuery,
      [key]: state,
    };
    const currentPath = router?.asPath?.split("?")?.[0] || "/";
    Router.push(`${currentPath}?${serialize(query)}`);
  }, [state]);
  return (
    <form className={styles.filter} onSubmit={handleSubmit}>
      <Col>
        <Row>{name}</Row>
        <Row>
          <input
            className={styles.filterInput}
            placeholder={placeholder}
            value={state}
            onChange={handleChange}
          />
        </Row>
      </Col>
    </form>
  );
};

export default Filter;
