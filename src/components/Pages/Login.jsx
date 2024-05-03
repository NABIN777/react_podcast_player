/** @format */

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import HeadPhone from "../assets/img/podtalk.png";
import "./css/Login.scss";

import React, { useState } from "react";

const Login = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const loginHandler = async (values) => {
    try {
      setIsLoading(true);
      message.loading("Logging in. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.post("http://localhost:3000/users/login", {
        username: values.email,
        password: values.password,
      });

      if (response) {
        message.destroy();
        setIsLoading(false);
        message.success("Login Successful !");
        localStorage.setItem("token", response?.data?.token);
        localStorage.setItem("username", values.email);
        setTimeout(() => {
          window.location.replace("/home");
        }, 2000);
        form.resetFields();
      } else {
        setIsLoading(false);
        message.destroy();
        message.error("Something went wrong");
      }
    } catch (error) {
      setIsLoading(false);
      message.destroy();
      message.error("Something went wrong");
      //   dispatch(HideLoading());
      console.log(error);
    }
  };

  return (
    <section id="main">
      <div className="nav-item">
        <a className="navbar-brand" href="/">
          PodTalk
        </a>
      </div>
      <div className="main-row">
        <div className="main-row-img">
          <img className="head-phone-img" src={HeadPhone} alt="" />
        </div>
        <div className="main-row-text">
          <Form
            onFinish={loginHandler}
            layout={"vertical"}
            form={form}
            className="login-form"
          >
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <h1 style={{ marginBottom: "9px", fontSize: "32px" }}>
                Login To Get Started !
              </h1>
            </div>
            <Form.Item
              name={"email"}
              label="Username"
              rules={[
                {
                  required: true,
                  message: "Field Cant Be Empty.",
                },
              ]}
            >
              <Input placeholder="Please enter email" />
            </Form.Item>
            <Form.Item
              name={"password"}
              rules={[
                {
                  required: true,
                  message: "Field Cant Be Empty.",
                },
              ]}
              label="Password"
            >
              <Input.Password placeholder="Please enter password" />
            </Form.Item>

            <Form.Item className="button">
              <Button
                loading={isLoading}
                type="primary"
                htmlType="submit"
                style={{ width: "100%" }}
              >
                Login
              </Button>
            </Form.Item>
            <div>
              {" "}
              Dont have an account ? <Link to="/register">Register now!</Link>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Login;
