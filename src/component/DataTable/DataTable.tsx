import styles from "./DataTable.module.scss";
import cls from "classnames";
import { CaretUpFill, CaretDownFill } from "react-bootstrap-icons";
import { FunctionComponent, useCallback, useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Pagination from "./Pagination";
import Filter from "./Filter";
import { getRouter, Router } from "../../routes";
import { serialize } from "../../utils";

interface Props {
  data: Array<any>;
  dataMap: Array<any>;
  pageInfo: any;
  sortable?: Boolean;
  loading?: Boolean;
  properties?: any;
}

const DataTable: FunctionComponent<Props> = ({
  data,
  dataMap,
  sortable,
  loading,
  pageInfo,
  properties,
}) => {
  const router = getRouter();
  const currentQuery = router?.query || {};
  const currentPath = router.pathname;
  const filterOptions = properties?.filter || [];
  const [filterActive, setFilterActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const countFilter = useCallback(() => {
    const { page, sortField, sortDirection, ...filter } = currentQuery;
    return Object.keys(filter).length;
  }, []);

  const filterNum = countFilter();

  useEffect(() => {
    if (filterNum > 0) {
      setFilterActive(true);
    }
  }, []);

  const handleNewData = useCallback(() => {
    Router.push("/admin/new-data");
  }, []);

  const handleHeaderClick = useCallback(
    (data) => {
      const currentDirection = currentQuery?.sortDirection || "desc";
      const direction = currentDirection === "desc" ? "asc" : "desc";
      const query = {
        ...currentQuery,
        page: 1,
        sortField: data,
        sortDirection: direction,
      };
      const currentPath = router?.asPath?.split("?")?.[0] || "/";
      Router.push(`${currentPath}?${serialize(query)}`);
    },
    [currentQuery, currentPath]
  );

  const handleOnPageSelect = useCallback(
    (data) => {
      const query = {
        ...currentQuery,
        page: data,
      };
      const currentPath = router?.asPath?.split("?")?.[0] || "/";
      Router.push(`${currentPath}?${serialize(query)}`);
    },
    [currentQuery, currentPath]
  );

  const renderHeaderTitle = useCallback((data) => {
    if (sortable && data.key) {
      const currentQuery = router?.query || {};
      const key = currentQuery?.sortField || "updatedAt";
      const direction = currentQuery?.sortDirection || "desc";
      const unsorted = data?.key !== key;
      const isAsc = unsorted || (data?.key === key && direction === "asc");
      const isDesc = unsorted || (data?.key === key && direction === "desc");
      return (
        <div className={styles.thFilter}>
          <span className={styles.noWrap}>{data.name}</span>
          <div style={{ paddingRight: "10px", position: "relative" }}>
            {isAsc ? <CaretUpFill className={styles.sortUp} /> : null}
            {isDesc ? <CaretDownFill className={styles.sortDown} /> : null}
          </div>
        </div>
      );
    }
    return data.name;
  }, []);

  const renderTableHeader = useCallback(() => {
    const headers = [];
    dataMap.forEach((field, index) => {
      headers.push(
        <th
          key={`table-header-${index}`}
          className={cls(styles.th, {
            [`${styles.pointer}`]: field.key && sortable,
          })}
          onClick={() => field.key && sortable && handleHeaderClick(field.key)}
        >
          {renderHeaderTitle(field)}
        </th>
      );
    });
    return (
      <thead>
        <tr>{headers}</tr>
      </thead>
    );
  }, []);

  const renderTableData = useCallback((data) => {
    const tableData = [];

    dataMap.forEach((field, index) => {
      let renderData = null;
      renderData = data[field.key];

      if (field?.renderer) {
        renderData = field?.renderer(data);
      }
      tableData.push(
        <td key={`col-${index}`} className={cls(styles.td)}>
          {renderData}
        </td>
      );
    });
    return tableData;
  }, []);

  const renderTableBody = useCallback(() => {
    let rowData = [];
    const colNumbers = dataMap.length;

    rowData.push(
      <tr>
        <td colSpan={colNumbers} className={cls(styles.td, styles.itemCenter)}>
          {loading ? "Loading..." : "No data found"}
        </td>
      </tr>
    );

    if (data?.length) {
      rowData = data.map((row, index) => (
        <tr key={`table-row-${index}`}>{renderTableData(row)}</tr>
      ));
    }
    return <tbody>{rowData}</tbody>;
  }, []);

  const handleChangeSearchQuery = useCallback((e) => {
    setSearchQuery(e.target.value);
  }, []);

  const handleSubmitSearchQuery = useCallback(() => {
    const query = {
      ...currentQuery,
      searchQuery,
    };
    const currentPath = router?.asPath?.split("?")?.[0] || "/";
    Router.push(`${currentPath}?${serialize(query)}`);
  }, [searchQuery, currentQuery, currentPath]);

  return (
    <div className={cls(styles.bgWhite)}>
      <div className={cls(styles.segment)}>
        <Container>
          <Row className={cls(styles.actionControlContainer)}>
            <Col lg={6}>
              <Row className={cls(styles.noWrap, styles.filter)}>
                <Col xs={4} md={3}>
                  <button
                    className={cls(styles.button, {
                      [`${styles.activeFilter}`]: filterNum > 0 || filterActive,
                    })}
                    onClick={() => setFilterActive(!filterActive)}
                  >
                    {filterNum > 0 ? `Filter (${filterNum})` : "Filter"}
                  </button>
                </Col>
                <Col xs={8} md={8}>
                  <form onSubmit={handleSubmitSearchQuery}>
                    <input
                      className={styles.searchInput}
                      placeholder={"Search Something..."}
                      value={searchQuery}
                      onChange={handleChangeSearchQuery}
                    />
                  </form>
                </Col>
              </Row>
            </Col>
            <Col
              className={styles.itemRight}
              xs={{ span: 12, order: "first" }}
              md={{ span: 4, order: "last" }}
              lg={3}
            >
              <button
                className={cls(
                  styles.actionButton,
                  styles.bgCyan,
                  styles.colorWhite
                )}
                onClick={handleNewData}
              >
                Create New Data
              </button>
            </Col>
          </Row>
        </Container>
      </div>
      {filterActive && (
        <div className={cls(styles.segment)}>
          <Container>
            <Row>
              {(filterOptions || []).map((value: string, index) => (
                <Col xs={12} lg={4}>
                  <Filter params={value} />
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      )}
      <table className={styles.table}>
        {renderTableHeader()}
        {renderTableBody()}
      </table>
      {!!data?.length && (
        <Pagination
          onPageSelect={handleOnPageSelect}
          pageInfo={pageInfo}
          nextLabel="Next"
          prevLabel="Prev"
        />
      )}
    </div>
  );
};

export default DataTable;
