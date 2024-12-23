 {/* <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogImg}
        aria-labelledby="customized-dialog-title"
        open={imgopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogImg}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Box className="VideoBox">
            <UploadFileRoundedIcon className="VideoIcon" />

            <Box className="videoDottedBorder">
              <Typography gutterBottom className="UploadDoc">
                <b> Upload Image(s)</b>
              </Typography>
              <Typography className="VideoPara">
                You can upload upto 20 files at a time. Maximum file size that
                can be attached is 4 MB.
              </Typography>

              <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                <input {...getIntroVideoInputProps()} />
                <Box className="thumbnailUpload buttonBOx">
                  <Button
                    variant="contained"
                    className="SelectButton"
                    // onClick={handleCreateTeam}
                  >
                    Select File(s)
                  </Button>
                  <Typography
                    sx={{ marginTop: "3%" }}
                    className="fontRecommend"
                  >
                    Recommended Image size :{" "}
                    <b>800px x 600px, PNG or JPEG file</b>
                  </Typography>
                  <LoaderComponent loaderState={loaderState} />
                  {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                  {imgUpload != "" && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                </Box>
              </div>
            </Box>

            <Box sx={{ marginTop: "12px" }}>Or</Box>
            <CommonAddLinkField onAddLink={onAddLink} />
          </Box>
        </DialogContent>
      </BootstrapDialog> */}
      {/* <BootstrapDialog
        className="PopUP"
        onClose={handleCloseDialogZip}
        aria-labelledby="customized-dialog-title"
        open={zipopened}
      >
        <DialogTitle
          sx={{ m: 0, p: 2, fontSize: "1rem" }}
          id="customized-dialog-title"
        ></DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleCloseDialogZip}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent>
          <Box className="VideoBox">
            <UploadFileRoundedIcon className="VideoIcon" />
            <Box className="videoDottedBorder">
              <Typography gutterBottom className="UploadDoc">
                <b> Upload Zip File(s)</b>
              </Typography>
              <Typography className="VideoPara">
                You can upload upto 20 files at a time. Maximum file size that
                can be attached is 40 MB.
              </Typography>

              <div {...getIntroVideoRootProps({ className: "dropzone" })}>
                <input {...getIntroVideoInputProps()} />
                <Box className="thumbnailUpload buttonBOx">
                  <Button
                    variant="contained"
                    className="SelectButton"
                    // onClick={handleCreateTeam}
                  >
                    Select File(s)
                  </Button>
                  <Typography
                    sx={{ marginTop: "3%" }}
                    className="fontRecommend"
                  >
                    Recommended Image size :{" "}
                    <b>800px x 600px, PNG or JPEG file</b>
                  </Typography>
                  <LoaderComponent loaderState={loaderState} />
                  {imgUpload === "" && storedBasicInfo?.thumbnailPath && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                  {imgUpload != "" && (
                    <img
                      src={storedBasicInfo?.thumbnailPath}
                      width={140}
                      height={"auto"}
                    />
                  )}
                </Box>
              </div>
            </Box>

            <Box sx={{ marginTop: "12px" }}>Or</Box>
            <CommonAddLinkField onAddLink={onAddLink} />
          </Box>
        </DialogContent>
      </BootstrapDialog> */}
