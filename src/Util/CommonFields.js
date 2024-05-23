import { Button, MenuItem, Select, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

export const commonTextField = (
  { className, inputClassName, labels},
  Option = {
    sx: {},
    handleInput: () => {},
    value: "",
    type: "",
    inputType: "",
  }
) => {
  const { sx, handleInput, type, value, inputType } = Option;
  return (
    <TextField
      inputProps={{
        className: inputClassName,
        inputMode: "numeric",
        pattern: "[0-9]*",
      }}
      fullWidth
      size="small"
      placeholder={labels}
      id="fullWidth"
      sx={sx}
      className={className}
      value={value}
      onChange={(event) => {
        handleInput(event.target.value, type);
      }}
      type={inputType}
    />
  );
};
export const capitalizeFirstLetter = (name) => {
  return name?.charAt(0).toUpperCase() + name?.slice(1);
};
export const commonSelect = (
  { placeholder, menuItemList, className },
  Option = { handleInput: () => {}, categoryValue: {}, type: "" }
) => {
  const { handleInput, categoryValue, type } = Option;
  return (
    <Select
      displayEmpty
      size="small"
      renderValue={() => {
        return (
          <em className={className}>
            {categoryValue ? categoryValue.label : placeholder}
          </em>
        );
      }}
      inputProps={{ "aria-label": "Without label" }}
      value={categoryValue?.label}
      onChange={(event) => handleInput(event.target.value, type)}
    >
      {menuItemList.map((menu) => (
        <MenuItem value={menu}>{menu.label}</MenuItem>
      ))}
    </Select>
  );
};

export const CommonTypography = (
  { fontWeight, sx, label },
  Option = { className: "" }
) => {
  const { className } = Option;
  return (
    <Typography fontWeight={fontWeight} sx={sx} className={className}>
      {label}
    </Typography>
  );
};

export const commonButton = ({ handleTrackerPage, className, label }) => {
  return (
    <Button
      variant="contained"
      className={className}
      onClick={handleTrackerPage}
    >
      {label}
    </Button>
  );
};

export const DailogBox = ({
  isOpen,
  handleConfirmDelete,
  handleDeleteClick,
  handleCancelDelete,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={handleCancelDelete}
      PaperProps={{
        component: "form",
        onSubmit: (event) => {
          event.preventDefault();
          const formData = new FormData(event.currentTarget);
          const formJson = Object.fromEntries(formData.entries());
          const email = formJson.email;
          handleCancelDelete();
        },
      }}
      className="configurationDialog"
    >
      <DialogTitle style={{ display: "flex", flexDirection: "row" }}>
        <Typography style={{ width: "100%", fontSize: "1.3rem" }}>
          Confirm Delete
        </Typography>{" "}
        <CloseIcon
          className="closeHover"
          onClick={() => handleCancelDelete()}
        />
      </DialogTitle>

      <DialogContent>
        <Typography style={{ width: "100%", fontSize: "1.3rem" }}>
          Are you sure you want to delete?
        </Typography>{" "}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleConfirmDelete} variant="outlined">
          Yes
        </Button>
        <Button onClick={handleCancelDelete} variant="outlined">
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};
