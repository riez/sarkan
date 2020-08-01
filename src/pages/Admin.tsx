import { NextPage } from "next";
import { Container } from "react-bootstrap";

import { getRouter } from "../routes";
import { useList } from "../utils/hooks";

import Page from "../component/Page";
import DataTable from "../component/DataTable/DataTable";

const tableDataMap = [
  {
    key: "komoditas",
    name: "Komoditas",
  },
  {
    key: "area_provinsi",
    name: "Area Provinsi",
  },
  {
    key: "area_kota",
    name: "Area Kota",
  },
  {
    key: "size",
    name: "Size",
  },
  {
    key: "price",
    name: "Price",
  },
];

const tableProperties = {
  filter: [
    {
      key: "komoditas",
      name: "Komoditas",
      placeholder: "Filter by Title",
    },
    {
      key: "size",
      name: "Size",
      placeholder: "Filter by Size",
    },
    {
      key: "area_kota",
      name: "Area Kota",
      placeholder: "Filter by Area Kota",
    },
  ],
};

const AdminPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const query = getRouter()?.query || {};
  const { data, error } = useList(query);

  if (error){
    return renderErrorPage();
  }

  if (!data) {
    return renderLoadingPage();
  }

  return (
    <Page type="admin">
      <Container>
        <DataTable
          data={data.items}
          dataMap={tableDataMap}
          pageInfo={data?.pagination}
          properties={tableProperties}
          sortable
        />
      </Container>
    </Page>
  );
};

export default AdminPage;
