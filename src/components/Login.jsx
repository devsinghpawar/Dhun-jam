import React, { useState } from "react";
import styled from "styled-components";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  font-family: "Poppins", sans-serif;
  height: 94.5vh;
  padding: 20px;
  font-size: 16px;
  background-color: #030303;
`;
const H1 = styled.h1`
  color: #ffffff;
  font-size: 32px;
`;

const Input = styled.input`
  box-sizing: border-box;
  width: 600px;
  margin-bottom: 10px;
  padding: 10px;
  color: #ffffff;
  border: 1px solid #ffffff;
  border-radius: 10px;
  background-color: #030303;
  position: relative;

  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

const ShowHideToggle = styled.div`
  position: relative;
  top: -4%;
  left: 19%;
  transform: translateY(-50%);
  cursor: pointer;
  color: #ffffff;

  @media screen and (min-width: 320px) and (max-width: 767px) {
    position: relative;
    top: -5%;
    left: 19%;
  }
  @media screen and (min-width: 768px) and (max-width: 1024px) {
    position: relative;
    top: -4.5%;
    left: 25%;
  }
`;

const Button = styled.button`
  box-sizing: border-box;
  width: 600px;
  background-color: #6741d9;
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
  border: 1px solid #333;
  border-radius: 10px;

  &:hover {
    border: 1px solid #f0c3f1;
  }
  @media screen and (min-width: 320px) and (max-width: 768px) {
    width: 50%;
  }
`;

const P = styled.p`
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("DJ@4");
  const [password, setPassword] = useState("Dhunjam@2023");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.postLogin(username, password);
      const userId = response.data.id;
      console.log(response.data);
      console.log(response.data.id);
      navigate(`/admin/${userId}`);
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  const handlePasswordToggle = () => {
    setShowPassword(!showPassword);
  };

  return (
    <LoginContainer>
      <H1>Venue Admin Login</H1>
      <Input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <Input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <ShowHideToggle onClick={handlePasswordToggle}>
        {showPassword ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
      </ShowHideToggle>
      <Button onClick={handleLogin}>Sign in</Button>
      <P>New Registration ?</P>
    </LoginContainer>
  );
};

export default Login;
