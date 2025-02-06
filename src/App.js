import { BrowserRouter as Router, Routes, Route, Link, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/Mypage';
import { AuthProvider } from './AuthContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <NavBar />
        <MainContent />
      </Router>
    </AuthProvider>
  );
}

function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/">홈</Link> |{' '}
      <Link to="/login">로그인</Link> |{' '}
      <Link to="/signup">회원가입</Link> |{' '}
      <Link to="/mypage">마이페이지</Link>
    </nav>
  );
}

function MainContent() {
  const location = useLocation(); // 현재 경로 확인

  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/mypage" element={<MyPage />} />
      </Routes>

      {/* ✅ 로그인, 회원가입, 마이페이지에서는 하단 링크 숨기기 */}
      {!["/signup", "/login", "/mypage"].includes(location.pathname) && (
        <div className="rightSide">
          <a href="https://www.police.go.kr" target="_blank" rel="noopener noreferrer">
            경찰청 사이트 바로가기 +
          </a>
          <a href="https://www.fsc.go.kr" target="_blank" rel="noopener noreferrer">
            금융위원회 바로가기 +
          </a>
          <a href="https://www.youtube.com/results?search_query=피싱+예방"
             target="_blank" rel="noopener noreferrer">
            피싱 피해를 예방하기 위한 유튜브 바로가기 +
          </a>
        </div>
      )}
    </div>
  );
}

export default App;
