import { Request, Response } from 'express';
import createUser from './services/createUse';

export function helloWorld(request: Request, response: Response) {
	const user = createUser({
		name: 'Michelly',
		email: 'rgrg@grgr',
		password: '12345',
		techs: ['Node', 'React', { title: 'JS', experience: 100 }],
	});

	return response.json({ message: 'Hello World' });
}
