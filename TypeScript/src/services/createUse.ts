interface TechObj {
	title: string;
	experience: number;
}

interface CreateUserData {
	// prop? isn't required
	name?: string;
	email: string;
	password: string;
	techs: Array<string | TechObj>;
}

export default function createUser({
	name = '',
	email,
	password,
}: CreateUserData) {
	const user = {
		name,
		email,
		password,
	};

	return user;
}
