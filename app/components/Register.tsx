"use client";

import { Button, Label, TextInput } from "flowbite-react";
import React, { useState } from "react";

type User = {
  email: string;
  image: string;
};

const Register = ({ email, image }: User) => {
  const [formData, setFormData] = useState({
    userName: "",
    userEmail: email,
    userImage: image,
  });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formSuccessMessage, setFormSuccessMessage] = useState("");

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = e.target.name;
    const fieldValue = e.target.value;

    setFormData((prevState) => ({
      ...prevState,
      [fieldName]: fieldValue,
    }));
  };

  const submitForm = () => {
    const url = "http://localhost:8080/api/users";
    fetch(url, {
      method: "POST",
      mode: "cors",
      body: JSON.stringify(formData),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setFormData({
          userName: "",
          userEmail: "",
          userImage: "",
        });
        setFormSuccess(true);
        setFormSuccessMessage(data.submission_text);
      });
  };

  return (
    <div>
      <form
        className="flex flex-col gap-4"
        method="POST"
        action="/register/success"
        onSubmit={submitForm}
      >
        <div>
          <div className="mb-2 block">
            <Label value="Your username" />
          </div>
          <TextInput
            type="text"
            name="userName"
            onChange={handleInput}
            value={formData.userName}
            required={true}
            shadow={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Your email" />
          </div>
          <TextInput
            type="text"
            name="userEmail"
            value={email}
            disabled={true}
            readOnly={true}
          />
        </div>
        <div>
          <div className="mb-2 block">
            <Label value="Your image URL" />
          </div>
          <TextInput
            type="text"
            name="userImage"
            value={image}
            disabled={true}
            readOnly={true}
          />
        </div>
        <Button type="submit">Become a member</Button>
      </form>
    </div>
  );
};

export default Register;
