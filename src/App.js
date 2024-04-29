import { useState, useEffect, useRef } from "react";
import OpenAI from "openai";
import { useNavigate } from "react-router-dom";
import "./index.css";
import MyAudioVisualaizer from "./pages/visualaizers/audio";
import Modal from "react-modal";
// import canvasImage from "../src/images/canvas.png"; // Import your image
import Swal from "sweetalert2";
import Button from "./components/button";

function App() {
	const navigate = useNavigate(); // Hook de navegación

	return (
		<div className="relative h-screen overflow-hidden font-text">
			<video
				autoPlay
				muted
				loop
				className="absolute inset-0 object-cover w-full h-full brightness-60"
				style={{ filter: "brightness(0.4)" }}
			>
				<source
					src="https://videocdn.cdnpk.net/joy/content/video/free/video0460/large_preview/_import_60cc2c109d2283.38913314.mp4?filename=1105859_1080p_4k_2k_3840x2160.mp4"
					type="video/mp4"
				/>
				Tu navegador no soporta el elemento de video.
			</video>
			<div className="flex flex-col justify-center items-center h-screen ">
				<p className="z-10 w-[60rem] text-center mb-14 text-lg font-bold pt-[-2rem] text-white ">
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

/*
Debes hacer un análisis de la información nutricional de este producto. 

			Analizarás cada uno de estos apartados, darás una descripción, una recomendación y una calificación, y cada apartado lo harás en formato JSON: calorías, proteínas, grasas, colesterol, sodio, carbohidratos, azúcares, fibra y vitaminas. 
			Si no hay información sobre algún apartado, no lo incluyas en el JSON. 
			Ten en cuenta que la información nutricional puede contener errores, puede estar en inglés u otro idioma, pero la respuesta debe ser en español.

			Además, darás una calificación al alimento en general, dirás si lo consumirías (Lo puedes consumir regularmente, Consúmelo con moderación, No lo consumas) y harás una descripción sobre el alimento, en formato JSON.
			Las calificaciones serán de 1 a 10.
			Todas las recomendaciones y calificaciones deben ser personalizadas en base a las características de la persona.
			
			La estructura del JSON sería así:
			
			{
				"calorías": {
					"descripcion": "",
					"recomendacion": "",
					"calificacion": 6
				},
				"proteínas": {
					"descripcion": "",
					"recomendacion": "",
					"calificacion": 8
				},				
				"vitaminas": {
					"descripcion": "",
					"recomendacion": "",
					"calificacion": 2
				},
				"alimento_general": {
					"consumiria": "",
					"resumen": "",
					"calificacion_general": 6
				}
			}*/
