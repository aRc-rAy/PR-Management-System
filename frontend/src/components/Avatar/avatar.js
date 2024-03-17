import React from "react";

const ProfilePicture = ({ username }) => {
	let imageUrl = "";
	let altText = "test";
	const firstLetter = username ? username[0].toUpperCase() : "";
	return (
		<div
			style={{
				width: "40px",
				height: "40px",
				borderRadius: "50%",
				backgroundColor: "#ccc",
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				fontSize: "20px",
				color: "Red",
			}}
		>
			{imageUrl ? (
				<img
					src={imageUrl}
					alt={altText}
					style={{ width: "100%", height: "100%", borderRadius: "50%" }}
				/>
			) : (
				<span>{firstLetter}</span>
			)}
		</div>
	);
};

export default ProfilePicture;
