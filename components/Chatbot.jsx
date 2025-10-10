import { useState, useEffect, useRef } from "react";
import { FaComments } from "react-icons/fa";
import "../src/styles/chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Ciao! Sono Aria, l’assistente di Arcadia 💫. Come posso aiutarti oggi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔽 Riferimento per lo scroll automatico
  const messagesEndRef = useRef(null);

  useEffect(() => {
    // Ogni volta che cambiano i messaggi, scrolla in fondo
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // ✉️ Invio messaggio al server chatbot
  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3002/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Errore nel chatbot server");

      const data = await response.json();
      const aiMessage = data.choices[0].message;
      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Errore:", error);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "Ops 😅 non riesco a rispondere in questo momento. Riprova più tardi!",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="chatbot-container">
      {/* Bottone fluttuante */}
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FaComments />
        </button>
      )}

      {/* 🪟 Finestra della chat */}
      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>Aria - Assistenza Arcadia</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          {/* Messaggi */}
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}
            {loading && (
              <div className="chatbot-msg assistant">Sto scrivendo...</div>
            )}
            <div ref={messagesEndRef} /> {/* Scroll automatico */}
          </div>

          {/* Input + invio */}
          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Scrivi un messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendMessage();
                }
              }}
            />
            <button onClick={sendMessage}>Invia</button>
          </div>
        </div>
      )}
    </div>
  );
}
