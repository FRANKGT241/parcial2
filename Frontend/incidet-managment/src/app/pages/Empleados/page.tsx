'use client';

import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import { AlertCircle, Mail, Phone, Calendar, Briefcase, Building, DollarSign } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";

interface Employee {
  employee_id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone_number: string;
  hire_date: string;
  job_title: string;
  department: string;
  salary: number;
  is_active: boolean;
}

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isUpdateDialogOpen, setIsUpdateDialogOpen] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState<Employee | null>(null);

  const fetchEmployees = async () => {
    try {
      const response = await fetch("http://localhost:3001/api/employees");
      if (!response.ok) {
        throw new Error(`Error: ${response.status} ${response.statusText}`);
      }
      const data: Employee[] = await response.json();
      setEmployees(data);
      setLoading(false);
    } catch (error: unknown) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("Unable to load employees");
      }
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleCreateEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const employeeData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch("http://localhost:3001/api/employee", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to create employee");
      }

      setIsCreateDialogOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error creating employee:", error);
      setError("Failed to create employee");
    }
  };

  const handleUpdateEmployee = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!currentEmployee) return;

    const formData = new FormData(event.currentTarget);
    const employeeData = Object.fromEntries(formData.entries());

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${currentEmployee.employee_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(employeeData),
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      setIsUpdateDialogOpen(false);
      fetchEmployees();
    } catch (error) {
      console.error("Error updating employee:", error);
      setError("Failed to update employee");
    }
  };

  const handleDeleteEmployee = async (employeeId: number) => {
    if (!confirm("Are you sure you want to delete this employee?")) return;

    try {
      const response = await fetch(`http://localhost:3001/api/employees/${employeeId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete employee");
      }

      fetchEmployees();
    } catch (error) {
      console.error("Error deleting employee:", error);
      setError("Failed to delete employee");
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Employee Management</h1>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
            <Card key={index}>
              <CardHeader>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </CardHeader>
              <CardContent>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-full bg-gray-200 rounded mb-2"></div>
                <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto p-4">
        <Card className="bg-red-50 border-red-200">
          <CardHeader>
            <CardTitle className="text-red-700 flex items-center">
              <AlertCircle className="mr-2" />
              Error
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-red-600">{error}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Employee Management</h1>
        <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
          <DialogTrigger asChild>
            <button>Add Employee</button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Employee</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleCreateEmployee} className="space-y-4">
              <input name="first_name" placeholder="First Name" required />
              <input name="last_name" placeholder="Last Name" required />
              <input name="email" type="email" placeholder="Email" required />
              <input name="phone_number" placeholder="Phone Number" />
              <input name="hire_date" type="date" placeholder="Hire Date" required />
              <input name="job_title" placeholder="Job Title" required />
              <input name="department" placeholder="Department" required />
              <input name="salary" type="number" placeholder="Salary" required />
              <button type="submit">Create Employee</button>
            </form>
          </DialogContent>
        </Dialog>
      </div>
      {employees.length === 0 ? (
        <p>No employees available.</p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {employees.map(employee => (
            <Card key={employee.employee_id}>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{employee.first_name} {employee.last_name}</span>
                  <Badge variant={employee.is_active ? "default" : "secondary"}>
                    {employee.is_active ? "Active" : "Inactive"}
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <p className="flex items-center text-sm text-gray-500">
                    <Mail className="mr-2 h-4 w-4" />
                    {employee.email}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <Phone className="mr-2 h-4 w-4" />
                    {employee.phone_number}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <Calendar className="mr-2 h-4 w-4" />
                    Hired: {new Date(employee.hire_date).toLocaleDateString()}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <Briefcase className="mr-2 h-4 w-4" />
                    {employee.job_title}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <Building className="mr-2 h-4 w-4" />
                    {employee.department}
                  </p>
                  <p className="flex items-center text-sm text-gray-500">
                    <DollarSign className="mr-2 h-4 w-4" />
                    {employee.salary.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
                  </p>
                  <div className="flex justify-end space-x-2 mt-4">
                    <Dialog open={isUpdateDialogOpen} onOpenChange={setIsUpdateDialogOpen}>
                      <DialogTrigger asChild>
                        <button onClick={() => setCurrentEmployee(employee)}>Edit</button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Update Employee</DialogTitle>
                        </DialogHeader>
                        {currentEmployee && (
                          <form onSubmit={handleUpdateEmployee} className="space-y-4">
                            <input name="first_name" defaultValue={currentEmployee.first_name} placeholder="First Name" required />
                            <input name="last_name" defaultValue={currentEmployee.last_name} placeholder="Last Name" required />
                            <input name="email" type="email" defaultValue={currentEmployee.email} placeholder="Email" required />
                            <input name="phone_number" defaultValue={currentEmployee.phone_number} placeholder="Phone Number" />
                            <input name="hire_date" type="date" defaultValue={currentEmployee.hire_date} placeholder="Hire Date" required />
                            <input name="job_title" defaultValue={currentEmployee.job_title} placeholder="Job Title" required />
                            <input name="department" defaultValue={currentEmployee.department} placeholder="Department" required />
                            <input name="salary" type="number" defaultValue={currentEmployee.salary} placeholder="Salary" required />
                            <button type="submit">Update Employee</button>
                          </form>
                        )}
                      </DialogContent>
                    </Dialog>
                    <button  onClick={() => handleDeleteEmployee(employee.employee_id)}>Delete</button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}