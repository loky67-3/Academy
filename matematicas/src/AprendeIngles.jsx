import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';

// --- SENSEI ENGLISH (LINGUA-BOT SVG) ---
const SenseiEnglish = ({ expression = 'happy', size = 140 }) => {
  const purple = "#a855f7";
  return (
    <svg width={size} height={size} viewBox="0 0 200 200" style={{ filter: `drop-shadow(0 0 15px ${purple})` }}>
      <rect x="40" y="40" width="120" height="100" rx="30" fill="rgba(15, 23, 42, 0.9)" stroke={purple} strokeWidth="6" />
      <path d="M60 140 L40 180 M140 140 L160 180" stroke={purple} strokeWidth="10" strokeLinecap="round" />
      <circle cx="80" cy="80" r="10" fill="white" />
      <circle cx="120" cy="80" r="10" fill="white" />
      {expression === 'happy' ? (
        <path d="M80 115 Q 100 135 120 115" stroke="white" strokeWidth="5" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M85 120 L115 120" stroke="#94a3b8" strokeWidth="5" strokeLinecap="round" />
      )}
      <path d="M160 60 L180 40 M160 80 L180 100" stroke={purple} strokeWidth="4" />
      <text x="100" y="30" fill={purple} fontSize="18" fontWeight="900" textAnchor="middle" style={{ letterSpacing: '2px' }}>ENGLISH-BOT</text>
      {/* Birrete */}
      <path d="M30 40 L100 10 L170 40 L100 70 Z" fill="#1e293b" opacity="0.8" />
    </svg>
  );
};

// --- MONOS PARLANTES (CONVERSATION BOTS) ---
const ConversationMonkey = ({ color, expression = 'happy', label, isTalking }) => (
  <div style={{ textAlign: 'center', transition: '0.3s', transform: isTalking ? 'scale(1.1)' : 'scale(1)' }}>
    <svg width="120" height="120" viewBox="0 0 200 200" style={{ filter: isTalking ? `drop-shadow(0 0 20px ${color})` : 'none' }}>
      <circle cx="100" cy="100" r="80" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="5" />
      <path d="M60 70 Q 100 50 140 70" fill="none" stroke={color} strokeWidth="3" />
      {/* Orejas */}
      <circle cx="30" cy="100" r="20" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="3" />
      <circle cx="170" cy="100" r="20" fill="rgba(15, 23, 42, 0.9)" stroke={color} strokeWidth="3" />
      {/* Ojos */}
      <circle cx="75" cy="90" r="8" fill="white" />
      <circle cx="125" cy="90" r="8" fill="white" />
      {/* Boca animada si habla */}
      {isTalking ? (
        <ellipse cx="100" cy="130" rx="15" ry="10" fill="white" />
      ) : expression === 'happy' ? (
        <path d="M75 130 Q 100 150 125 130" stroke="white" strokeWidth="4" fill="none" strokeLinecap="round" />
      ) : (
        <path d="M80 135 L120 135" stroke="#94a3b8" strokeWidth="4" />
      )}
      <text x="100" y="185" fill={color} fontSize="14" fontWeight="bold" textAnchor="middle">{label}</text>
    </svg>
  </div>
);

const CONVERSATION_PHRASES = [
  // --- GREETINGS & BASICS ---
  { en: "How are you today?", es: "¿Cómo estás hoy?" },
  { en: "How has it been going?", es: "¿Cómo te ha ido?" },
  { en: "I love learning new things!", es: "Me encanta aprender cosas nuevas." },
  { en: "English is very important for your future.", es: "El inglés es muy importante para tu futuro." },
  { en: "Nice to meet you, my friend.", es: "Mucho gusto en conocerte, amigo mío." },
  { en: "What is your favorite color?", es: "¿Cuál es tu color favorito?" },
  { en: "The weather is beautiful today.", es: "El clima está hermoso hoy." },
  { en: "Don't forget to practice every day.", es: "No olvides practicar todos los días." },
  { en: "Good morning, everyone!", es: "¡Buenos días a todos!" },
  { en: "What's for breakfast?", es: "¿Qué hay de desayuno?" },
  { en: "I need to drink more water.", es: "Necesito beber más agua." },
  { en: "Where is the nearest supermarket?", es: "¿Dónde está el supermercado más cercano?" },
  { en: "Can you help me with this?", es: "¿Me puedes ayudar con esto?" },
  { en: "I'm going to the gym.", es: "Voy al gimnasio." },
  { en: "What are your plans for the weekend?", es: "¿Cuáles son tus planes para el fin de semana?" },
  { en: "I'm very proud of you.", es: "Estoy muy orgulloso de ti." },
  { en: "Everything will be fine.", es: "Todo va a estar bien." },
  { en: "Don't give up!", es: "No te rindas." },
  { en: "I'll be there in five minutes.", es: "Estaré allí en cinco minutos." },
  { en: "Have a safe trip!", es: "Ten un viaje seguro." },
  { en: "Can I have the bill, please?", es: "¿Me trae la cuenta, por favor?" },
  { en: "This is very expensive.", es: "Esto es muy caro." },
  { en: "It's a bargain!", es: "Es una ganga." },
  { en: "I'm just looking, thanks.", es: "Solo estoy mirando, gracias." },
  { en: "Do you have this in a smaller size?", es: "¿Tiene esto en una talla más pequeña?" },
  { en: "I'll take it.", es: "Me lo llevo." },
  { en: "I lost my phone.", es: "Perdí mi teléfono." },
  { en: "Could you tell me the time?", es: "¿Podría decirme la hora?" },
  { en: "I'm looking for a job.", es: "Estoy buscando trabajo." },
  { en: "What do you do for a living?", es: "¿A qué te dedicas?" },
  { en: "I work from home.", es: "Trabajo desde casa." },
  { en: "The traffic is terrible today.", es: "El tráfico está terrible hoy." },
  { en: "I missed the bus.", es: "Perdí el autobús." },
  { en: "Let's go out tonight.", es: "Salgamos esta noche." },
  { en: "Would you like to dance?", es: "¿Te gustaría bailar?" },
  { en: "I'm having a great time.", es: "Me lo estoy pasando genial." },
  { en: "Thank you for the invitation.", es: "Gracias por la invitación." },
  { en: "Happy anniversary!", es: "¡Feliz aniversario!" },
  { en: "Congratulations on your graduation!", es: "¡Felicidades por tu graduación!" },
  { en: "I feel sick today.", es: "Me siento mal hoy." },
  { en: "I have a headache.", es: "Tengo dolor de cabeza." },
  { en: "Call an ambulance!", es: "¡Llama a una ambulancia!" },
  { en: "I need to see a doctor.", es: "Necesito ver a un médico." },
  { en: "Are you okay?", es: "¿Estás bien?" },
  { en: "Calm down, please.", es: "Cálmate, por favor." },
  { en: "It was an accident.", es: "Fue un accidente." },
  { en: "Forgive me.", es: "Perdóname." },
  { en: "I didn't mean to hurt you.", es: "No quise lastimarte." },
  { en: "Let's be friends.", es: "Seamos amigos." },
  { en: "I miss you so much.", es: "Te extraño mucho." },
  { en: "I love you.", es: "Te amo." },
  { en: "You look beautiful tonight.", es: "Te ves hermosa esta noche." },
  { en: "What a surprise!", es: "¡Qué sorpresa!" },
  { en: "That's unbelievable.", es: "Eso es increíble." },
  { en: "I'm so excited!", es: "Estoy muy emocionado." },
  { en: "I'm bored.", es: "Estoy aburrido." },
  { en: "Stop talking, please.", es: "Deja de hablar, por favor." },
  { en: "Listen to me.", es: "Escúchame." },
  { en: "Look at that!", es: "¡Mira eso!" },
  { en: "Be careful!", es: "¡Ten cuidado!" },
  { en: "Don't touch that.", es: "No toques eso." },
  { en: "It's dangerous.", es: "Es peligroso." },
  { en: "Wait for me.", es: "Espérame." },
  { en: "Hurry up!", es: "¡Date prisa!" },
  { en: "Slow down.", es: "Ve más despacio." },
  { en: "Turn left at the corner.", es: "Gira a la izquierda en la esquina." },
  { en: "Go straight ahead.", es: "Sigue recto." },
  { en: "It's on the right side.", es: "Está al lado derecho." },
  { en: "I'm searching for the truth.", es: "Estoy buscando la verdad." },
  { en: "Believe in yourself.", es: "Cree en ti mismo." },
  { en: "Dream big.", es: "Sueña en grande." },
  { en: "Time flies.", es: "El tiempo vuela." },
  { en: "Money isn't everything.", es: "El dinero no lo es todo." },
  { en: "Health is wealth.", es: "La salud es riqueza." },
  { en: "Keep it simple.", es: "Mantenlo simple." },
  { en: "Never say never.", es: "Nunca digas nunca." },
  { en: "Life is short.", es: "La vida es corta." },
  { en: "Make it happen.", es: "Haz que suceda." },
  { en: "Stay positive.", es: "Mantente positivo." },
  { en: "You can do it!", es: "Tú puedes hacerlo." },
  { en: "What's the matter?", es: "¿Qué pasa?" },
  { en: "It doesn't matter.", es: "No importa." },
  { en: "I don't care.", es: "No me importa." },
  { en: "That's funny.", es: "Eso es gracioso." },
  { en: "I'm kidding.", es: "Estoy bromeando." },
  { en: "No way!", es: "¡De ninguna manera!" },
  { en: "I agree with you.", es: "Estoy de acuerdo contigo." },
  { en: "I don't think so.", es: "No lo creo." },
  { en: "It's up to you.", es: "Depende de ti." },
  { en: "Maybe another time.", es: "Tal vez en otra ocasión." },
  { en: "I have no idea.", es: "No tengo ni idea." },
  { en: "Let me check.", es: "Déjame revisar." },
  { en: "Give me a hand.", es: "Dame una mano." },
  { en: "Pass me the salt.", es: "Pásame la sal." },
  { en: "Close the door, please.", es: "Cierra la puerta, por favor." },
  { en: "Open the window.", es: "Abre la ventana." },
  { en: "Turn off the lights.", es: "Apaga las luces." },
  { en: "I'm ready to learn.", es: "Estoy listo para aprender." },
  { en: "Success is near.", es: "El éxito está cerca." },
  { en: "Focus on your goals.", es: "Enfócate en tus metas." },
  { en: "Never stop learning.", es: "Nunca dejes de aprender." },
  { en: "I am a programmer.", es: "Soy programador." },
  { en: "Coding is fun!", es: "Programar es divertido." },
  { en: "Debugging is hard.", es: "Depurar es difícil." },
  { en: "The internet is down.", es: "El internet se cayó." },
  { en: "Check your email.", es: "Revisa tu correo." },
  { en: "Send me the link.", es: "Envíame el enlace." },
  { en: "Charge your battery.", es: "Carga tu batería." },
  { en: "Take a deep breath.", es: "Respira profundo." },
  { en: "Smile more.", es: "Sonríe más." },
  { en: "Be kind to others.", es: "Sé amable con los demás." },
  { en: "Listen to your heart.", es: "Escucha a tu corazón." },
  { en: "You are the best.", es: "Eres el mejor." },
  { en: "Enjoy the little things.", es: "Disfruta las pequeñas cosas." },
  { en: "Nature is beautiful.", es: "La naturaleza es hermosa." },
  { en: "The ocean is vast.", es: "El océano es vasto." },
  { en: "The stars are bright.", es: "Las estrellas son brillantes." },
  { en: "It's raining cats and dogs.", es: "Está lloviendo a cántaros." },
  { en: "I'm over the moon.", es: "Estoy muy feliz." },
  { en: "Piece of cake!", es: "Pan comido." },
  { en: "Under the weather.", es: "Sentirse mal / Un poco enfermo." },
  { en: "Break a leg!", es: "¡Buena suerte! (en el escenario)" },
  { en: "Better late than never.", es: "Más vale tarde que nunca." },
  { en: "No pain, no gain.", es: "Sin dolor no hay ganancia." },
  { en: "So far so good.", es: "Hasta ahora todo bien." },
  { en: "Call it a day.", es: "Dar algo por terminado por hoy." },
  { en: "Get out of hand.", es: "Salir de control." },
  { en: "Hang in there.", es: "No te rindas / Resiste." },
  { en: "Miss the boat.", es: "Perder la oportunidad." },
  { en: "Once in a blue moon.", es: "Casi nunca." },
  { en: "The best of both worlds.", es: "Lo mejor de ambos mundos." },
  { en: "Work in progress.", es: "Trabajo en progreso." },
  { en: "See eye to eye.", es: "Estar de acuerdo." },
  { en: "Speak of the devil.", es: "Hablando del rey de Roma." },
  { en: "The ball is in your court.", es: "La pelota está en tu tejado." },
  { en: "Think outside the box.", es: "Pensar de forma creativa." },
  { en: "Break the ice.", es: "Romper el hielo." },
  { en: "Add fuel to the fire.", es: "Echar leña al fuego." },
  { en: "Burn the midnight oil.", es: "Trabajar hasta tarde." },
  { en: "Easy does it.", es: "Con cuidado / Despacio." },
  { en: "Last straw.", es: "La gota que colmó el vaso." },
  { en: "Your secret is safe with me.", es: "Tu secreto está a salvo conmigo." },
  { en: "I'm all ears.", es: "Soy todo oídos." },
  { en: "Keep your fingers crossed.", es: "Cruza los dedos." },
  { en: "Make yourself at home.", es: "Siéntete como en casa." },
  { en: "Sleep on it.", es: "Consultarlo con la almohada." },
  { en: "Tell me about it!", es: "¡Dímelo a mí!" },
  { en: "What's the catch?", es: "¿Cuál es el truco?" },
  { en: "I'm on my way.", es: "Estoy en camino." },
  { en: "Keep in touch.", es: "Mantente en contacto." },
  { en: "Long story short.", es: "Para no hacerte el cuento largo." },
  { en: "Nice try!", es: "Buen intento." },
  { en: "See you around.", es: "Nos vemos." },
  { en: "Take your time.", es: "Tómate tu tiempo." },
  { en: "That's a good one!", es: "¡Esa es buena!" },
  { en: "Wait a second.", es: "Espera un segundo." },
  { en: "Who knows?", es: "¿Quién sabe?" },
  { en: "Wish me luck!", es: "Deséame suerte." },
  { en: "You nailed it!", es: "¡Lo clavaste! / ¡Lo lograste!" },
  { en: "You're joking!", es: "¡Estás bromeando!" },
  { en: "Don't bother.", es: "No te molestes." },
  { en: "Good for you!", es: "Bien por ti." },
  { en: "How about you?", es: "¿Qué tal tú?" },
  { en: "I hope so.", es: "Eso espero." },
  { en: "I'm impressed.", es: "Estoy impresionado." },
  { en: "It's worth it.", es: "Vale la pena." },
  { en: "Just a moment.", es: "Solo un momento." },
  { en: "Keep going!", es: "Sigue adelante." },
  { en: "Look out!", es: "¡Cuidado!" },
  { en: "Maybe next time.", es: "Quizás la próxima vez." },
  { en: "No problem.", es: "No hay problema." },
  { en: "Not at all.", es: "Para nada." },
  { en: "Sounds good.", es: "Suena bien." },
  { en: "Stay tuned.", es: "Mantente al tanto." },
  { en: "That's too bad.", es: "Eso es una lástima." },
  { en: "Very well.", es: "Muy bien." },
  { en: "Watch your step.", es: "Ten cuidado donde pisas." },
  { en: "Well done!", es: "¡Bien hecho!" },
  { en: "What a shame!", es: "¡Qué lástima!" },
  { en: "You bet!", es: "¡Claro que sí!" },
  { en: "You're right.", es: "Tienes razón." },
  { en: "Zip your lip.", es: "Cierra la boca." },
  { en: "I'm starving.", es: "Me muero de hambre." },
  { en: "Let's grab a bite.", es: "Vamos a comer algo." },
  { en: "Can I help you?", es: "¿Puedo ayudarte?" },
  { en: "I'm lost.", es: "Estoy perdido." },
  { en: "Check please.", es: "La cuenta, por favor." },
  { en: "Enjoy your meal!", es: "¡Buen provecho!" },
  { en: "I'm full.", es: "Estoy lleno." },
  { en: "The weather is nice.", es: "Hace buen tiempo." },
  { en: "It's freezing outside.", es: "Hace un frío glacial afuera." },
  { en: "I love this song.", es: "Me encanta esta canción." },
  { en: "Are you coming?", es: "¿Vienes?" },
  { en: "Wait here.", es: "Espera aquí." },
  { en: "Come in.", es: "Adelante / Entra." },
  { en: "Sit down.", es: "Siéntate." },
  { en: "Get up.", es: "Levántate." },
  { en: "Go away.", es: "Vete." },
  { en: "I'm coming.", es: "Ya voy." },
  { en: "Talk to you later.", es: "Hablamos luego." },
  { en: "I have a question.", es: "Tengo una pregunta." },
  { en: "It's a secret.", es: "Es un secreto." },
  { en: "Believe me.", es: "Créeme." },
  { en: "Tell me the truth.", es: "Dime la verdad." },
  { en: "I don't know.", es: "No lo sé." },
  { en: "I understand.", es: "Entiendo." },
  { en: "Help!", es: "¡Ayuda!" },
  { en: "I'm here.", es: "Estoy aquí." },
  { en: "Where are you?", es: "¿Dónde estás?" },
  { en: "See you tomorrow.", es: "Nos vemos mañana." },
  { en: "Good night.", es: "Buenas noches." },
  { en: "I'm tired.", es: "Estoy cansado." },
  { en: "I'm sleepy.", es: "Tengo sueño." },
  { en: "Let's go.", es: "Vámonos." },
  { en: "Stop!", es: "¡Para!" },
  { en: "Yes, please.", es: "Sí, por favor." },
  { en: "No, thank you.", es: "No, gracias." },
  { en: "Please.", es: "Por favor." },
  { en: "Thank you.", es: "Gracias." },
  { en: "You're welcome.", es: "De nada." },
  { en: "Sorry.", es: "Perdón / Lo siento." },
  { en: "Excuse me.", es: "Disculpe / Con permiso." },
  { en: "I'm sorry.", es: "Lo siento." },
  { en: "It's okay.", es: "Está bien." },
  { en: "Never mind.", es: "No importa." },
  { en: "Hi.", es: "Hola." },
  { en: "Hello.", es: "Hola." },
  { en: "Bye.", es: "Adiós." },
  { en: "Goodbye.", es: "Adiós." },
];

// --- BLOQUE DE EXPLICACIÓN GIGANTE ---
const EnglishBox = ({ title, content, type = "grammar" }) => (
  <div style={{ background: '#000000', borderRadius: '15px', border: `2px solid #a855f7`, margin: '1.5rem 0', overflow: 'hidden', textAlign: 'left', boxShadow: '0 0 25px rgba(168, 85, 247, 0.15)' }}>
    <div style={{ background: '#1e293b', padding: '8px 15px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ fontSize: '0.8rem', color: '#a855f7', fontWeight: 'bold' }}>{title.toUpperCase()}</span>
      <span style={{ color: '#ffffff', fontSize: '0.7rem', fontWeight: 'bold' }}>CORE ENGLISH</span>
    </div>
    <div style={{ padding: '25px', color: '#ffffff', fontSize: '1.3rem', fontWeight: 'bold', lineHeight: '1.6' }}>
      {content}
    </div>
  </div>
);

const BigExplanation = ({ num, title, text }) => (
  <div style={{ textAlign: 'left', margin: '2.5rem 0', borderLeft: '6px solid #a855f7', paddingLeft: '30px' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '12px' }}>
      <span style={{ fontSize: '3.5rem', fontWeight: '900', color: '#ffffff', WebkitTextStroke: '1px #a855f7' }}>{num}</span>
      <h3 style={{ fontSize: '2.2rem', color: '#a855f7', fontWeight: 'bold' }}>{title}</h3>
    </div>
    <p style={{ fontSize: '1.5rem', color: '#ffffff', lineHeight: '1.6', fontWeight: '500' }}>{text}</p>
  </div>
);

const VERB_DATA = [
  { verb: "Go", spanish: "Ir", past: "Went", future: "Will go", phonetic: "/ɡəʊ/" },
  { verb: "Be", spanish: "Ser/Estar", past: "Was/Were", future: "Will be", phonetic: "/biː/" },
  { verb: "Do", spanish: "Hacer", past: "Did", future: "Will do", phonetic: "/duː/" },
  { verb: "Have", spanish: "Tener", past: "Had", future: "Will have", phonetic: "/hæv/" },
  { verb: "See", spanish: "Ver", past: "Saw", future: "Will see", phonetic: "/siː/" },
  { verb: "Say", spanish: "Decir", past: "Said", future: "Will say", phonetic: "/seɪ/" },
  { verb: "Get", spanish: "Obtener", past: "Got", future: "Will get", phonetic: "/ɡet/" },
  { verb: "Take", spanish: "Tomar", past: "Took", future: "Will take", phonetic: "/teɪk/" },
  { verb: "Know", spanish: "Saber", past: "Knew", future: "Will know", phonetic: "/nəʊ/" },
  { verb: "Think", spanish: "Pensar", past: "Thought", future: "Will think", phonetic: "/θɪŋk/" },
  { verb: "Come", spanish: "Venir", past: "Came", future: "Will come", phonetic: "/kʌm/" },
  { verb: "Give", spanish: "Dar", past: "Gave", future: "Will give", phonetic: "/ɡɪv/" },
  { verb: "Want", spanish: "Querer", past: "Wanted", future: "Will want", phonetic: "/wɒnt/" },
  { verb: "Find", spanish: "Encontrar", past: "Found", future: "Will find", phonetic: "/faɪnd/" },
  { verb: "Tell", spanish: "Contar", past: "Told", future: "Will tell", phonetic: "/tel/" },
  { verb: "Work", spanish: "Trabajar", past: "Worked", future: "Will work", phonetic: "/wɜːk/" },
  { verb: "Call", spanish: "Llamar", past: "Called", future: "Will call", phonetic: "/kɔːl/" },
  { verb: "Try", spanish: "Intentar", past: "Tried", future: "Will try", phonetic: "/traɪ/" },
  { verb: "Ask", spanish: "Preguntar", past: "Asked", future: "Will ask", phonetic: "/ɑːsk/" },
  { verb: "Need", spanish: "Necesitar", past: "Needed", future: "Will need", phonetic: "/niːd/" },
  { verb: "Feel", spanish: "Sentir", past: "Felt", future: "Will feel", phonetic: "/fiːl/" },
  { verb: "Become", spanish: "Volverse", past: "Became", future: "Will become", phonetic: "/bɪˈkʌm/" },
  { verb: "Leave", spanish: "Salir", past: "Left", future: "Will leave", phonetic: "/liːv/" },
  { verb: "Keep", spanish: "Mantener", past: "Kept", future: "Will keep", phonetic: "/kiːp/" },
  { verb: "Begin", spanish: "Empezar", past: "Began", future: "Will begin", phonetic: "/bɪˈɡɪn/" },
  { verb: "Help", spanish: "Ayudar", past: "Helped", future: "Will help", phonetic: "/help/" },
  { verb: "Play", spanish: "Jugar", past: "Played", future: "Will play", phonetic: "/pleɪ/" },
  { verb: "Run", spanish: "Correr", past: "Ran", future: "Will run", phonetic: "/rʌn/" },
  { verb: "Read", spanish: "Leer", past: "Read", future: "Will read", phonetic: "/riːd/" },
  { verb: "Write", spanish: "Escribir", past: "Wrote", future: "Will write", phonetic: "/raɪt/" }
];

const AprendeIngles = () => {
  const navigate = useNavigate();
  const [points, setPoints] = useState(0);
  const [currentVerbs, setCurrentVerbs] = useState([]);
  const [flashQuest, setFlashQuest] = useState({ q: '', ans: '', t: '', verb: '' });
  const [flashInput, setFlashInput] = useState('');
  const [solvedIds, setSolvedIds] = useState([]);
  
  // Estados de los monos parlantes
  const [isMuted, setIsMuted] = useState(false);
  const [whoIsTalking, setWhoIsTalking] = useState(null); // 'en' or 'es'
  const [currentChat, setCurrentChat] = useState({ en: "Click to start!", es: "¡Haz clic para empezar!" });

  const startRandomChat = () => {
    const phrase = CONVERSATION_PHRASES[Math.floor(Math.random() * CONVERSATION_PHRASES.length)];
    setCurrentChat(phrase);
    
    // Habla el mono inglés
    if (!isMuted) {
      setWhoIsTalking('en');
      const utterEn = new SpeechSynthesisUtterance(phrase.en);
      utterEn.lang = 'en-US';
      utterEn.rate = 0.9;
      
      utterEn.onend = () => {
        // Pausa y habla el mono español
        setWhoIsTalking('es');
        const utterEs = new SpeechSynthesisUtterance(phrase.es);
        utterEs.lang = 'es-ES';
        utterEs.rate = 1;
        utterEs.onend = () => setWhoIsTalking(null);
        window.speechSynthesis.speak(utterEs);
      };
      
      window.speechSynthesis.speak(utterEn);
    } else {
      // Si está muteado, solo mostramos el texto con un delay visual
      setWhoIsTalking('en');
      setTimeout(() => setWhoIsTalking('es'), 2000);
      setTimeout(() => setWhoIsTalking(null), 4000);
    }
  };

  const shuffleVerbs = () => {
    const shuffled = [...VERB_DATA].sort(() => 0.5 - Math.random());
    setCurrentVerbs(shuffled.slice(0, 10));
  };

  const generateFlash = () => {
    const v = VERB_DATA[Math.floor(Math.random() * VERB_DATA.length)];
    const modes = [
      { t: 'Traducción', q: v.verb, ans: v.spanish.toLowerCase() },
      { t: 'Pasado', q: v.verb, ans: v.past.toLowerCase() },
      { t: 'Futuro', q: v.verb, ans: v.future.toLowerCase() }
    ];
    const mode = modes[Math.floor(Math.random() * modes.length)];
    setFlashQuest({ ...mode, verb: v.verb });
    setFlashInput('');
  };

  useEffect(() => {
    shuffleVerbs();
    generateFlash();
  }, []);

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    window.speechSynthesis.speak(utterance);
  };

  const checkFlash = () => {
    if (flashInput.toLowerCase().trim() === flashQuest.ans) {
      setPoints(prev => prev + 5);
      generateFlash();
    }
  };

  return (
    <div className="home-container" style={{ paddingBottom: '120px' }}>
      <Navbar />

      <section className="hero-section" style={{ minHeight: 'auto', padding: '140px 10% 40px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '50px', flexWrap: 'wrap', justifyContent: 'center' }}>
          <SenseiEnglish expression={flashInput === 'err' ? 'sad' : 'happy'} />
          <div style={{ textAlign: 'left', maxWidth: '600px' }}>
            <h1 className="hero-title" style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)' }}>English <span className="gradient-text" style={{ background: 'linear-gradient(90deg, #a855f7, #ec4899)', WebkitBackgroundClip: 'text' }}>Mastery</span></h1>
            <p className="hero-subtitle" style={{ color: '#ffffff', fontSize: '1.5rem' }}>"Stop studying, start speaking. Domina los verbos y desbloquea el mundo. Let's go!"</p>
          </div>
        </div>

        <div style={{ width: '100%', maxWidth: '800px', background: 'rgba(255,255,255,0.05)', borderRadius: '25px', padding: '20px', marginTop: '50px', border: '1px solid #a855f744' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#a855f7', fontSize: '0.9rem', fontWeight: 'bold', marginBottom: '12px', letterSpacing: '2px' }}>
            <span>FLUENCY SCORE</span>
            <span>{points} XP</span>
          </div>
          <div style={{ height: '12px', background: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ width: `${Math.min(points, 100)}%`, height: '100%', background: 'linear-gradient(90deg, #a855f7, #ec4899)', transition: '1.2s cubic-bezier(0.4, 0, 0.2, 1)' }}></div>
          </div>
        </div>
      </section>

      {/* --- GRAMMAR FLOW SECTION --- */}
      <section className="info-section">
        <h2 className="section-title">Manual de <span className="gradient-text">Conjugación</span></h2>
        <div className="benefits-grid" style={{ gridTemplateColumns: '1fr' }}>
          <div className="benefit-card" style={{ background: '#000', border: '2px solid #334155' }}>
            <EnglishBox title="The Verb Timeline" content="I work (Present) ➔ I worked (Past) ➔ I will work (Future)" />
            
            <BigExplanation num="01" title="Presente (Hábitos)" text="Usa el verbo normal. ¡Ojo! Si hablas de él o ella (He/She/It), añade una 'S' al final. Ejemplo: I play ➔ He plays." />
            <BigExplanation num="02" title="Pasado (Historias)" text="Para verbos regulares, añade 'ED'. Para los irregulares (como 'Go' ➔ 'Went'), ¡tienes que memorizarlos como un pro!" />
            <BigExplanation num="03" title="Futuro (Planes)" text="¡Es lo más fácil! Solo pon la palabra 'WILL' antes de cualquier verbo. Ejemplo: I will eat pizza tomorrow." />
          </div>
        </div>
      </section>

      {/* --- VERB TABLE --- */}
      <section className="info-section">
        <h2 className="section-title">The <span className="gradient-text">Verb Matrix</span></h2>
        <p className="section-subtitle" style={{ fontSize: '1.3rem', color: '#ffffff' }}>Los 30 verbos más usados. Haz clic en el icono para escuchar.</p>
        <div style={{ overflowX: 'auto', marginTop: '2rem' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: 'rgba(0,0,0,0.4)', borderRadius: '20px', overflow: 'hidden', border: '2px solid #a855f7' }}>
            <thead>
              <tr style={{ background: '#a855f7', color: '#ffffff' }}>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Verb</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Spanish</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Past</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Future</th>
                <th style={{ padding: '20px', fontSize: '1.2rem' }}>Listen</th>
              </tr>
            </thead>
            <tbody style={{ color: '#ffffff', textAlign: 'center', fontSize: '1.1rem' }}>
              {VERB_DATA.map((v, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #334155' }}>
                  <td style={{ padding: '15px', fontWeight: 'bold', color: '#a855f7' }}>{v.verb} <br/><span style={{fontSize: '0.7rem', color: '#94a3b8'}}>{v.phonetic}</span></td>
                  <td>{v.spanish}</td>
                  <td style={{ color: '#ec4899' }}>{v.past}</td>
                  <td style={{ color: '#10b981' }}>{v.future}</td>
                  <td>
                    <button onClick={() => speak(v.verb)} style={{ background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.5rem' }}>🔊</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* --- FLASH CHALLENGE --- */}
      <section className="info-section">
        <div className="benefit-card" style={{ maxWidth: '600px', margin: '0 auto', border: '3px solid #a855f7', background: 'rgba(168, 85, 247, 0.08)', textAlign: 'center', padding: '3.5rem' }}>
          <h2 className="section-title" style={{ fontSize: '1.8rem', marginBottom: '1.5rem' }}>⚡ Flash-Verb Challenge</h2>
          <p style={{ color: '#ffffff', marginBottom: '2rem', fontSize: '1.3rem' }}>
            {flashQuest.t} de: <span style={{ color: '#a855f7', fontSize: '2rem', display: 'block', fontWeight: '900' }}>{flashQuest.q}</span>
          </p>
          
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <input 
              type="text" value={flashInput}
              onChange={(e) => setFlashInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && checkFlash()}
              placeholder="Escribe aquí..."
              style={{ background: 'rgba(255,255,255,0.1)', border: '2px solid #a855f7', color: 'white', padding: '15px', borderRadius: '12px', width: '220px', fontSize: '1.1rem', textAlign: 'center' }}
            />
            <button onClick={checkFlash} className="btn-login" style={{ background: '#a855f7', color: '#ffffff', fontWeight: 'bold' }}>CHECK</button>
          </div>
          <button onClick={() => speak(flashQuest.verb)} style={{ marginTop: '20px', background: 'none', border: '1px solid #334155', color: '#94a3b8', padding: '5px 15px', borderRadius: '20px', cursor: 'pointer' }}>🔊 Listen Pronunciation</button>
        </div>
      </section>

      {/* --- THE CONVERSATION LAB (LOS MONOS) --- */}
      <section className="info-section">
        <h2 className="section-title">The <span className="gradient-text">Translation Lab</span></h2>
        <div className="benefit-card" style={{ background: '#000', border: '2px solid #a855f7', padding: '3rem' }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '30px', flexWrap: 'wrap', alignItems: 'center', flexDirection: window.innerWidth < 768 ? 'column' : 'row' }}>
            <ConversationMonkey color="#a855f7" label="ENGLISH" isTalking={whoIsTalking === 'en'} />
            
            <div style={{ textAlign: 'center', minWidth: '200px' }}>
              <div style={{ background: 'rgba(255,255,255,0.05)', padding: '20px', borderRadius: '20px', border: '1px dashed #a855f7', marginBottom: '20px' }}>
                <p style={{ color: whoIsTalking === 'en' ? '#a855f7' : 'white', fontSize: '1.4rem', fontWeight: 'bold' }}>{currentChat.en}</p>
                <div style={{ height: '2px', background: '#334155', margin: '15px 0' }}></div>
                <p style={{ color: whoIsTalking === 'es' ? '#10b981' : '#94a3b8', fontSize: '1.2rem' }}>{currentChat.es}</p>
              </div>
              
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                <button onClick={startRandomChat} className="btn-login" style={{ background: '#a855f7', color: 'white' }}>
                  {whoIsTalking ? "TALKING..." : "RANDOM PHRASE 🎲"}
                </button>
                <button 
                  onClick={() => setIsMuted(!isMuted)} 
                  style={{ background: 'none', border: `2px solid ${isMuted ? '#ef4444' : '#a855f7'}`, borderRadius: '12px', padding: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  {isMuted ? "🔇 Muted" : "🔊 Audio ON"}
                </button>
              </div>
            </div>

            <ConversationMonkey color="#10b981" label="ESPAÑOL" isTalking={whoIsTalking === 'es'} />
          </div>
        </div>
      </section>

      {/* --- COMMON EXPRESSIONS --- */}
      <section className="info-section">
        <h2 className="section-title">Palabras <span className="gradient-text">Imprescindibles</span></h2>
        <div className="benefits-grid">
          <div className="benefit-card">
            <h4 style={{ color: '#a855f7' }}>Connectors</h4>
            <ul style={{ textAlign: 'left', color: '#ffffff', marginTop: '1rem', listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
              <li>🔹 <b>However</b> (Sin embargo)</li>
              <li>🔹 <b>Therefore</b> (Por lo tanto)</li>
              <li>🔹 <b>Because</b> (Porque)</li>
              <li>🔹 <b>Although</b> (Aunque)</li>
            </ul>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#ec4899' }}>Daily Phrases</h4>
            <ul style={{ textAlign: 'left', color: '#ffffff', marginTop: '1rem', listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
              <li>🔹 <b>How's it going?</b> (¿Cómo va?)</li>
              <li>🔹 <b>Never mind</b> (No importa)</li>
              <li>🔹 <b>I'll get it</b> (Yo me encargo)</li>
              <li>🔹 <b>Take care</b> (Cuídate)</li>
            </ul>
          </div>
          <div className="benefit-card">
            <h4 style={{ color: '#10b981' }}>Time Markers</h4>
            <ul style={{ textAlign: 'left', color: '#ffffff', marginTop: '1rem', listStyle: 'none', padding: 0, fontSize: '1.1rem' }}>
              <li>🔹 <b>Yesterday</b> (Ayer)</li>
              <li>🔹 <b>Today</b> (Hoy)</li>
              <li>🔹 <b>Soon</b> (Pronto)</li>
              <li>🔹 <b>Eventually</b> (Tarde o temprano)</li>
            </ul>
          </div>
        </div>
      </section>

      <div style={{ textAlign: 'center', marginTop: '60px' }}>
        <button className="btn-login" style={{ background: '#a855f7', color: '#ffffff', padding: '15px 40px', fontSize: '1.2rem' }} onClick={() => navigate('/')}>Volver al Mainframe</button>
      </div>
    </div>
  );
};

export default AprendeIngles;