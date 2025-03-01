import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from "react";
import ReactQRCode from "react-qr-code";
const App = () => {
    const [inputValue, setInputValue] = useState("");
    const [qrCode, setQrCode] = useState("");
    const qrCodeRef = useRef(null);
    const handleInputChange = (event) => {
        setInputValue(event.target.value);
    };
    const handleGenerateQR = () => {
        if (inputValue.trim() !== "") {
            setQrCode(inputValue);
        }
        else {
            alert("Please enter a URL or text!");
        }
    };
    // Function to trigger PNG download
    const downloadQRAsPNG = () => {
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
    const downloadQRAsJPG = () => {
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
    return (_jsx(_Fragment, { children: _jsxs("main", { className: "my-16", children: [_jsx("h1", { className: "text-4xl font-bold text-center", children: "QR Code Generator" }), _jsx("p", { className: "text-center", children: "You can download it as PNG ot JPG." }), _jsxs("div", { className: "flex flex-col gap-2 mx-auto md:w-[50%] mt-10 p-5", children: [_jsx("label", { htmlFor: "userInput", children: "Enter your link to generate QR Code" }), _jsx("input", { type: "text", id: "userInput", value: inputValue, onChange: handleInputChange, placeholder: "Enter URL or text", className: "bg-white text-black p-2 w-full rounded-lg pl-4" }), _jsx("button", { onClick: handleGenerateQR, className: "py-2 px-4 bg-blue-700 hover:bg-blue-600 active:bg-blue-700 transition-colors \n          duration-150 ease-in rounded-lg cursor-pointer mb-6 mt-2", children: "Generate QR Code" }), _jsx("div", { className: "bg-blue-100 w-full h-96 p-5", children: qrCode ? (_jsx("div", { className: "flex justify-center", children: _jsx("div", { className: "inline-grid", ref: qrCodeRef, children: _jsx(ReactQRCode, { value: qrCode, size: 320 }) }) })) : (_jsx("div", { className: "text-center mt-10", children: _jsx("span", { className: "text-black font-medium text-xl", children: "QR Code goes here when you hit the button" }) })) }), qrCode && (_jsxs("div", { className: "flex justify-center items-center gap-4 mt-4", children: [_jsx("button", { onClick: downloadQRAsPNG, className: "px-4 py-2 border rounded-lg cursor-pointer bg-white hover:bg-gray-200 text-black\n              font-medium active:bg-gray-300 transition-colors duration-100 ease-in", children: "Download as PNG" }), _jsx("button", { onClick: downloadQRAsJPG, className: "px-4 py-2 border rounded-lg cursor-pointer bg-white hover:bg-gray-200 text-black\n              font-medium active:bg-gray-300 transition-colors duration-100 ease-in", children: "Download as JPG" })] }))] }), _jsxs("footer", { className: "flex flex-col justify-center mt-10 text-center", children: [_jsx("span", { children: "\u00A9 2025 Dounhuward Caparas " }), "All rights reserved."] })] }) }));
};
export default App;
