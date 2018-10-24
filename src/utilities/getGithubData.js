import { token } from './token';

export default (githubHandle) => {
	return fetch(`https://api.github.com/users/${githubHandle}?access_token=${token}`)
		.then(res => res.json());
};
