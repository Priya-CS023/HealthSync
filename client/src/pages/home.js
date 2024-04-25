import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { Col, Row } from "antd";
import Layout from "../components/Layout";
import Doctor from "../components/Doctor";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { Link } from "react-router-dom";

function Home() {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const getData = async () => {
      try {
        const token = localStorage.getItem("token");
        console.log("Token:", token);

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }
        dispatch(showLoading());
        const response = await axios.get("/api/user/get-all-approved-doctors", {
          headers: {
            Authorization: "Bearer " + token,
          },
        });
        dispatch(hideLoading());
        if (response.data.success) {
          setDoctors(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    getData();
  }, []);

  return (
    <Layout>
      <Row gutter={20}>
        {doctors.map((doctor) => (
          <Col span={8} xs={24} sm={24} lg={8} key={doctor._id}>
            <Link
              to={`/book-appointment/${doctor._id}`}
              className="link-no-underline"
            >
              <Doctor doctor={doctor} />
            </Link>
          </Col>
        ))}
      </Row>
    </Layout>
  );
}

export default Home;
