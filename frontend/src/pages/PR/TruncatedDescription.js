import React from "react";

const TruncatedDescription = ({ description, maxLength = 3 }) => {
	const words = description?.split(" ");
	const truncatedWords = words?.slice(0, maxLength);
	const isTruncated = words?.length > maxLength;

	const displayDescription = isTruncated ? (
		<>{truncatedWords?.join(" ")}...</>
	) : (
		description
	);

	return <p>Desc: {displayDescription}</p>;
};

export default TruncatedDescription;
