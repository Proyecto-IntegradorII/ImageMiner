import { useState, useEffect } from "react";
import axios from "axios";

function App() {
	const [progress, setProgress] = useState(0);
	const [query, setQuery] = useState("");
	const [numberOfImages, setNumberOfImages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [folderId, setFolderId] = useState(null);
	const [isComplete, setIsComplete] = useState(false);

	const ProgressBar = ({ progress }) => {
		return (
			<div className="relative h-6 w-full rounded-lg overflow-hidden bg-gray-400">
				<div
					className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-300 to-[#011b72]"
					style={{ width: `${progress}%` }}
				></div>
				<div className="relative z-10 flex justify-center items-center h-full">
					<span className="text-white">{`Generando (${progress}%)`}</span>
				</div>
			</div>
		);
	};

	useEffect(() => {
		const interval = setInterval(() => {
			if (progress < 100) {
				setProgress(progress + 5);
			} else {
				clearInterval(interval);
			}
		}, 1000);

		return () => clearInterval(interval);
	}, [progress]);

	const handleSubmit = () => {
		setLoading(true); // Mostrar mensaje de "Cargando"

		const postData = {
			query: query,
			number_of_images: numberOfImages,
		};

		axios
			.post("https://imageminer.onrender.com/web_scrapping", postData)
			.then((response) => {
				console.log("Response:", response.data.folder_id);
				setFolderId(response.data.folder_id);
				// checkImagesCount(response.data.folder_id); // Iniciar el monitoreo
			})
			.catch((error) => {
				console.error("Error:", error);
			})
			.finally(() => {
				setLoading(false); // Ocultar mensaje de "Cargando" y mostrar la barra de progreso
			});
	};

	return (
		<div className="h-screen w-full font-text pb-16">
			<div className="flex flex-col w-auto justify-center items-center h-full mx-4 ">
				<img
					src={require("./images/imageminer-blue.png")}
					alt="Imagen de fondo"
					className="max-w-lg w-full md:w-auto mt-16"
				/>
				<div className="flex flex-col items-center justify-center max-w-lg">
					{/* TOP TEXT */}
					<p className="text-center mt-20 mb-8 text-lg font-bold">
						Ingresa el número de imágenes y el término de búsqueda para crear y descargar un dataset
					</p>
					{/* INPUT */}
					<div class="flex max-w-md w-full h-10 items-center border-2 rounded-lg  border-[#011b72]  overflow-hidden">
						{/* NUMBER */}
						<input
							class="bg-white w-1/5 h-full text-gray-900 px-2 justify-start focus:outline-none"
							type="number"
							min="0"
							max="1000"
							placeholder="100"
							value={numberOfImages}
							onChange={(e) => setNumberOfImages(e.target.value)}
						/>
						{/* TEXT */}
						<input
							class="bg-transparent grow border-none h-full text-gray-900 px-2 focus:outline-none "
							type="text"
							min="0"
							placeholder="Ingresa un término de búsqueda"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
						{/* BUTTON */}
						<button
							className="w-10 h-10 flex items-center justify-end p-1"
							type="button"
							onClick={handleSubmit}
						>
							<img src={require("./images/download-arrow.png")} alt="Icono de descarga" />
						</button>
					</div>

					{/* PROGRESS BAR */}
					{loading && <p>Cargando...</p>}
					{!loading && progress > 0 && (
						<div className="flex w-full max-w-md rounded-xl mt-12 items-center justify-center bg-gray-100">
							<ProgressBar progress={progress} />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
