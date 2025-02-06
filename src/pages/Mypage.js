// src/pages/MyPage.js
import React from 'react';
import { useAuth } from '../AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import "./Mypage.css";
function MyPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  if (!user) {
    return (
      <div className="mypage-container">
        <p>로그인이 필요합니다. <Link to="/login">로그인</Link></p>
      </div>
    );
  }

  return (
    <div className="mypage-container">
      <h2>마이페이지</h2>
      <p><strong>이름:</strong> {user.name}</p>
      <p><strong>이메일:</strong> {user.email}</p>
      <button onClick={() => { logout(); navigate('/'); }}>
        로그아웃
      </button>
    </div>
  );
}

export default MyPage;
