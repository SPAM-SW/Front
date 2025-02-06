import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import "./Signup.css"; // CSS 추가

function Signup() {
  const { signup, login, loading } = useAuth(); // ✅ login 함수 추가 (회원가입 후 자동 로그인)
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    // ✅ 비밀번호 확인 로직 추가
    if (password !== passwordConfirm) {
      setError("비밀번호가 일치하지 않습니다.");
      return;
    }

    const success = await signup(name, email, password);
    if (success) {
      console.log("회원가입 성공! 자동 로그인 중...");
      const loginSuccess = await login(email, password);
      if (loginSuccess) {
        navigate('/mypage'); // 로그인 성공 시 마이페이지로 이동
      } else {
        setError("회원가입은 성공했지만, 로그인에 실패했습니다.");
      }
    } else {
      setError("회원가입에 실패했습니다.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <h2>회원가입</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label>이름:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <label>이메일:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div>
            <label>비밀번호 확인:</label>
            <input
              type="password"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              required
            />
          </div>
          {error && <p className="error-text">{error}</p>}
          <button type="submit" disabled={loading}>회원가입</button>
        </form>
        <p className="login-link">
          이미 계정이 있으신가요? <Link to="/login">로그인</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;
