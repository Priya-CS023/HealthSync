import React, { useEffect, useState } from "react";
import { DatePicker, TimePicker, Row, Col, Button } from "antd";
import Layout from "../components/Layout";
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from "../redux/alertsSlice";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import moment from "moment";

function BookAppointment() {
  const [isAvailable, setIsAvailable] = useState(false);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const { doctorId } = useParams();
  const [doctor, setDoctor] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const getDoctorData = async () => {
      try {
        dispatch(showLoading());
        const token = localStorage.getItem("token");

        if (!token) {
          console.error("Token not found in local storage");
          return;
        }

        const response = await axios.post(
          "/api/doctor/get-doctor-info-by-id",
          {
            doctorId: doctorId,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        dispatch(hideLoading());
        if (response.data.success) {
          setDoctor(response.data.data);
        }
      } catch (error) {
        dispatch(hideLoading());
      }
    };

    if (doctorId) {
      getDoctorData();
    }
  }, [dispatch, doctorId]);

  const checkAvailability = () => {};

  const bookNow = async () => {
    try {
      dispatch(showLoading());
      const token = localStorage.getItem("token");

      if (!token) {
        console.error("Token not found in local storage");
        return;
      }

      const response = await axios.post(
        "/api/user/book-appointment",
        {
          doctorId: doctorId,
          userId: user?._id,
          doctorInfo: doctor,
          userInfo: user,
          date: date,
          time: time,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch(hideLoading());
      if (response.data.success) {
        toast.success(response.data.message);
      }
    } catch (error) {
      toast.error("Error booking appointment");
      dispatch(hideLoading());
    }
  };

  return (
    <Layout>
      {doctor && (
        <div>
          <h1 className="page-title">
            {doctor.firstName} {doctor.lastName}
          </h1>
          <hr />
          <Row>
            <Col span={8} sm={24} xs={24} lg={8}>
              <h1 className="normal-text">
                <b>Timings : </b>
                {doctor.timings[0]} - {doctor.timings[1]}
              </h1>
              <div className="d-flex flex-column pt-2">
                <DatePicker
                  format="DD-MM-YYYY"
                  onChange={(value) =>
                    setDate(moment(value).format("DD-MM-YYYY"))
                  }
                />
                <TimePicker
                  format="HH:mm"
                  className="mt-3"
                  onChange={(value) => {
                    setTime(moment(value).format("HH:mm"));
                  }}
                />
                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={checkAvailability}
                >
                  Check Availability
                </Button>
                <Button
                  className="primary-button mt-3 full-width-button"
                  onClick={bookNow}
                >
                  Book Now
                </Button>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
}

export default BookAppointment;
