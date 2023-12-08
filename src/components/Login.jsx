import React, { useState } from "react";
import styled from "styled-components";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  /* font-family: Poppins; */
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
`;

const P = styled.p`
  color: #ffffff;
  padding: 10px 20px;
  cursor: pointer;
`;

const Login = () => {
  const [username, setUsername] = useState("DJ@4");
  const [password, setPassword] = useState("Dhunjam@2023");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await api.postLogin(username, password);
      console.log(response.data);
      navigate("/admin");
    } catch (error) {
      console.error("Login failed", error);
    }
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
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Button onClick={handleLogin}>Sign in</Button>
      <P>New Registration ?</P>
    </LoginContainer>
  );
};

export default Login;
