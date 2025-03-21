import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/layout//index";
import Home from "./pages/home/Home";
import "./index.css";
import { ThemeProvider } from "@material-tailwind/react";

import App from "./App";
import reportWebVitals from "./reportWebVitals";
import Register from "./pages/home/Register";
import Login from "./pages/home/Login";
import Leaderboard from "./pages/home/LeaderBoard";
import Results from "./pages/home/Results";
import Preguntas from "./pages/home/Questions";
import SendImage from "./pages/home/UploadImage";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
	<BrowserRouter>
		<ThemeProvider>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/*" element={<Home />} />
					<Route path="/register" element={<Register />} />
					<Route path="/login" element={<Login />} />
					<Route path="/leaderboard" element={<Leaderboard />} />
					<Route path="/results" element={<Results />} />
					<Route path="/questions" element={<Preguntas />} />
					<Route path="/image" element={<SendImage />} />
				</Route>
			</Routes>
		</ThemeProvider>
	</BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
