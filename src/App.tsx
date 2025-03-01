import React, { useState, useRef } from "react";
import ReactQRCode from "react-qr-code";

const App: React.FC = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [qrCode, setQrCode] = useState<string>("");
  const qrCodeRef = useRef<HTMLDivElement | null>(null);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setInputValue(event.target.value);
  };

  const handleGenerateQR = (): void => {
    if (inputValue.trim() !== "") {
      setQrCode(inputValue);
    } else {
      alert("Please enter a URL or text!");
    }
  };

  // Function to trigger PNG download
  const downloadQRAsPNG = (): void => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.querySelector("svg");
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/png");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.png";
          link.click();
        };
        
        img.src = url;
      }
    }
  };

  // Function to trigger JPG download
  const downloadQRAsJPG = (): void => {
    if (qrCodeRef.current) {
      const svgElement = qrCodeRef.current.querySelector("svg");
      if (svgElement) {
        const svgData = new XMLSerializer().serializeToString(svgElement);
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const img = new Image();
        const svgBlob = new Blob([svgData], { type: "image/svg+xml" });
        const url = URL.createObjectURL(svgBlob);
        
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          ctx?.drawImage(img, 0, 0);
          const dataUrl = canvas.toDataURL("image/jpeg");
          const link = document.createElement("a");
          link.href = dataUrl;
          link.download = "qr-code.jpg";
          link.click();
        };
        
        img.src = url;
      }
    }
  };

  return (
    <>
      <main className="my-16">
      <h1 className="text-4xl font-bold text-center">QR Code Generator</h1>
      <p className="text-center">You can download it as PNG ot JPG.</p>
      <div className="flex flex-col gap-2 mx-auto md:w-[50%] mt-10 p-5">
        <label htmlFor="userInput">Enter your link to generate QR Code</label>
        <input
          type="text"
          id="userInput"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter URL or text"
          className="bg-white text-black p-2 w-full rounded-lg pl-4"
        />
        <button
          onClick={handleGenerateQR}
          className="py-2 px-4 bg-blue-700 hover:bg-blue-600 active:bg-blue-700 transition-colors 
          duration-150 ease-in rounded-lg cursor-pointer mb-6 mt-2"
        >
          Generate QR Code
        </button>
        <div className="bg-blue-100 w-full h-96 p-5">
          {qrCode ? (
            <div className="flex justify-center">
              <div className="inline-grid" ref={qrCodeRef}>
                <ReactQRCode value={qrCode} size={320} />
              </div>
            </div>
          ) : (
            <div className="text-center mt-10">
              <span className="text-black font-medium text-xl">QR Code goes here when you hit the button</span>
            </div>
          )}
        </div>

        {qrCode && (
          <div className="flex justify-center items-center gap-4 mt-4">
            <button
              onClick={downloadQRAsPNG}
              className="px-4 py-2 border rounded-lg cursor-pointer bg-white hover:bg-gray-200 text-black
              font-medium active:bg-gray-300 transition-colors duration-100 ease-in"
            >
              Download as PNG
            </button>
            <button
              onClick={downloadQRAsJPG}
              className="px-4 py-2 border rounded-lg cursor-pointer bg-white hover:bg-gray-200 text-black
              font-medium active:bg-gray-300 transition-colors duration-100 ease-in"
            >
              Download as JPG
            </button>
          </div>
        )}
      </div>
      <footer className="flex flex-col justify-center mt-10 text-center">
          <span>&copy; 2025 Dounhuward Caparas </span>
          All rights reserved.
      </footer>
    </main>
    </>
  );
};

export default App;
