/** @format */

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import { Link } from "react-router-dom";
import HeadPhone from "../assets/img/headphones.svg";
import "./css/Login.scss";

import React, { useState } from "react";

const Register = () => {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const registerHandler = async (values) => {
    try {
      setIsLoading(true);
      message.loading("Registering. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.post(
        "http://localhost:3000/users/register",
        {
          username: values.username,
          password: values.password,
          fullname: values.fullName,
          email: values.email,
        }
      );

      if (response) {
        message.destroy();
        setIsLoading(false);
        message.success("Registeration Successful !");
        setTimeout(() => {
          window.location.replace("/");
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
          Raja Ko Podcast
        </a>
      </div>
      <div className="main-row">
        <div className="main-row-img">
          <img className="head-phone-img" src={HeadPhone} alt="" />
        </div>
        <div className="main-row-text">
          <Form
            onFinish={registerHandler}
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
                Please Enter The Details !
              </h1>
            </div>
            <Form.Item
              name={"fullName"}
              label="Full Name"
              rules={[
                {
                  required: true,
                  message: "Field Cant Be Empty.",
                },
              ]}
            >
              <Input placeholder="Please enter Full Name" />
            </Form.Item>
            <Form.Item
              name={"username"}
              label="User Name"
              rules={[
                {
                  required: true,
                  message: "Field Cant Be Empty.",
                },
              ]}
            >
              <Input placeholder="Please enter User Name" />
            </Form.Item>
            <Form.Item
              name={"email"}
              label="Email"
              rules={[
                {
                  required: true,
                  message: "Field Cant Be Empty.",
                },
                {
                  type: "email",
                  message: "Please enter a valid email",
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
                Register
              </Button>
            </Form.Item>
            <div>
              {" "}
              Already have an account ? <Link to="/">Login!</Link>
            </div>
          </Form>
        </div>
      </div>
    </section>
  );
};

export default Register;
