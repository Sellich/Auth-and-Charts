import React, { useState } from 'react';
import './Login.css';
import { gql, useMutation } from "@apollo/client";
import { useNavigate } from 'react-router-dom';

const LOGIN_MUTATION = gql`
  mutation Login($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      username
      token
    }
  }
`;

const Login = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation, { error }] = useMutation(LOGIN_MUTATION);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await loginMutation({
        variables: { username: login, password: password },
      });

      localStorage.setItem('authToken', response.data.login.token);

      navigate('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div className="login-container">
      <h1 className='login-title'>Здравствуйте, меня зовут Артем!</h1>
      <p className='login-description'>Я очень старался выполняя это тестовое задание, оно было очень интересным и очень многое для себя узнал и уже из-за этого говорю вам - Спасибо!</p>
      {error && <p className="error-message">Ошибка при входе. Пожалуйста, проверьте логин и пароль и попробуйте снова.</p>}
      <form className='login-form' onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            className='login-input'
            type="text"
            placeholder="Логин"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
        </div>
        <div className="input-group">
          <input
            className='login-input'
            type="password"
            placeholder="Пароль"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button className='login-submit' type="submit">Войти</button>
      </form>
    </div>
  );
};

export default Login;
