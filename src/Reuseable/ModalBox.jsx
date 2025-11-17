import React, { useState, useEffect } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";

const modalStyle = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "background.paper",
	boxShadow: 24,
	p: 4,
	display: "flex",
	flexDirection: "column",
	gap: 2,
};

/**
 * A modal for editing homework details.
 *  props The component props.
 *  props.open Controls if the modal is open.
 *  props.onClose Function to call when the modal should close.
 *  props.item The data object to edit.
 *  props.onSave Function to call with the updated data.
 *  props.title The title for the modal.
 */
const ModalBox = ({ open, onClose, item, onSave, title }) => {
	const [editedItem, setEditedItem] = useState(null);
	const [errors, setErrors] = useState({});

	// When the `item` prop changes (i.e., a new item is selected),
	// update the modal's internal state.
	useEffect(() => {
		if (item) {
			setEditedItem(item);
			// Clear errors when a new item is loaded
			setErrors({});
		}
	}, [item]);

	if (!editedItem) {
		return null; // Don't render the modal if there's no data
	}

	const validate = (fieldValues = editedItem) => {
		let tempErrors = {};
		// Basic validation for required fields
		Object.keys(fieldValues).forEach((key) => {
			if (key !== "id" && !fieldValues[key]) {
				tempErrors[key] = "This field is required.";
			}
		});

		setErrors(tempErrors);
		return Object.keys(tempErrors).length === 0;
	};

	const handleChange = (e) => {
		const { name, value } = e.target;
		const newValues = { ...editedItem, [name]: value };
		setEditedItem(newValues);
		validate(newValues);
	};

	return (
		<Modal
			open={open}
			onClose={onClose}>
			<Box sx={modalStyle}>
				<Typography
					variant='h6'
					component='h2'>
					{title || "Edit Item"}
				</Typography>
				{Object.entries(editedItem).map(([key, value]) =>
					key !== "id" ? ( // Make ID non-editable
						<TextField
							key={key}
							name={key}
							label={
								key.charAt(0).toUpperCase() +
								key.slice(1).replace(/([A-Z])/g, " $1")
							}
							value={value}
							error={!!errors[key]}
							helperText={errors[key]}
							onChange={handleChange}
							fullWidth
						/>
					) : null
				)}
				<Box
					sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
					<Button onClick={onClose}>Cancel</Button>
					<Button
						onClick={() => {
							if (validate()) {
								onSave(editedItem);
							}
						}}
						variant='contained'>
						{/* The button is not disabled to allow showing errors on click */}
						Save Changes
					</Button>
				</Box>
			</Box>
		</Modal>
	);
};

export default ModalBox;
