// Create app using Express

// Import express into the project
// import expres from 'express'
const express = require('express');
const cors = require('cors');
const { uuid, isUuid } = require('uuidv4');

// Use express
const app = express();

// Select which front-ends have access to the api, if empty any one can access
app.use(cors());

// Make express understand json for the response from the api
app.use(express.json());

// Store in the app memory the data from the API
const state = [];

function logRequest(request, response, next) {
	const { method, url } = request;

	const logLabel = `[${method.toUpperCase()} ${url}]`;

	console.log(logLabel);

	// Call next middleware
	return next();
}

function validateProjectId(request, response, next) {
	// Check if the id is valid using isUuid()
	const { id } = request.params;

	// If the id is invalid, the program won't execute the next middleware(next()) because we are returning from the function
	if (!isUuid(id)) {
		return response.status(400).json({ error: 'Invalid project id' });
	}

	return next();
}

app.use(logRequest);
// app.use('/projects/:id', validateProjectId);

// Use routes to show something to the user
// GET something from a route: '/', '/projects'
// request = stores the information about the request the user is making to the server
// response = stores information about the response the server sent back to the user
app.get('/projects', (request, response) => {
	const { title } = request.query;

	const results = title
		? state.filter((project) => project.title.includes(title))
		: state;

	// response.send('Hello There'); => show a text msg to the user
	return response.json(results);
});

app.post('/projects', (request, response) => {
	const { title, owner } = request.body;

	const project = { id: uuid(), title, owner };

	state.push(project);

	return response.json(project);
});

app.put('/projects/:id', validateProjectId, (request, response) => {
	const { id } = request.params;
	const { title, owner } = request.body;

	// Get index of the project inside the state
	const projectIndex = state.findIndex((project) => project.id === id);

	// If did not find the project
	if (projectIndex < 0) {
		// return a error message and http error code
		return response.status(400).json({ error: 'Project not found' });
	}

	// Store the new information
	const project = {
		id,
		title,
		owner,
	};

	// Update the project on state with the new data
	state[projectIndex] = project;

	return response.json(project);
});

app.delete('/projects/:id', validateProjectId, (request, response) => {
	const { id } = request.params;

	// Get index of the project inside the state
	const projectIndex = state.findIndex((project) => project.id === id);

	// If did not find the project
	if (projectIndex < 0) {
		// return a error message and http error code
		return response.status(400).json({ error: 'Project not found' });
	}

	// Remove project from state
	state.splice(projectIndex, 1);

	return response.status(204).send();
});

// Needs to listen on a port
// app listening on localhost:3333
// second param is a function that is executed when the server is created
app.listen(3333, () => console.log('Server is running '));
