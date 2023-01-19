import React from "react";

const LocalSearch = ({ keyword, setKeyword }) => {
	// step 3
	const handleSearchChange = (e) => {
		e.preventDefault();
		setKeyword(e.target.value.toLowerCase());
	};

	return (
		// step 2 the input field
		<input
			type="search"
			placeholder="Filter categories"
			value={keyword}
			onChange={handleSearchChange}
			className="form-control mt-4 mb-4"
		/>
	);
};

export default LocalSearch;
