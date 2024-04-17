import { Form, Col, Row, Input, TimePicker, Button } from 'antd';
import React from 'react';
import Layout from '../components/Layout';
import { useDispatch, useSelector } from "react-redux";
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

function ApplyDoctor() {

    const dispatch = useDispatch();
    const { user } = useSelector(state => state.user);
    const navigate = useNavigate();
    const onFinish = async (values) => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/apply-doctor-account', { ...values, userId: user._id } ,
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                navigate("/");
            } else {
                toast.error(response.data.message);
            }
        } catch (error) {
            dispatch(hideLoading());
            if (error.response) {
                toast.error(error.response.data.message);
            } else if (error.request) {
                toast.error("No response received from the server");
            } else {
                toast.error("Something went wrong");
            }
        }
    }

    return (
        <Layout>
            <h1 className='page-title'>Apply Doctor</h1>
            <hr />

            <Form layout='vertical' onFinish={onFinish}>
                <h1 className='card-title mt-3'>Personal Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='First Name' name='firstName' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Last Name' name='lastName' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Phone Number' name='phoneNumber' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Website' name='website' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Address' name='address' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                </Row>
                <hr />
                <h1 className='card-title mt-3'>Professional Information</h1>
                <Row gutter={20}>
                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Specialization' name='specialization' rules={[{ required: true }]}>
                            <Input />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Experience' name='experience' rules={[{ required: true }]}>
                            <Input type='number' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Fee Per Consultation' name='feePerConsultation' rules={[{ required: true }]}>
                            <Input type='number' />
                        </Form.Item>
                    </Col>

                    <Col span={8} xs={24} sm={24} lg={8}>
                        <Form.Item required label='Timings' name='timings' rules={[{ required: true }]}>
                            <TimePicker.RangePicker format="HH:mm" />
                        </Form.Item>
                    </Col>

                </Row>

                <div className="d-flex justify-content-end">
                    <Button className='primary-button' htmlType='submit'>
                        SUBMIT
                    </Button>
                </div>
            </Form>
        </Layout>
    )
}

export default ApplyDoctor;
