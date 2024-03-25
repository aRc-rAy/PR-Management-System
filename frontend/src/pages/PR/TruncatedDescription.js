import React from "react";

const TruncatedDescription = ({ description, maxLength = 3 }) => {
	const words = description?.split(" "); // Split into words
	const truncatedWords = words?.slice(0, maxLength); // Truncate if needed
	const isTruncated = words?.length > maxLength; // Check if truncated

	const displayDescription = isTruncated ? (
		<>{truncatedWords?.join(" ")}...</>
	) : (
		description
	);

	return <p>Desc: {displayDescription}</p>;
};

export default TruncatedDescription;
