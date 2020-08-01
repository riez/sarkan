import styles from "./Search.module.scss";
import { FunctionComponent, useCallback, useState } from "react";
import { Row, Col, Button, Form } from "react-bootstrap";
import Select from "react-select";
import { AreaModel } from "../../models/area";
import { SizeModel } from "../../models/size";
import { Router } from "../../routes";
import { serialize } from "../../utils";

interface Props {
  dataCity: Array<AreaModel>;
  dataSize: Array<SizeModel>;
}

const Search: FunctionComponent<Props> = ({ dataCity, dataSize }) => {
  const cityOptions = dataCity?.map((item: AreaModel) => ({
    value: item.city,
    label: item.city,
  }));
  const sizeOptions = dataSize?.map((item: SizeModel) => ({
    value: item.size,
    label: item.size,
  }));
  const [city, setCity] = useState({ value: "", label: "Choose City" });
  const [area, setArea] = useState({ value: "", label: "Choose Size" });
  const handleSearch = useCallback(() => {
    const query = {
      city: city.value,
      area: area.value,
    };
    Router.push(`/list?${serialize(query)}`);
  }, [city, area]);
  return (
    <div className={styles.segment}>
      <Row className={styles.row}>
        <Col xs={12} lg={5}>
          <Form.Row>
            <Form.Group className={styles.formGroup} controlId="location">
              <Form.Label>Find by City</Form.Label>
              <Select
                id="city-options"
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
                value={area}
                onChange={setArea}
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
