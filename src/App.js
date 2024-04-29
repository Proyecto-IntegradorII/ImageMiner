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
		<div className="relative h-screen overflow-hidden font-text">
			<div className="flex flex-col justify-center items-center h-screen ">
				<p className="z-10 w-[60rem] text-center mb-14 text-lg font-bold pt-[-2rem] text-black ">
					¡Bienvenido a NutriScan! Obten toda la información necesaria sobre el alimento que deseas
					consumir, solo respondes algunas preguntas sobre tu salud, objetivos alimenticios y estilo
					de vida y luego, simplemente subes una foto de la tabla nutricional del alimento que
					deseas consumir. Basándonos en tus respuestas y la información proporcionada, te ofrecemos
					un análisis personalizado sobre la idoneidad del alimento para ti. ¡Comienza a tomar
					decisiones alimenticias más informadas y saludables con NutriScan!
				</p>
				<Button texto={"Empezar"} onClick={() => navigate("/questions")} />
			</div>
		</div>
	);
}

export default App;
