import { useState, useEffect, useRef } from "react";
import axios from "axios";

function App() {
	const [progress, setProgress] = useState(0);
	const [query, setQuery] = useState("");
	const [numberOfImages, setNumberOfImages] = useState(null);
	const [loading, setLoading] = useState(false);
	const [folderId, setFolderId] = useState(null);
	// const [startDownload, setStartDownload] = useState(false);
	const [downloaded, setDownloaded] = useState(false);
	const numberOfImagesRef = useRef(numberOfImages);
	const [inputError, setInputError] = useState(false);

	const ProgressBar = ({ progress }) => {
		const roundedProgress = Math.round(progress);
		return (
			<div className="relative h-6 w-full rounded-lg overflow-hidden bg-gray-400">
				<div
					className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-300 to-[#011b72]"
					style={{ width: `${roundedProgress}%` }}
				></div>
				<div className="relative z-10 flex justify-center items-center h-full">
					<span className="text-white">{`Generando (${roundedProgress}%)`}</span>
				</div>
			</div>
		);
	};

	const downloadZip = () => {
		const link = document.createElement("a");
		link.href = `https://imageminer.onrender.com/download_folder?folder_id=${folderId}`;
		link.setAttribute("download", true);
		// setStartDownload(true);
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
		setFolderId(null);
		setDownloaded(true);
	};

	useEffect(() => {
		if (folderId) {
			const interval = setInterval(() => {
				const postData = {
					folder_id: folderId,
				};

				axios
					.post("https://imageminer.onrender.com/count_files", postData)
					.then((response) => {
						const completedImages = response.data.file_count;
						console.log("Imagen #:", completedImages);
						const newProgress = Math.min((completedImages / numberOfImagesRef.current) * 100, 100);
						setProgress(newProgress);
						if (completedImages >= numberOfImagesRef.current) {
							clearInterval(interval);
							console.log("Dataset generation complete.");
							downloadZip();
						}
					})
					.catch((error) => {
						console.error("Error fetching file count:", error);
						clearInterval(interval);
					});
			}, 1000);

			return () => clearInterval(interval);
		}
	}, [folderId, downloadZip]);

	const handleSubmit = () => {
		if (!numberOfImages || !query) {
			setFolderId(null);
			setInputError(true);
			setLoading(false);
			setProgress(0);
			setDownloaded(false);

			return; // Detener la ejecución si los campos son inválidos
		} else {
			setInputError(false);

			setLoading(true);
			setProgress(0);
			// setStartDownload(false);
			setDownloaded(false);
			numberOfImagesRef.current = numberOfImages;
		}

		const postData = {
			query: query,
			number_of_images: numberOfImages,
		};

		console.log("Request started");
		axios
			.post("https://imageminer.onrender.com/web_scrapping", postData)
			.then((response) => {
				console.log("Response:", response.data.folder_id);
				setFolderId(response.data.folder_id);
				// console.log("The user has modified the input - the process has been interrupted");
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
						en formato ZIP
					</p>
					{/* INPUT */}
					<div class="flex max-w-md w-full h-10 items-center border-2 rounded-lg  border-[#011b72]  overflow-hidden">
						{/* NUMBER */}
						<input
							class="bg-white w-1/5 h-full text-gray-900 px-2 justify-start focus:outline-none"
							type="number"
							min="0"
							max="1000"
							placeholder="50"
							value={numberOfImages}
							onChange={(e) => setNumberOfImages(e.target.value)}
							disabled={loading || folderId}
						/>
						{/* TEXT */}
						<input
							class="bg-transparent grow border-none h-full text-gray-900 px-2 focus:outline-none "
							type="text"
							min="0"
							placeholder="Mountains"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							disabled={loading || folderId}
						/>
						{/* BUTTON */}
						<button
							className="w-10 h-10 flex items-center justify-end p-1"
							type="button"
							onClick={() => {
								if (!loading && !folderId) {
									handleSubmit();
								}
							}}
							disabled={loading || folderId}
						>
							<img src={require("./images/download-arrow.png")} alt="Icono de descarga" />
						</button>
					</div>

					{/* PROGRESS BAR */}
					{loading && (
						<p className="mt-12 text-[#011b72] font-bold animate-pulse">
							Iniciando solicitud en el servidor...
						</p>
					)}
					{!loading && folderId && (
						<div className="flex w-full max-w-md rounded-xl mt-12 items-center justify-center bg-gray-100">
							<ProgressBar progress={progress} />
						</div>
					)}
					{/* {startDownload && !downloaded && (
						<p className="mt-12 text-[#011b72] font-bold animate-pulse">Iniciando descarga...</p>
					)} */}
					{downloaded && <p className="mt-12 text-[#011b72] font-bold">¡Dataset generado!</p>}
					{inputError && (
						<p className="mt-12 text-red-500 font-bold">
							Completa los campos para crear el dataset
						</p>
					)}
				</div>
			</div>
		</div>
	);
}

export default App;
