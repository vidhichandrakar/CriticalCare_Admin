import React, { useEffect, useState } from "react";
import PopupBatchForm from "../../CSSFile/Batch.css";
import Header from "../../Courses/Header";
import SideBar from "../../AdminDashboardMain/SideBar";
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, Typography, IconButton, Box, TextField, Menu, ListItemIcon, ListItemText, Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close"; import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import { getAllCourses } from "../../ActionFactory/apiActions";
import axios from "axios";

const Batch = () => {

    // API
    const [batchData, setBatchData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [batchIndex, setBatchIndex] = useState("");
    const [studentList, setStudentList] = useState([]);
    const [editedBatchName, setEditedBatchName] = useState("")
    const [editedBatchDescription, setEditedBatchDescription] = useState("")
    const [courseData, setCourseData] = useState([]);


    useEffect(() => {
        const fetchCourse = async () => {
            try {

                getAllCourses({
                    searchString: "",
                    callBack: (response) => {
                        setCourseData(response?.data);
                        setLoading(false);
                        // console.log(response?.data)
                    }, error: (error) => {
                        console.error("Error fetching course data:", error);
                        setLoading(false);
                    },
                })
            }
            catch (error) {
                console.error("Error fetching course data:", error);
                setLoading(false);
            }
        }
        fetchCourse();
    }, [])

    useEffect(() => {
        const fetchBatches = async () => {
            try {
                const response = await axios.get("https://app.360criticalcare.com/course/batch");
                const studentListRes = await axios.get("https://app.360criticalcare.com/student/studentlist")
                setStudentList(studentListRes.data);
                setBatchData(response.data);
                setLoading(false);
                console.log(response.data)
                // console.log(studentListRes.data)
            } catch (error) {
                console.error("Error fetching batch data:", error);
                setLoading(false);
            }
        };
        fetchBatches();
    }, []);

    const [isOpen, setIsOpen] = useState(false);
    const handleClick = () => {
        setIsOpen((prev) => !prev);
        setAddBatchName("");
        setAddBatchDescription("");
        setBatchMembers("");
        setCourse("");
    }

    const [batchMembers, setBatchMembers] = useState([]);
    const [course, setCourse] = useState("");

    const [editBatchMembers, setEditBatchMembers] = useState([]);
    const [editBatchMembersID, setEditBatchMembersID] = useState([]);
    const [editCourse, setEditCourse] = useState("");
    const [editCourseID, setEditCourseID] = useState("");
    const [addCourseID, setAddCourseID] = useState("");

    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const tableRef = React.useRef(null);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    React.useEffect(() => {
        if (tableRef.current) {
            tableRef.current.scrollTop = 0;
        }
    }, [rowsPerPage]);

    const handleChangeRowsPerPage = (event) => {
        // setRowsPerPage(parseInt(event.target.value, 10));
        const value = event.target.value === "All" ? batchData.length : parseInt(event.target.value, 10);
        setRowsPerPage(value);
        setPage(0);
    };


    const [menuAnchor, setMenuAnchor] = useState(null);

    const handleMenuOpen = (event, batchId) => {
        const originalIndex = batchData.findIndex(batch => batch.batch_id === batchId);
        setBatchIndex(originalIndex); // Store the original API index
        setMenuAnchor(event.currentTarget);
    };

    const handleMenuClose = () => {
        setMenuAnchor(null);

    };

    const batchDeleteHandle = async () => {
        try {
            const batchId = batchData[batchIndex]?.batch_id;
            if (!batchId) return;

            await axios.delete(`https://app.360criticalcare.com/course/batch/${batchId}`);
            const fetchResponse = await axios.get("https://app.360criticalcare.com/course/batch");
            setBatchData(fetchResponse.data);
            handleMenuClose();
        } catch (error) {
            console.error("Error deleting batch:", error);
        }
    };

    const [isOpenEdit, setIsOpenEdit] = useState(false);

    const handleEdit = () => {
        setIsOpenEdit((prev) => !prev);
        handleMenuClose();
        setEditedBatchName(batchData[batchIndex]?.batch_name);
        setEditedBatchDescription(batchData[batchIndex]?.batch_description);
        setEditCourse(batchData[batchIndex]?.course_name);
        setEditCourseID(batchData[batchIndex]?.course_id);
        setEditBatchMembers(batchData[batchIndex]?.students_list);
    };

    const [addBatchName, setAddBatchName] = useState("");
    const [addBatchDescription, setAddBatchDescription] = useState("");

    const handleInputNameChange = (event) => {
        setAddBatchName(event.target.value);
    };
    const handleInputDescriptionChange = (event) => {
        setAddBatchDescription(event.target.value);
    };

    const handleSelectBatchMember = (event) => {
        const selectedValues = event.target.value;
        setBatchMembers(Array.isArray(selectedValues) ? selectedValues : []);
        console.log("Selected Students:", selectedValues);
    };


    const handleSelectBatchCourse = (event) => {
        const selectedCourseName = event.target.value;
        setCourse(selectedCourseName);

        const selectedCourse = courseData.find(course => course.course_name === selectedCourseName);
        setAddCourseID(selectedCourse.course_id);
    };

    const addBatchHandle = async () => {
        // Validate input fields before making API call
        console.log(batchMembers)
        if (!addBatchName.trim() || !addBatchDescription.trim() || batchMembers.length === 0 || !addCourseID) {
            alert("Please fill in fields before adding a batch.");
            return;
        }

        try {
            const requestData = {
                batch_name: addBatchName,
                batch_description: addBatchDescription,
                student_id: batchMembers,
                course_id: addCourseID
            };
            console.log("Request Payload:", JSON.stringify(requestData, null, 2));

            const addRes = await axios.post("https://app.360criticalcare.com/course/batch", requestData, {
                headers: {
                    "Content-Type": "application/json"
                }
            });

            console.log("Batch added successfully:", addRes.data);

            // Fetch updated batch data after adding
            const fetchResponse = await axios.get("https://app.360criticalcare.com/course/batch");
            setBatchData(fetchResponse.data);
            console.log(fetchResponse.data);

            // Reset form fields after successful submission
            setAddBatchName("");
            setAddBatchDescription("");
            setBatchMembers([]);
            setAddCourseID([]);
            setCourse("");
            handleClick();
        } catch (error) {
            console.error("Request Setup Error:", error);
        }
    };

    //Update Batch name from APi

    useEffect(() => {
        if (batchIndex !== null && batchData[batchIndex]?.batch_name) {
            setEditedBatchName(batchData[batchIndex]?.batch_name);
        }
    }, [batchIndex, batchData]);

    const handleBatchNameChange = (event) => {
        setEditedBatchName(event.target.value);
    };

    useEffect(() => {
        if (batchIndex !== null && batchData[batchIndex]?.batch_description) {
            setEditedBatchDescription(batchData[batchIndex]?.batch_description);
        }
    }, [batchIndex, batchData]);

    const handleBatchDescriptionChange = (event) => {
        setEditedBatchDescription(event.target.value);
    };

    useEffect(() => {
        if (batchIndex !== null && batchData[batchIndex]?.course_name) {
            setEditCourse(batchData[batchIndex]?.course_name);
        }
    }, [batchIndex, batchData]);

    const handleEditSelectBatchCourse = (event) => {
        const editedValue = event.target.value;
        setEditCourse(editedValue);
        const selectedCourseID = courseData.find(course => course.course_name === editedValue);
        setEditCourseID(selectedCourseID.course_id);
        console.log(selectedCourseID.course_id);
    };

    useEffect(() => {
        if (batchIndex !== null && batchData[batchIndex]?.students_list) {
            setEditBatchMembers(batchData[batchIndex]?.students_list);
        }
    }, [batchIndex, batchData]);

    const handleEditSelectBatchMember = (event) => {
        const selectedIds = event.target.value || []; // Ensure it's an array
        const selectedStudents = studentList.filter(student => selectedIds.includes(student.student_id));
        setEditBatchMembers(selectedStudents);
        setEditBatchMembersID(() => selectedIds);
        console.log(selectedIds)
    };



    const handleSave = async () => {
        // Validate input fields before making API call
        if (!editedBatchName.trim() || !editedBatchDescription.trim() || !editBatchMembers.length || !editCourse) {
            alert("Please fill in fields before saving the batch.");
            return;
        }

        try {
            const requestData = {
                batch_name: editedBatchName,
                batch_description: editedBatchDescription,
                student_id: editBatchMembers.map(student => student.student_id),
                course_id: editCourseID
            };

            const editRes = await axios.put(
                `https://app.360criticalcare.com/course/batch/${batchData[batchIndex]?.batch_id}`,
                requestData,
                { headers: { "Content-Type": "application/json" } }
            );

            // Fetch updated batch data after editing
            const fetchResponse = await axios.get("https://app.360criticalcare.com/course/batch");
            setBatchData(fetchResponse.data);

            handleEdit();

            // Reset input fields after successful update
            setEditedBatchName(batchData[batchIndex]?.batch_name);
            setEditedBatchDescription(batchData[batchIndex]?.batch_description);
            setEditCourse(batchData[batchIndex]?.course_name);
            setEditBatchMembers(batchData[batchIndex]?.students_list);
            setEditCourseID("");

            console.log("Batch updated successfully:", editRes.data);
        } catch (error) {
            console.error("Error updating batch:", error);
        }
    };

    return (
        <div className="grid-container">
            <Header Heading={"Batch"} subHeading={"Only active batches are showm here"} />
            <SideBar />
            <div className="batch-container">
                <Button className="addBatchBtn" onClick={handleClick} >+ Add Batch</Button>

                <Dialog className="add-batch-dialog" open={isOpen} onClose={handleClick} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Add New Batch
                        <IconButton
                            aria-label="close"
                            onClick={handleClick}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="batch-input">
                        <Box display="flex" flexDirection="column" gap={2} className="batch-input-box">
                            <TextField label="Batch Name" variant="outlined" fullWidth value={addBatchName} onChange={handleInputNameChange} />
                            <TextField label="Description" variant="outlined" fullWidth multiline rows={3} value={addBatchDescription} onChange={handleInputDescriptionChange} />

                            <FormControl fullWidth>
                                <Select
                                    multiple
                                    value={batchMembers || []} // Ensure it's always an array
                                    onChange={handleSelectBatchMember}
                                    displayEmpty
                                    // renderValue={(selected) => (selected.length > 0 ? selected.join(", ") : "Select Batch Members")}
                                    renderValue={(selected) =>
                                        studentList
                                            .filter(student => selected.includes(student.student_id))
                                            .map(student => student.student_name)
                                            .join(", ") || "Select Batch Members"
                                    }
                                >
                                    {studentList.length > 0 ? (
                                        studentList.map((student) => (
                                            <MenuItem key={student.student_id} value={student.student_id}>
                                                <Checkbox checked={batchMembers.includes(student.student_id)} />
                                                <ListItemText primary={student.student_name} />
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No students available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <Select
                                    value={course}
                                    onChange={handleSelectBatchCourse}
                                    displayEmpty
                                >
                                    <MenuItem value="" disabled selected>
                                        Select Course
                                    </MenuItem>
                                    {courseData?.length > 0 ? (
                                        courseData.map((course) => (
                                            <MenuItem key={course.id} value={course.course_name}>
                                                {course.course_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No courses available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <Button variant="contained" color="primary" sx={{ alignSelf: "center", width: "100px" }} onClick={addBatchHandle}>
                                Add
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>

                <Dialog className="edit-batch-dialog" open={isOpenEdit} onClose={handleEdit} fullWidth maxWidth="sm">
                    <DialogTitle>
                        Edit Batch
                        <IconButton
                            aria-label="close"
                            onClick={handleEdit}
                            sx={{
                                position: "absolute",
                                right: 8,
                                top: 8,
                                color: (theme) => theme.palette.grey[500],
                            }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </DialogTitle>
                    <DialogContent className="batch-input">
                        <Box display="flex" flexDirection="column" gap={2} className="batch-input-box">

                            <TextField label="Batch Name" variant="outlined" fullWidth value={loading ? "Loading..." : editedBatchName} disabled={loading} onChange={handleBatchNameChange} />
                            <TextField label="Description" variant="outlined" fullWidth multiline rows={3} value={loading ? "Loading..." : editedBatchDescription} disabled={loading} onChange={handleBatchDescriptionChange} />

                            <FormControl fullWidth>
                                <Select
                                    multiple
                                    value={Array.isArray(editBatchMembers) ? editBatchMembers.map(student => student.student_id) : []}
                                    onChange={handleEditSelectBatchMember}
                                    displayEmpty
                                    renderValue={(selected) =>
                                        studentList
                                            .filter(student => selected.includes(student.student_id))
                                            .map(student => student.student_name)
                                            .join(", ") || "Select Batch Members"
                                    }
                                >
                                    {studentList?.length > 0 ? (
                                        studentList.map((student) => (
                                            <MenuItem key={student.student_id} value={student.student_id}>
                                                <Checkbox checked={editBatchMembers.some(s => s.student_id === student.student_id)} />
                                                <ListItemText primary={student.student_name} />
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No students available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>

                            <FormControl fullWidth>
                                <Select
                                    value={editCourse || ""}
                                    onChange={handleEditSelectBatchCourse}
                                    displayEmpty
                                >
                                    {editCourse ? null : (
                                        <MenuItem value="" disabled>
                                            Select Course
                                        </MenuItem>
                                    )}

                                    {/* Render batch options */}
                                    {courseData?.length > 0 ? (
                                        courseData.map((batch) => (
                                            <MenuItem key={batch?.id} value={batch?.course_name}>
                                                {batch?.course_name}
                                            </MenuItem>
                                        ))
                                    ) : (
                                        <MenuItem disabled>No courses available</MenuItem>
                                    )}
                                </Select>
                            </FormControl>


                            <Button variant="contained" color="primary" sx={{ alignSelf: "center", width: "100px" }} onClick={handleSave}>
                                Save
                            </Button>
                        </Box>
                    </DialogContent>
                </Dialog>

                <div className="batch-table">
                    <TableContainer ref={tableRef} component={Paper} sx={{
                        minHeight: loading ? "auto" : 470,
                        maxHeight: loading ? "auto" : rowsPerPage > 5 ? 500 : "none",
                        overflowY: loading ? "hidden" : "auto"
                    }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ width: "10%", textAlign: "center" }}><b>Batch ID</b></TableCell>
                                    <TableCell sx={{ width: "40%", textAlign: "center" }}><b>Batch Name</b></TableCell>
                                    <TableCell sx={{ width: "40%", textAlign: "center" }}><b>Course Name</b></TableCell>
                                    <TableCell sx={{ backgroundColor: "#fff", zIndex: 100, position: "sticky", top: 0, textAlign: "center", width: "10%" }}><b>Action</b></TableCell>
                                    {/* <TableCell></TableCell> */}
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {/* {batchData.map((batch, index) => ( */}
                                {batchData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((batch, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }} value={batch.batch_id}>{batch.batch_id}</TableCell>
                                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }} value={batch.batch_name}>{loading ? "Loading..." : batch.batch_name}</TableCell>
                                        <TableCell sx={{ borderBottom: "none", textAlign: "center" }} value={batch.course_name}>{batch.course_name}</TableCell>
                                        <TableCell>
                                            <IconButton onClick={(event) => handleMenuOpen(event, batch.batch_id)}>
                                                <MoreVertIcon sx={{ textAlign: "center" }} />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))}

                            </TableBody>
                        </Table>

                        {/* Dropdown Menu for Actions */}

                        <Menu
                            anchorEl={menuAnchor}
                            open={Boolean(menuAnchor)}
                            onClose={handleMenuClose}
                            className="three-dot"
                        >
                            <MenuItem onClick={batchDeleteHandle}>
                                <ListItemIcon><DeleteIcon sx={{ color: "red" }} /></ListItemIcon>
                                <ListItemText primary="Delete" sx={{ color: "red" }} />
                            </MenuItem>
                            <MenuItem onClick={handleEdit}>
                                <ListItemIcon><EditIcon sx={{ color: "blue" }} /></ListItemIcon>
                                <ListItemText primary="Edit" sx={{ color: "blue" }} />
                            </MenuItem>
                        </Menu>

                        {!loading && (
                            <TablePagination
                                className={`custom-pagination ${rowsPerPage === 5 ? "fixed-bottom-right" : "scroll-with-table"}`}
                                rowsPerPageOptions={[5, 10, 25, "All"]}
                                component="div"
                                count={batchData.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                                SelectProps={{
                                    renderValue: (selected) => (selected === batchData.length ? "All" : selected),
                                }}
                            />
                        )}

                    </TableContainer>
                </div>
            </div>
        </div >
    );
};

export default Batch;