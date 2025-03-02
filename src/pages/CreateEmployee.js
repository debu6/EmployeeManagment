import { Row, Col } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { addEmployee } from "../slices/employeeSlice";
import { useDispatch } from "react-redux";
import MainContainer from "../components/MainContainer";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import emailjs from "emailjs-com";

const schema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  email: z.string().email("Email is Invalid"),
  phone: z.string()
    .min(10, "Phone number must be at least 10 digits")
    .max(15, "Phone number must be at most 15 digits")
    .regex(/^\d+$/, "Phone number must contain only digits"),
  role: z.enum(["Developer", "Designer", "Manager"], {
    errorMap: () => ({ message: "Role is required" }),
  }),
  joiningDate: z.string()
    .refine((date) => {
      const selectedDate = new Date(date);
      const today = new Date();
      return selectedDate <= today;
    }, "Joining date must be in the past or today"),
})


export default function CreateEmployee() {
  const dispatch = useDispatch()
  const navigate=useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async(data) => {
    const templateParams = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: data.role,
      joiningDate: data.joiningDate,
    };

    try {
      await emailjs.send(
        process.env.REACT_APP_SERVICE_ID,  
        process.env.REACT_APP_TEMPLATE_ID,
        templateParams,
        process.env.REACT_APP_PUBLIC_KEY,
      );

      console.log("email sent successfully")
      toast.success("email sent successfully");
     
    } catch (error) {
      toast.error("Failed to send email.");
      console.log("Failed to send email.",error)
    }

    dispatch(addEmployee(data))
    reset()
    toast("Employee created successfully")
    navigate('/')
  };

  return (
    <MainContainer>
      <form onSubmit={handleSubmit(onSubmit)} >
        <div className="d-flex justify-content-between mb-3">
          <h2>Create Employee</h2>
          <Link to="/"><button className="btn btn-outline-secondary"><IoIosArrowBack className="mb-1"/>Back</button></Link>
        </div>
        <Row>
          <Col md={6} sm={12}>
            <div className="mb-3">
              <label className="form-label">Name:</label>
              <input
                {...register("name")}
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                placeholder="Enter your name"
              />
              {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="mb-3">
              <label className="form-label">Email:</label>
              <input
                {...register("email")}
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                placeholder="Enter email"
              />
              {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
            </div>
          </Col>

          <Col md={6} sm={12}>
            <div className="mb-3">
              <label className="form-label">Phone:</label>
              <input
                {...register("phone")}
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                placeholder="Enter phone number"
              />
              {errors.phone && <div className="invalid-feedback">{errors.phone.message}</div>}
            </div>
          </Col>
          <Col md={6} sm={12}>
            <div className="mb-3">
              <label className="form-label">Role:</label>
              <select {...register("role")} className={`form-control ${errors.role ? "is-invalid" : ""}`}>
                <option value="">Select Role</option>
                <option value="Developer">Developer</option>
                <option value="Designer">Designer</option>
                <option value="Manager">Manager</option>
              </select>
              {errors.role && <div className="invalid-feedback">{errors.role.message}</div>}
            </div>
          </Col>

          <Col md={6} sm={12}>
            <div className="mb-3">
              <label className="form-label">Joining Date:</label>
              <input type="date" {...register("joiningDate")} className={`form-control ${errors.joiningDate ? "is-invalid" : ""}`} onClick={(e) => e.target.showPicker && e.target.showPicker()}/>
              {errors.joiningDate && <div className="invalid-feedback">{errors.joiningDate.message}</div>}
            </div>
          </Col>
          <Col md={6} sm={12}>
          </Col>
        </Row>

        <Row>
          <Col>
          </Col>
          <Col md={6} sm={12}>
            <button type="submit" className="btn btn-success w-100 mt-5">
              Submit
            </button>
          </Col>
          <Col>
          </Col>
        </Row>


      </form>
    </MainContainer>
  );
}
