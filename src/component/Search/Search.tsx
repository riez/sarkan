import styles from "./Search.module.scss";
import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { AreaModel } from "../../models/area";
import { SizeModel } from "../../models/size";
import { Router, getRouter } from "../../routes";
import { serialize } from "../../utils";

interface Props {
  dataCity: Array<AreaModel>;
  dataSize: Array<SizeModel>;
}

const Search: FunctionComponent<Props> = ({ dataCity, dataSize }) => {
  const router = getRouter();
  const currentQuery = router?.query || {};
  const cityOptions = dataCity?.map((item: AreaModel) => ({
    value: item.city,
    label: item.city,
  }));
  const sizeOptions = dataSize?.map((item: SizeModel) => ({
    value: item.size,
    label: item.size,
  }));
  const [city, setCity] = useState({ value: "", label: "Choose City" });
  const [size, setSize] = useState({ value: "", label: "Choose Size" });
  useEffect(() => {
    const city = currentQuery?.area_kota;
    const size = currentQuery?.size;
    if (city) {
      setCity({ value: city.toString(), label: city.toString() });
    }
    if (size) {
      setSize({ value: size.toString(), label: size.toString() });
    }
  }, []);

  const handleSearch = useCallback(() => {
    const query = {
      area_kota: city.value,
      size: size.value,
    };
    Router.push(`/list?${serialize(query)}`);
  }, [city, size]);
  return (
    <div className={styles.segment}>
      <Row className={styles.row}>
        <Col xs={12} lg={5}>
          <Form.Row>
            <Form.Group className={styles.formGroup} controlId="location">
              <Form.Label>Find by City</Form.Label>
              <Select
                className={styles.formControl}
                options={[{ value: "", label: "Choose City" }, ...cityOptions]}
                value={city}
                onChange={setCity}
              />
            </Form.Group>
          </Form.Row>
        </Col>
        <Col xs={12} lg={5}>
          <Form.Row>
            <Form.Group
              className={styles.formGroup}
              controlId="size"
              placeholder="Choose Size"
            >
              <Form.Label>Find by Size</Form.Label>
              <Select
                id="size-options"
                className={styles.formControl}
                options={[{ value: "", label: "Choose Size" }, ...sizeOptions]}
                value={size}
                onChange={setSize}
              />
            </Form.Group>
          </Form.Row>
        </Col>
        <Col xs={12} lg={2} className={styles.textRight}>
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
        </Col>
      </Row>
    </div>
  );
};

export default Search;
