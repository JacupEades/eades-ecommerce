import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SearchOutlined } from "@ant-design/icons";

const Search = () => {
	const dispatch = useDispatch();
	const { search } = useSelector((state) => ({ ...state }));
	const { text } = search;

	const history = useHistory();

	const handleChange = (e) => {
		dispatch({
			type: "SEARCH_QUERY",
			payload: { text: e.target.value },
		});
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		history.push(`/shop?${text}`);
	};

	return (
		<form className="my-2 my-lg-2" onSubmit={handleSubmit}>
			<div className="row">
				<input
					onChange={handleChange}
					type="search"
					value={text}
					className="form-control col"
					placeholder="search"
				/>
				<SearchOutlined
					onClick={handleSubmit}
					style={{ cursor: "pointer" }}
					className="col-sm-2 d-flex align-items-center"
				/>
			</div>
		</form>
	);
};

export default Search;
