import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { useHistory } from 'react-router-dom';
import io from 'socket.io-client';

const socket = io('http://localhost:8000'); // Backend sunucusuna bağlanma

const Chat = () => {
  const [message, setMessage] = useState(''); // Kullanıcının girdiği mesaj
  const [messages, setMessages] = useState([]); // Alınan mesajlar
  const [username, setUsername] = useState(''); // Kullanıcı adı
  // const history = useHistory(); // Router geçmişini kullanarak yönlendirme yapmak için
  const navgate = useNavigate()
  
  const home = () => {
    navgate('/')
  }

  useEffect(() => {
    // Kullanıcı adı alınana kadar mesaj göndermesini engelle
    if (!username) return;

    // Socket üzerinden 'chat message' olayını dinle
    socket.on('chat message', (msg) => {
      // Yeni mesajları messages state'ine eklemek için
      setMessages((prevMessages) => [...prevMessages, msg]);
    });

    // Component unmount edildiğinde socket olayını kaldırma
    return () => {
      socket.off('chat message');
    };
  }, [username]);

  // Kullanıcı adı girişi
  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    if (username.trim()) {
      setUsername(username.trim());
    }
  };

  // Kullanıcının mesaj gönderme işlemi
  const sendMessage = () => {
    if (message.trim()) { // Boş mesaj gönderilmemeli
      socket.emit('chat message', { username, message }); // Server'a mesajı iletmek
      setMessage(''); // Inputu temizle
    }
  };

  return (
    <div className="chat-container">
      {!username ? (
        // Kullanıcı adı giriş formu
        <form onSubmit={handleUsernameSubmit} className="username-form">
          <h2>Kullanıcı Adı Girin</h2>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Kullanıcı Adı"
            required
          />
          <button type="submit">Giriş Yap</button>
        </form>
      ) : (
        // Chat arayüzü
        <div className="chat-room">
          <div className="messages">
            {/* Alınan mesajları gösterme */}
            {messages.map((msg, index) => (
              <div key={index} className="message">
                <strong>{msg.username}:</strong> {msg.message}
              </div>
            ))}
          </div>
          {/* Mesaj gönderme formu */}
          <form onSubmit={(e) => { e.preventDefault(); sendMessage(); }} className="message-form">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && sendMessage()} // Enter tuşuna basılınca gönder
              placeholder="Mesajınızı girin..."
              required
            />
            <button type="submit">Gönder</button>
          </form>
          {/* Ana sayfaya geri dönme butonu */}
          <button style={{color:'black'}} onClick={() => home('/')}>Ana Sayfa</button>
        </div>
      )}
    </div>
  );
};

export default Chat;
