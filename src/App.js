import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";
import Modal from "react-modal";
// import canvasImage from "../src/images/canvas.png"; // Import your image
import Swal from "sweetalert2";
import Button from "./components/button";

function App() {
	const navigate = useNavigate(); // Hook de navegación

	return (
		<div className="h-screen w-full font-text">
			<div className="flex flex-col w-auto justify-center items-center h-full mx-4 pb-48">
				<img
					src={require("./images/imageminer-blue.png")}
					alt="Imagen de fondo"
					className="max-w-lg w-full md:w-auto"
				/>
				<div className="flex flex-col items-center justify-center max-w-lg">
					{/* TEXTO */}
					<p className="text-center mt-20 mb-8 text-lg font-bold">
						Ingresa el número de imágenes y el término de búsqueda para crear y descargar un dataset
					</p>
					{/* INPUT */}
					<div class="flex max-w-md w-full h-10 items-center border-2 rounded-lg  border-[#011b72]  overflow-hidden">
						<input
							class="bg-white w-1/5 h-full text-gray-900 px-2 justify-start focus:outline-none"
							type="number"
							min="0"
							max="1000"
							placeholder="100"
						/>
						<input
							class="bg-transparent grow border-none h-full text-gray-900 px-2 focus:outline-none "
							type="text"
							min="0"
							placeholder="Ingresa un término de búsqueda"
						/>
						<button className="w-10 h-10 flex items-center justify-end p-1" type="button">
							<img src={require("./images/download-arrow.png")} alt="Icono de descarga" />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
}

export default App;
