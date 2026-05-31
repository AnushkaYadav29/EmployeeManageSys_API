const express = require("express");
const router = express.Router(); 

const {
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
} = require("../controllers/employeeController"); 
// Base operations
router.get("/", getEmployees);
router.post("/", createEmployee);

// Specific filter and utility paths (Placed above /:id routes)
router.get("/joining/month", getJoiningMonthWiseEmployee);
router.get("/search", searchEmployeeByName);
router.get("/address/search", getEmployeesByCity);
router.get("/sort/joining", sortEmployeesByJoiningDate);
router.get("/sort/name", sortEmployeesByName);
router.get("/count/total", getTotalEmployeeCount);
router.get("/count/department", getDepartmentWiseCount);
router.get("/profile/oldest", getOldestEmployee);
router.get("/profile/newest", getNewestJoinedEmployee);
router.get("/filter", filterEmployeesByDateRange);

// ID Specific operations
router.get("/:id", getEmployeeById);
router.patch("/:id", updateEmployee);
router.delete("/:id", deleteEmployee);
router.put("/update-all/:id", updateAllDetails);

module.exports = router;
