/** @format */

import { Button, Form, Input, message } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";
import "../assets/scss/AddMusic.scss";

function AddMusic() {
  const [form] = Form.useForm();
  const [podcastImage, setPodcastImage] = useState("");
  const [podcastAudio, setPodcastAudio] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [activeImage, setActiveImage] = useState("");
  const location = useLocation();
  const state = location.state;
  console.log("state", state);

  const podcastImageChangeHandler = async (e) => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("albumPicture", e.target.files[0]);
      message.loading("Uploading a Image. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.post(
        "http://localhost:3000/upload/album",
        formData,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFhODU4NWQxZDg5MmE1MWZkMGZiMiIsInVzZXJuYW1lIjoibmlyYWphbiIsImlhdCI6MTY5MTMwOTk0NH0.bsZzT2kMYzgu3eliM4kHEJVsQyCk2EU1sIYYt11e8pI",
          },
        }
      );

      if (response) {
        message.destroy();
        setIsLoading(false);
        setPodcastImage(response.data?.data);
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
  const podcastAudioChangeHandler = async (e) => {
    console.log("this is running");
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("podcastAudio", e.target.files[0]);
      message.loading("Uploading a Audio. Please Wait...", {
        duration: 20000,
      });
      const response = await axios.post(
        "http://localhost:3000/upload/audio",
        formData,
        {
          headers: {
            authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFhODU4NWQxZDg5MmE1MWZkMGZiMiIsInVzZXJuYW1lIjoibmlyYWphbiIsImlhdCI6MTY5MTMwOTk0NH0.bsZzT2kMYzgu3eliM4kHEJVsQyCk2EU1sIYYt11e8pI",
          },
        }
      );

      if (response) {
        message.destroy();
        setIsLoading(false);

        setPodcastAudio(response.data?.data);
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

  const addPodcastHandler = async (values) => {
    try {
      setIsLoading(true);
      let response;
      if (state) {
        message.loading("Updating a Podcast. Please Wait...", {
          duration: 20000,
        });
        response = await axios.patch(
          `http://localhost:3000/podcasts/${state?._id}`,
          {
            title: values.title,
            description: values.description,
            author: values.author,
            audioUrl: state?.audioUrl,
            duration: values.duration,
            image: podcastImage,
            category: values.category,
          },
          {
            headers: {
              authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OGFhODU4NWQxZDg5MmE1MWZkMGZiMiIsInVzZXJuYW1lIjoibmlyYWphbiIsImlhdCI6MTY5MTMwOTk0NH0.bsZzT2kMYzgu3eliM4kHEJVsQyCk2EU1sIYYt11e8pI",
            },
          }
        );
      } else {
        message.loading("Adding a Podcast. Please Wait...", {
          duration: 20000,
        });
        response = await axios.post(
          "http://localhost:3000/podcasts",
          {
            title: values.title,
            description: values.description,
            author: values.author,
            audioUrl: podcastAudio,
            duration: values.duration,
            image: podcastImage,
            category: values.category,
          },
          {
            headers: {
              
              authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
      }

      if (response) {
        message.destroy();
        setIsLoading(false);
        message.success("Podcast Created Successfully");
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

  useEffect(() => {
    if (state) {
      form.setFields([
        {
          name: "title",
          value: state?.title,
        },
        {
          name: "description",
          value: state?.description,
        },
        {
          name: "author",
          value: state?.author,
        },
        {
          name: "duration",
          value: state?.duration,
        },
        {
          name: "category",
          value: state?.category,
        },
      ]);
      setActiveImage(state?.image);
      setPodcastImage(state?.image);
    }
  }, [state]);

  return (
    <div
      style={{
        margin: "auto",
        display: "flex",
        justifyContent: "center",
        padding: "20px",
      }}
    >
      <Form
        onFinish={addPodcastHandler}
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
          <h1>Share Your Podcast with the World!</h1>
          <p>Let Your Voice Be Heard on Our Podcast Platform</p>
        </div>
        <Form.Item
          name={"title"}
          label="Podcast Title"
          rules={[
            {
              required: true,
              message: "Field Cant Be Empty.",
            },
          ]}
        >
          <Input placeholder="Podcast Title" />
        </Form.Item>
        <Form.Item
          name={"description"}
          rules={[
            {
              required: true,
              message: "Field Cant Be Empty.",
            },
          ]}
          label="Podcast Description"
        >
          <Input placeholder="Podcast Description" />
        </Form.Item>
        <Form.Item
          name={"author"}
          rules={[
            {
              required: true,
              message: "Field Cant Be Empty.",
            },
          ]}
          label="Author"
        >
          <Input placeholder="Author" />
        </Form.Item>

        <Form.Item
          name={"duration"}
          rules={[
            {
              required: true,
              message: "Field Cant Be Empty.",
            },
          ]}
          label="Duration"
        >
          <Input placeholder="Duration" />
        </Form.Item>

        <Form.Item
          name={"category"}
          rules={[
            {
              required: true,
              message: "Field Cant Be Empty.",
            },
          ]}
          label="Category"
        >
          <Input placeholder="Category" />
        </Form.Item>
        <Form.Item
          name={"Podcast Image"}
          rules={[
            {
              required: state ? false : true,
              message: "Field Cant Be Empty.",
            },
          ]}
          label="Image"
        >
          <Input
            type="file"
            onChange={(e) => {
              podcastImageChangeHandler(e);
            }}
          />
          {/* {activeImage && (
            <img src={`http://localhost:3000/albumPictures/${activeImage}`} />
          )} */}
        </Form.Item>
        <Form.Item
          name={"Podcast Audio"}
          rules={[
            {
              required: state ? false : true,
              message: "Field Cant Be Empty.",
            },
          ]}
          label="Audio"
        >
          <Input
            disabled={state ? true : false}
            type="file"
            onChange={(e) => {
              podcastAudioChangeHandler(e);
            }}
          />
        </Form.Item>

        <Form.Item className="button">
          <Button loading={isLoading} type="primary" htmlType="submit">
            {state ? "Update A podcast" : "Add a Podcast"}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

export default AddMusic;
