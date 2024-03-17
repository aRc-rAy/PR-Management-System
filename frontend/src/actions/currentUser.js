export const setCurrentUser = (user) => {
	return {
		type: "AUTH",
		data: user,
	};
};
