import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import EmployeeModel from './models/Employee.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://localhost:27017/employee", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.post("/SignUp", async (req, res) => {
    try {
        const employee = await EmployeeModel.create(req.body);
        res.json({ message: "success", employee });
    } catch (err) {
        console.error("Error creating employee:", err);
        res.status(400).json({ message: "Failed to create employee", error: err });
    }
});



app.post("/SignIn", async (req, res) => {
    const { email, password } = req.body;

    try {
        const employee = await EmployeeModel.findOne({ email });
        if (!employee) {
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = password === employee.password; // No hashing comparison
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        res.json({ message: "success", employee });
    } catch (err) {
        res.status(500).json(err);
    }
});

app.get('/employee/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const employee = await EmployeeModel.findById(id);
        if (!employee) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json({ employee });
    } catch (err) {
        res.status(500).json({ message: 'Error fetching employee', error: err });
    }
});

app.listen(3001, () => {
    console.log("Server running on port 3001");
});
