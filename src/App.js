import React, { useState } from 'react';
import './App.css';

function App() {
  const [password, setPassword] = useState('');
  const [includeUpperCase, setIncludeUpperCase] = useState(false);
  const [includeLowerCase, setIncludeLowerCase] = useState(false);
  const [includeNumbers, setIncludeNumbers] = useState(false);
  const [passwordLength, setPasswordLength] = useState(5);
  const [errorMessage, setErrorMessage] = useState('');

  const handleGeneratePassword = () => {
    if (passwordLength < 5 || passwordLength > 10) {
      setErrorMessage('비밀번호 길이는 5자 이상 10자 이하여야 합니다.');
      return;
    }

    let characters = '';
    if (includeUpperCase) characters += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowerCase) characters += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) characters += '0123456789';

    if (characters === '') {
      setErrorMessage('"최소 하나 이상의 문자 종류를 선택해주세요."');
      return;
    }

    let generatedPassword = '';
    for (let i = 0; i < passwordLength; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      generatedPassword += characters[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const handleCopyPassword = () => {
    navigator.clipboard.writeText(password);
    alert('비밀번호가 복사되었습니다.');
  };

  return (
    <div className="App">
      <h1>비밀번호 메이커</h1>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <div className="password-box">
        {password ? (
          <p>생성된 비밀번호: {password}</p>
        ) : (
          <p>비밀번호가 아직 생성되지 않았습니다.</p>
        )}
      </div>
      <label>
        대문자 포함:
        <input type="checkbox" checked={includeUpperCase} onChange={() => setIncludeUpperCase(!includeUpperCase)} />
      </label>
      <br />
      <label>
        소문자 포함:
        <input type="checkbox" checked={includeLowerCase} onChange={() => setIncludeLowerCase(!includeLowerCase)} />
      </label>
      <br />
      <label>
        숫자 포함:
        <input type="checkbox" checked={includeNumbers} onChange={() => setIncludeNumbers(!includeNumbers)} />
      </label>
      <br />
      <label>
        비밀번호 길이:
        <input
          type="number"
          value={passwordLength}
          onChange={(e) => setPasswordLength(parseInt(e.target.value))}
        />
      </label>
      <br />
      <div className="guidelines">
        <div id = "title">
        <img src="/images/warning.png" alt="Warning Icon"></img>
        <p>비밀번호의 길이는 최소 5자리 ~ 최대 10자리여야 합니다.</p>
        <p>최소 하나 이상의 문자 종류를 선택해야 합니다.</p>
        </div>
      </div>
      <button onClick={handleGeneratePassword}>비밀번호 생성</button>
      {password && <button onClick={handleCopyPassword}>비밀번호 복사</button>}
    </div>
  );
}

export default App;
