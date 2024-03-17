import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import AllRoutes from "./allRoutes";
import Nav from "./components/NavBar/nav";

function App() {
	return (
		<Router>
			<Nav />
			<AllRoutes />
		</Router>
	);
}

export default App;
