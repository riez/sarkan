import styles from "../../styles/AddPage.scss";
import cls from "classnames";
import dynamic from "next/dynamic";
import { NextPage } from "next";
import { v4 as uuidv4 } from "uuid";
import { useCallback, useState } from "react";
import { Container, Row, Toast } from "react-bootstrap";

import { useProvince, useCity, mutateList } from "../utils/hooks";
import Page from "../component/Page";
import { Router } from "../routes";

const JsonToForm = dynamic(() => import("json-reactform"), {
  ssr: false,
});

const AddPage: NextPage<PageProps> = ({
  renderLoadingPage,
  renderErrorPage,
}) => {
  const { data: dataProvince, error: errorProvince } = useProvince();
  const { data: dataCity, error: errorCity } = useCity();
  const [showToast, setShowToast] = useState(false);
  const [toast, setToast] = useState({
    status: "",
    description: "",
  });

  const provinceOptions =
    dataProvince?.map((item) => ({
      value: item.province,
      label: item.province,
    })) || [];
  const cityOptions =
    dataCity?.map((item) => ({ value: item.city, label: item.city })) || [];

  const model = {
    Komoditas: {
      type: "text",
      required: true,
      placeholder: "Komoditas",
      defaultValue: "Komoditas",
    },
    "Area Provinsi": {
      type: "select",
      required: true,
      placeholder: "Pilih item",
      defaultValue: "2",
      options: provinceOptions,
    },
    "Area Kota": {
      type: "select",
      required: true,
      placeholder: "Pilih item",
      defaultValue: "2",
      options: cityOptions,
    },
    Size: {
      type: "number",
      required: true,
      placeholder: "Jumlah",
      defaultValue: "10",
    },
    Harga: {
      type: "currency",
      required: true,
      placeholder: "Harga anu",
      defaultValue: "50000",
    },
    Save: {
      type: "submit",
    },
  };

  const handleSubmit = useCallback(async (data) => {
    try {
      const today = Date.now();
      const payloads = {
        uuid: uuidv4(),
        komoditas: data["Komoditas"],
        area_provinsi: data["Area Provinsi"].value,
        area_kota: data["Area Kota"].value,
        size: data["Size"],
        price: data["Harga"],
        tgl_parsed: new Date(today).toISOString(),
        timestamp: today.toString(),
      };
      const response = await mutateList(payloads);
      if (response) {
        setShowToast(true);
        setToast({
          status: "Success",
          description: "New data has been added.",
        });
      }
    } catch (error) {
      setShowToast(true);
      setToast({
        status: "Failed",
        description: "Could not add new data.",
      });
    }
  }, []);

  const handleToast = useCallback(() => {
    setShowToast(false);
    Router.replaceRoute("/admin");
  }, [])

  if (errorCity || errorProvince) {
    return renderErrorPage();
  }

  if (!dataCity || !dataProvince) {
    return renderLoadingPage();
  }

  return (
    <Page type="admin">
      <Container>
      <Toast
        onClose={handleToast}
        show={showToast}
        delay={3000}
        autohide
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
        }}
      >
        <Toast.Header>
          <strong className="mr-auto">{toast.status}</strong>
          <small>just now</small>
        </Toast.Header>
        <Toast.Body>{toast.description}</Toast.Body>
      </Toast>
        <div className={styles.segment}>
          <Row className={cls(styles.segmentTitle, styles.row)}>
            <strong>New</strong>&nbsp;Data List
          </Row>
          <Container>
            {/* @ts-ignore */}
            <JsonToForm model={model} onSubmit={handleSubmit} />
          </Container>
        </div>
      </Container>
      
    </Page>
  );
};

export default AddPage;
