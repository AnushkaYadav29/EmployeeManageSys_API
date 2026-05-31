let employees = [
    {
        id: 1,
        name: "Rahul Sharma",
        email: "rahul@gmail.com",
        address: "Pune",
        contactNumber: "9876543210",
        dateOfBirth: "1998-05-12",
        joiningDate: "2024-01-15",
        department: "IT"
    },
    {
        id: 2,
        name: "Priya Patil",
        email: "priya@gmail.com",
        address: "Mumbai",
        contactNumber: "9999999999",
        dateOfBirth: "1997-08-20",
        joiningDate: "2024-03-10",
        department: "HR"
    }
];

// GET ALL EMPLOYEES
const getEmployees = (req, res) => {
    res.json(employees);
};

// CREATE EMPLOYEE
const createEmployee = (req, res) => {
    const employee = req.body;
    employees.push(employee);
    res.json({ message: "Employee Added", data: employee });
};

// UPDATE EMPLOYEE
const updateEmployee = (req, res) => {
    const id = Number(req.params.id);
    const index = employees.findIndex((e) => e.id === id);
    
    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    employees[index] = req.body;
    res.json({ message: "Employee Updated", data: employees[index] });
};

// DELETE EMPLOYEE
const deleteEmployee = (req, res) => {
    const id = Number(req.params.id);
    employees = employees.filter((e) => e.id !== id);
    res.json({ message: "Employee Deleted" });
};

// GET EMPLOYEE BY ID
const getEmployeeById = (req, res) => {
    const id = Number(req.params.id);
    const employee = employees.find((e) => e.id === id);
    
    if (!employee) {
        return res.status(404).json({ message: "Employee not found" });
    }
    res.json(employee);
};

// GET DEPARTMENT WISE EMPLOYEE
const getDepartmentWiseEmployee = (req, res) => {
    const department = req.query.department;
    if (!department) return res.status(400).json({ message: "Department query parameter required" });

    const result = employees.filter(
        (e) => e.department.toLowerCase() === department.toLowerCase()
    );
    res.json(result);
};

// GET JOINING MONTH WISE EMPLOYEE
const getJoiningMonthWiseEmployee = (req, res) => {
    const month = req.query.month;
    if (!month) return res.status(400).json({ message: "Month query parameter required" });

    const result = employees.filter((e) => {
        const joiningMonth = new Date(e.joiningDate).getMonth() + 1;
        return joiningMonth == month;
    });
    res.json(result);
};

// GET THIS MONTH BIRTHDAY EMPLOYEE
const getThisMonthBirthdayEmployee = (req, res) => {
    const currentMonth = new Date().getMonth() + 1;
    const result = employees.filter((e) => {
        const birthMonth = new Date(e.dateOfBirth).getMonth() + 1;
        return birthMonth === currentMonth;
    });
    res.json(result);
};

// TASK 1: SEARCH EMPLOYEE BY NAME
const searchEmployeeByName = (req, res) => {
    const name = req.query.name;
    if (!name) return res.status(400).json({ message: "Name query parameter required" });

    const result = employees.filter((e) => 
        e.name.toLowerCase().includes(name.toLowerCase())
    );
    res.json(result);
};

// TASK 2: GET EMPLOYEES CITY WISE
const getEmployeesByCity = (req, res) => {
    const city = req.query.city;
    if (!city) return res.status(400).json({ message: "City query parameter required" });

    const result = employees.filter((e) => 
        e.address.toLowerCase() === city.toLowerCase()
    );
    res.json(result);
};

// TASK 3: SORT EMPLOYEES BY JOINING DATE
const sortEmployeesByJoiningDate = (req, res) => {
    const sorted = employees.slice().sort((a, b) => 
        new Date(a.joiningDate) - new Date(b.joiningDate)
    );
    res.json(sorted);
};

// TASK 4: SORT EMPLOYEES BY NAME (A-Z)
const sortEmployeesByName = (req, res) => {
    const sorted = employees.slice().sort((a, b) => 
        a.name.localeCompare(b.name)
    );
    res.json(sorted);
};

// TASK 5: GET TOTAL EMPLOYEE COUNT
const getTotalEmployeeCount = (req, res) => {
    res.json({ totalEmployees: employees.length });
};

// TASK 6: GET TOTAL EMPLOYEES DEPARTMENT WISE
const getDepartmentWiseCount = (req, res) => {
    const counts = {};
    employees.forEach((e) => {
        const dept = e.department || "Unknown";
        counts[dept] = (counts[dept] || 0) + 1;
    });
    res.json(counts);
};

// TASK 7: GET OLDEST EMPLOYEE (By Date of Birth)
const getOldestEmployee = (req, res) => {
    if (employees.length === 0) return res.json({});
    const oldest = employees.reduce((oldestE, currentE) => 
        new Date(currentE.dateOfBirth) < new Date(oldestE.dateOfBirth) ? currentE : oldestE
    );
    res.json(oldest);
};

// TASK 8: GET NEWEST JOINED EMPLOYEE
const getNewestJoinedEmployee = (req, res) => {
    if (employees.length === 0) return res.json({});
    const newest = employees.reduce((newestE, currentE) => 
        new Date(currentE.joiningDate) > new Date(newestE.joiningDate) ? currentE : newestE
    );
    res.json(newest);
};

// TASK 9: FILTER EMPLOYEES BETWEEN TWO JOINING DATES
const filterEmployeesByDateRange = (req, res) => {
    const { start, end } = req.query;
    if (!start || !end) return res.status(400).json({ message: "Start and End query parameters required" });

    const startDate = new Date(start);
    const endDate = new Date(end);

    const result = employees.filter((e) => {
        const joinDate = new Date(e.joiningDate);
        return joinDate >= startDate && joinDate <= endDate;
    });
    res.json(result);
};

// TASK 10: UPDATE ALL DETAILS DYNAMICALLY
const updateAllDetails = (req, res) => {
    const id = Number(req.params.id);
    const index = employees.findIndex((e) => e.id === id);

    if (index === -1) {
        return res.status(404).json({ message: "Employee not found" });
    }

    employees[index] = { ...employees[index], ...req.body };
    res.json({ message: "Employee details fully updated", data: employees[index] });
};

module.exports = {
    getEmployees,
    createEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployeeById,
    getDepartmentWiseEmployee,
    getJoiningMonthWiseEmployee,
    getThisMonthBirthdayEmployee,
    searchEmployeeByName,
    getEmployeesByCity,
    sortEmployeesByJoiningDate,
    sortEmployeesByName,
    getTotalEmployeeCount,
    getDepartmentWiseCount,
    getOldestEmployee,
    getNewestJoinedEmployee,
    filterEmployeesByDateRange,
    updateAllDetails
};
