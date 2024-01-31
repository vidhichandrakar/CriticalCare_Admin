import * as Yup from "yup";

export const commmonNameDescriptionSchema = Yup.object().shape({
  courseDescription: Yup.string().required("Course Description is required"),
  courseName: Yup.string()
    .min(4, "Name should have atleast 4 leters")
    .required("CourseName  is required"),
  fileUploadType: Yup.mixed().required("Please select a file"),
  // regularPrice:
  regularPrice: Yup.number().required("Regular Price is required"),
  offerPrice: Yup.number()
    .required("Offer price is required")
    .test(
      "is-greater",
      "Offer Price value must be smaller than regular value",
      function (value) {
        const regularPrice = this.resolve(Yup.ref("regularPrice"));
        return value < regularPrice;
      }
    ),
});

// path dashboad coueses
//  name me  4 words  chhaiye
// catgory imp hai

// Edit price me  regualr price hamehsa jida hone chaiye offer prixze ke hisab se
//course me manage coupem
