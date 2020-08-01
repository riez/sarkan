import styles from "./DataTable.module.scss";
import cls from "classnames";
import { FunctionComponent, useCallback } from "react";

interface Props {
  onPageSelect: (any) => void;
  pageInfo?: any;
  nextLabel?: string;
  prevLabel?: string;
}

const Pagination: FunctionComponent<Props> = (props) => {
  const {
    pageInfo,
    onPageSelect,
    nextLabel = "Next",
    prevLabel = "Prev",
  } = props;

  const handleNextPage = useCallback(() => {}, []);
  const handlePrevPage = useCallback(() => {}, []);
  const renderPaginationList = useCallback(() => {
    const items = [];
    const { totalPages, currentPage } = pageInfo;
    let delta = 2,
      range = [],
      currentIndex: number;
    range.push(1);
    for (let i = currentPage - delta; i <= currentPage + delta; i++) {
      if (i < totalPages && i > 1) {
        range.push(i);
      }
    }
    range.push(totalPages);
    for (let i of range) {
      if (currentIndex) {
        if (i - currentIndex === 2) {
          items.push(
            <button key={`break-${i}`} className={cls(styles.paginationButton)}>
              ...
            </button>
          );
        } else if (i - currentIndex !== 1) {
          items.push(
            <button key={`break-${i}`} className={cls(styles.paginationButton)}>
              ...
            </button>
          );
        }
      }
      items.push(
        <button
          key={`page-${i}`}
          className={cls(styles.paginationButton, {
            [`${styles.activePage}`]: i === currentPage,
          })}
          onClick={onPageSelect.bind(null, i)}
        >
          {i}
        </button>
      );
      currentIndex = i;
    }

    return items;
  }, [pageInfo]);
  return (
    <div className={styles.pagination}>
      <button className={styles.paginationButton}>{prevLabel}</button>
      {renderPaginationList()}
      <button className={styles.paginationButton}>{nextLabel}</button>
    </div>
  );
};

export default Pagination;
