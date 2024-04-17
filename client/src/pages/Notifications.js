import React from 'react';
import Layout from '../components/Layout';
import { Tabs } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from '../redux/alertsSlice';
import { setUser } from '../redux/userSlice';
import axios from 'axios';
import toast from 'react-hot-toast';

function Notifications() {
    const { user } = useSelector((state) => state.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const markAllAsSeen = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/mark-all-notifications-as-seen', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
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

    const deleteAll = async () => {
        try {
            dispatch(showLoading());
            const response = await axios.post('/api/user/delete-all-notifications', { userId: user._id }, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(hideLoading());
            if (response.data.success) {
                toast.success(response.data.message);
                dispatch(setUser(response.data.data));
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

    if (!user || !user.unseenNotifications) {
        return null;
    }

    return (
        <Layout>
            <h1 className='page-title'>Notifications</h1>

            <Tabs>
                <Tabs.TabPane tab='Unseen' key={1}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor' onClick={() => markAllAsSeen()}>Mark all as seen</h1>
                    </div>

                    {user?.unseenNotifications.map((notification, index) => (
                        <div key={index} className='card p-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}

                </Tabs.TabPane>
                <Tabs.TabPane tab='Seen' key={2}>
                    <div className='d-flex justify-content-end'>
                        <h1 className='anchor' onClick={() => deleteAll()}>Delete all</h1>
                    </div>
                    {user?.seenNotifications.map((notification, index) => (
                        <div key={index} className='card p-2' onClick={() => navigate(notification.onClickPath)}>
                            <div className="card-text">{notification.message}</div>
                        </div>
                    ))}
                </Tabs.TabPane>
            </Tabs>
        </Layout>
    );
}

export default Notifications;
