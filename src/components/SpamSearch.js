// src/components/SpamSearch.js
import React, { useState } from 'react';

function SpamSearch() {
  const [inputText, setInputText] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = () => {
    if (!inputText.trim()) return;
    setLoading(true);
    setError(null);

    fetch(`/api/spam-search?query=${encodeURIComponent(inputText)}`)
      .then(response => {
        if (!response.ok) {
          throw new Error('API 호출에 실패했습니다.');
        }
        return response.json();
      })
      .then(data => {
        setResults(data);
      })
      .catch(err => {
        console.error(err);
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="spam-search">
      <h2>피싱 의심 문자 검색</h2>
      {/* 텍스트 박스에 fixed-textarea 클래스 추가 */}
      <textarea
        className="fixed-textarea"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
        placeholder="이 박스에 의심되는 문자를 붙여넣기 해주세요"
      />
      <br />
      <button onClick={handleSearch}>검색</button>

      {loading && <p>검색 중...</p>}
      {error && <p className="error">{error}</p>}

      {results.length > 0 && (
        <div className="results">
          <h3>검색 결과</h3>
          <ul>
            {results.map((item) => (
              <li key={item.id} className="result-item">
                <p><strong>유사 문자:</strong> {item.similarText}</p>
                <p><strong>신고 날짜:</strong> {item.reportDate}</p>
                <p><strong>유형:</strong> {item.type}</p>
                <p><strong>위험도:</strong> {item.riskScore}%</p>
                {item.riskScore >= 80 && (
                  <button
                    className="report-button"
                    onClick={() => window.location.href = 'tel:112'}
                  >
                    경찰 신고하기
                  </button>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SpamSearch;
