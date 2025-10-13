import { useState } from "react";
import { FaComments } from "react-icons/fa";
import "../src/styles/chatbot.css";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "🌙 Ciao, anima curiosa! Sono Aria 💫, l’assistente magica di Arcadia. Cosa desideri esplorare oggi?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // sta scrivendo
  const typingHints = [
    "🔮 Aria consulta le stelle...",
    "🌌 Aria ascolta l’eco dei tuoi desideri...",
    "💫 Aria sfoglia il grimorio dei giochi proibiti...",
    "🪄 Aria concentra la sua energia cosmica...",
  ];

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("http://localhost:3002/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      const data = await response.json();
      setIsTyping(false);

      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: data.reply },
        ]);
      } else {
        throw new Error("Nessuna risposta valida dal server");
      }
    } catch (error) {
      console.error("Errore nel chatbot:", error);
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "🌑 Gli astri sono confusi... Aria non riesce a rispondere ora. Riprova tra poco!",
        },
      ]);
    }
  };

  const currentHint =
    typingHints[Math.floor(Math.random() * typingHints.length)];

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button className="chatbot-toggle" onClick={() => setIsOpen(true)}>
          <FaComments />
        </button>
      )}

      {isOpen && (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h4>🔮 Aria - Guida Mistica di Arcadia</h4>
            <button className="close-btn" onClick={() => setIsOpen(false)}>
              ✖
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`chatbot-msg ${msg.role}`}>
                {msg.content}
              </div>
            ))}

            {isTyping && (
              <div className="chatbot-msg assistant typing">
                {currentHint}
                <span className="dots">
                  <span>.</span>
                  <span>.</span>
                  <span>.</span>
                </span>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <input
              type="text"
              placeholder="Invoca Aria con un messaggio..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>✨ Invia</button>
          </div>
        </div>
      )}
    </div>
  );
}
