import React, { useState, useEffect } from 'react';
import {
	SafeAreaView,
	FlatList,
	Text,
	StyleSheet,
	StatusBar,
	TouchableOpacity,
} from 'react-native';

import api from './services/api';

export default function App() {
	const [projects, setProjects] = useState([]);

	useEffect(() => {
		api.get('projects').then((response) => {
			setProjects(response.data);
		});
	}, []);

	async function handleAddProject() {
		// Post returns the newly created object
		const response = await api.post('projects', {
			title: `New project ${Date.now()}`,
			owner: 'Michelly',
		});

		const project = response.data;

		setProjects([...projects, project]);
	}

	return (
		<>
			<StatusBar barStyle='light-content' backgroundColor='#7159c1' />

			<SafeAreaView style={styles.container}>
				{/* data = variable that stores the data for the list, must be array
                keyExtractor = function returns the unique identifier of the item
                renderItem = function to render the items
            */}
				<FlatList
					data={projects}
					keyExtractor={(project) => project.id}
					renderItem={({ item: project }) => (
						<Text style={styles.project} key={project.id}>
							{project.title}
						</Text>
					)}
				/>

				<TouchableOpacity
					onPress={handleAddProject}
					activeOpacity={0.6}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Add new project</Text>
				</TouchableOpacity>
			</SafeAreaView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		backgroundColor: '#7159c1',
		flex: 1,
	},

	project: {
		color: '#FFF',
		fontSize: 20,
	},

	button: {
		backgroundColor: '#FFF',
		margin: 20,
		height: 50,
		borderRadius: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},

	buttonText: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});
