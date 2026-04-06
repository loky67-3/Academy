import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Tesseract from 'tesseract.js';
import Navbar from './Navbar';

// --- PALETA DE COLORES ROBÓTICA (para consistencia) ---
const ROBOT_UI = {
  primary: '#00f2ff', // Cyan Neón (Blueprints)
  secondary: '#7000ff', // Púrpura (Ultron Core)
  danger: '#ff003c', // Rojo (Terminator Eye)
  warning: '#f3ff00', // Amarillo (Industrial)
  bg: '#020617'
};

// --- COMPONENTE: UNIDAD DE REPLICACIÓN DOCUMENTAL ---
const DocumentScanner = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [ocrResult, setOcrResult] = useState('');
  const [generatedComponentCode, setGeneratedComponentCode] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setOcrResult('');
      setGeneratedComponentCode('');
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach(track => track.stop()); // Stop camera if active
      }
    }
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
      videoRef.current.play();
      setSelectedImage(null); // Clear previous image when starting camera
      setOcrResult('');
      setGeneratedComponentCode('');
    } catch (err) {
      console.error("Error accessing camera: ", err);
      alert("No se pudo acceder a la cámara. Asegúrate de dar permisos.");
    }
  };

  const takePhoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas && video.srcObject) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext('2d');
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      setSelectedImage(canvas.toDataURL('image/png'));
      video.srcObject.getTracks().forEach(track => track.stop()); // Stop camera
    } else {
      alert("La cámara no está activa. Por favor, inicia la cámara primero.");
    }
  };

  const processImageWithOCR = async () => {
    if (!selectedImage) {
      alert("Por favor, selecciona o toma una imagen primero.");
      return;
    }

    setIsProcessing(true);
    setProcessingProgress(0);
    setOcrResult('');
    setGeneratedComponentCode('');

    try {
      const { data: { text } } = await Tesseract.recognize(
        selectedImage,
        'spa', // Idioma español
        { 
          logger: m => {
            if (m.status === 'recognizing text') {
              setProcessingProgress(Math.round(m.progress * 100));
            }
          }
        }
      );
      setOcrResult(text);
      generateReactComponent(text, selectedImage);
    } catch (error) {
      console.error("Error during OCR processing:", error);
      setOcrResult("Error al procesar la imagen con OCR.");
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  };

  const generateReactComponent = (text, imageUrl) => {
    // SIMULACIÓN AVANZADA:
    // En un sistema real, aquí se usaría un algoritmo de Layout Analysis
    // para detectar títulos, párrafos, imágenes, tablas, etc.,
    // y sus posiciones relativas, así como la extracción de colores dominantes.
    // Para esta demostración, generamos un JSX básico que muestra el texto
    // sobre la imagen original como fondo, dando la ilusión de replicación.

    const cleanText = text.replace(/`/g, '\\`'); // Escape backticks for template literals
    const generatedCode = `
import React from 'react';

const DocumentoReplicado = () => {
  return (
    <div style={{
      position: 'relative',
      width: '100%',
      maxWidth: '800px',
      minHeight: '400px',
      margin: '20px auto',
      padding: '30px',
      border: '2px solid ${ROBOT_UI.primary}',
      borderRadius: '15px',
      boxShadow: '0 0 30px ${ROBOT_UI.primary}44',
      backgroundImage: 'url(${imageUrl})',
      backgroundSize: 'contain', // o 'cover'
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundColor: '#0a0a0a', // Fondo si la imagen no cubre todo
      color: '#fff', // Color de texto por defecto
      fontFamily: 'sans-serif',
      overflow: 'hidden', // Para que el texto no se salga si es muy largo
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center'
    }}>
      {/* Capa de texto sobre la imagen */}
      <div style={{
        background: 'rgba(0,0,0,0.7)', // Fondo semi-transparente para leer el texto
        padding: '20px',
        borderRadius: '10px',
        maxWidth: '90%',
        wordBreak: 'break-word'
      }}>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
          {\`${cleanText}\`}
        </p>
      </div>
    </div>
  );
};

export default DocumentoReplicado;
    `;
    setGeneratedComponentCode(generatedCode);
  };

  const downloadText = () => {
    if (ocrResult) {
      const element = document.createElement("a");
      const file = new Blob([ocrResult], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = "documento_escaneado.txt";
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }
  };

  return (
    <div className="home-container" style={{ background: ROBOT_UI.bg, color: '#fff', paddingBottom: '100px' }}>
      <Navbar />
      <section className="info-section" style={{ background: 'rgba(0, 242, 255, 0.05)', padding: '5rem 10%', borderRadius: '60px', border: `2px solid ${ROBOT_UI.primary}33`, marginTop: '4rem' }}>
        <h2 style={{ fontSize: '4rem', fontWeight: '900', color: '#fff', textAlign: 'left', marginBottom: '1rem' }}>
          UNIDAD DE REPLICACIÓN <span style={{ color: ROBOT_UI.primary }}>DOCUMENTAL</span>
        </h2>
        <p style={{ fontSize: '1.5rem', color: '#94a3b8', textAlign: 'left', marginBottom: '3rem' }}>
          Escanea cualquier documento físico o digital y genera un componente React que replica su contenido y diseño.
          Ideal para digitalizar credenciales, facturas, o cualquier texto impreso con alta fidelidad.
        </p>

        <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: '300px', background: '#0a0a0a', padding: '2rem', borderRadius: '20px', border: `1px solid ${ROBOT_UI.primary}66` }}>
            <h3 style={{ color: ROBOT_UI.primary, marginBottom: '1.5rem' }}>Fuente de Imagen</h3>
            <input type="file" accept="image/*,application/pdf" onChange={handleImageUpload} style={{ display: 'block', marginBottom: '1rem', width: '100%', padding: '10px', background: '#1e293b', border: `1px solid ${ROBOT_UI.primary}44`, borderRadius: '8px', color: '#fff' }} />
            
            <div style={{ textAlign: 'center', marginBottom: '1rem' }}>
              <button onClick={startCamera} style={{ background: ROBOT_UI.secondary, color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginRight: '10px' }}>
                Tomar Foto
              </button>
              <button onClick={takePhoto} style={{ background: ROBOT_UI.secondary, color: '#fff', padding: '10px 20px', borderRadius: '8px', border: 'none', cursor: 'pointer' }}>
                Capturar
              </button>
            </div>
            <video ref={videoRef} style={{ width: '100%', borderRadius: '10px', display: selectedImage || isProcessing ? 'none' : 'block' }} autoPlay playsInline muted></video>
            <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>

            {selectedImage && (
              <img src={selectedImage} alt="Selected for OCR" style={{ width: '100%', borderRadius: '10px', marginTop: '1rem', border: `1px solid ${ROBOT_UI.primary}` }} />
            )}

            <button 
              onClick={processImageWithOCR} 
              disabled={!selectedImage || isProcessing}
              style={{ background: ROBOT_UI.primary, color: '#000', padding: '15px 30px', borderRadius: '10px', border: 'none', cursor: 'pointer', marginTop: '1.5rem', width: '100%', fontWeight: 'bold' }}
            >
              {isProcessing ? `Escaneando... ${processingProgress}%` : "ESCANEAR Y REPLICAR"}
            </button>
          </div>

          <div style={{ flex: 2, minWidth: '350px', background: '#0a0a0a', padding: '2rem', borderRadius: '20px', border: `1px solid ${ROBOT_UI.primary}66` }}>
            <h3 style={{ color: ROBOT_UI.primary, marginBottom: '1.5rem' }}>Resultado de Replicación</h3>
            {ocrResult && (
              <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', marginBottom: '1.5rem', border: '1px solid #22c55e' }}>
                <h4 style={{ color: '#22c55e', marginBottom: '0.5rem' }}>Texto Extraído (OCR):</h4>
                <p style={{ fontSize: '0.9rem', color: '#94a3b8', whiteSpace: 'pre-wrap' }}>{ocrResult}</p>
                <button onClick={downloadText} style={{ background: '#22c55e', color: '#000', padding: '8px 15px', borderRadius: '8px', border: 'none', cursor: 'pointer', marginTop: '1rem', fontWeight: 'bold' }}>
                  Descargar Texto
                </button>
              </div>
            )}
            {generatedComponentCode && (
              <div style={{ background: '#1e293b', padding: '1.5rem', borderRadius: '10px', border: `1px solid ${ROBOT_UI.warning}` }}>
                <h4 style={{ color: ROBOT_UI.warning, marginBottom: '0.5rem' }}>Código React Generado (JSX):</h4>
                <pre style={{ background: '#000', color: '#fff', padding: '1rem', borderRadius: '8px', fontSize: '0.8rem', overflowX: 'auto', whiteSpace: 'pre-wrap' }}>
                  <code>{generatedComponentCode}</code>
                </pre>
                <p style={{ color: '#94a3b8', fontSize: '0.7rem', marginTop: '1rem' }}>
                  *Nota: La replicación de diseño exacto es una simulación. Un sistema real requeriría IA avanzada para análisis de layout y estilos.
                </p>
              </div>
            )}
          </div>
        </div>
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          <button 
            className="btn-login" 
            style={{ background: ROBOT_UI.primary, color: '#000', padding: '1.5rem 4rem', fontSize: '1.3rem', fontWeight: '900', border: 'none', borderRadius: '15px', cursor: 'pointer' }}
            onClick={() => navigate('/')}
          >
            VOLVER AL MAINFRAME
          </button>
        </div>
      </section>
    </div>
  );
};

export default DocumentScanner;