import React from "react";
import {
	Table,
	TableBody,
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Paper,
	IconButton,
	TablePagination,
	Card,
	CardContent,
} from "@mui/material";
import { Edit as EditIcon, Delete as DeleteIcon } from "@mui/icons-material";

const ReusableTable = ({
	columns,
	data,
	onEdit,
	onDelete,
	count,
	page,
	rowsPerPage,
	onPageChange,
	onRowsPerPageChange,
	showActions = true,
}) => {
	return (
		<Card>
			<TableContainer>
				<Table>
					<TableHead>
						<TableRow>
							{columns.map((column) => (
								<TableCell
									key={column.id}
									align={column.align || "left"}
									style={{ minWidth: column.minWidth }}>
									{column.label}
								</TableCell>
							))}
							{showActions && <TableCell align='right'>Actions</TableCell>}
						</TableRow>
					</TableHead>
					<TableBody>
						{data.map((row) => (
							<TableRow
								hover
								role='checkbox'
								tabIndex={-1}
								key={row.id}>
								{columns.map((column) => {
									const value = row[column.id];
									return (
										<TableCell
											key={column.id}
											align={column.align}>
											{value}
										</TableCell>
									);
								})}
								{showActions && (
									<TableCell align='right'>
										{onEdit && (
											<IconButton
												size='small'
												onClick={() => onEdit(row)}>
												<EditIcon fontSize='small' />
											</IconButton>
										)}
										{onDelete && (
											<IconButton
												size='small'
												color='error'
												onClick={() => onDelete(row.id)}>
												<DeleteIcon fontSize='small' />
											</IconButton>
										)}
									</TableCell>
								)}
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<TablePagination
				rowsPerPageOptions={[5, 10, 25]}
				component='div'
				count={count}
				rowsPerPage={rowsPerPage}
				page={page}
				onPageChange={onPageChange}
				onRowsPerPageChange={onRowsPerPageChange}
			/>
		</Card>
	);
};

export default ReusableTable;
