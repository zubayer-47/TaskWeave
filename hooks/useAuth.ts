import app from '@/lib/firebase/config';
import {
	createUserWithEmailAndPassword,
	getAuth,
	signInWithEmailAndPassword,
} from 'firebase/auth';

const auth = getAuth(app);

export default function useAuth() {
	const signup = async (
		email: FormDataEntryValue,
		password: FormDataEntryValue
	) => {
		let result, error;

		try {
			result = await createUserWithEmailAndPassword(
				auth,
				email as string,
				password as string
			);
		} catch (err) {
			error = err;
		}

		return { result, error };
	};

	// sign in method with email and password through firebase
	const signin = async (
		email: FormDataEntryValue,
		password: FormDataEntryValue
	) => {
		let result, error;

		console.log({ auth });

		try {
			result = await signInWithEmailAndPassword(
				auth,
				email as string,
				password as string
			);
		} catch (err) {
			error = err;
		}

		return { result, error };
	};

	return { signin, signup };
}
