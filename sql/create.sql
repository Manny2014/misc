-- Department table
CREATE TABLE Department (
    DepartmentID INT PRIMARY KEY,
    Name NVARCHAR(255),
    Location NVARCHAR(255)
);

-- Employee table
CREATE TABLE Employee (
    EmployeeID INT PRIMARY KEY,
    FirstName NVARCHAR(255),
    LastName NVARCHAR(255),
    Email NVARCHAR(255),
    PhoneNumber NVARCHAR(20),
    Salary DECIMAL(10, 2),
    DepartmentID INT,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
);

-- Customer table
CREATE TABLE Customer (
    CustomerID INT PRIMARY KEY,
    FirstName NVARCHAR(255),
    LastName NVARCHAR(255),
    Email NVARCHAR(255),
    PhoneNumber NVARCHAR(20)
);

-- Supplier table
CREATE TABLE Supplier (
    SupplierID INT PRIMARY KEY,
    CompanyName NVARCHAR(255),
    ContactName NVARCHAR(255),
    Email NVARCHAR(255),
    PhoneNumber NVARCHAR(20)
);

-- Product table
CREATE TABLE Product (
    ProductID INT PRIMARY KEY,
    Name NVARCHAR(255),
    Description NVARCHAR(MAX),
    Price DECIMAL(10, 2),
    StockQuantity INT,
    CategoryID INT,
    FOREIGN KEY (CategoryID) REFERENCES ProductCategory(CategoryID)
);

-- ProductCategory table
CREATE TABLE ProductCategory (
    CategoryID INT PRIMARY KEY,
    Name NVARCHAR(255)
);

-- SalesOrder table
CREATE TABLE SalesOrder (
    OrderID INT PRIMARY KEY,
    OrderDate DATE,
    TotalAmount DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);

-- OrderLine table
CREATE TABLE OrderLine (
    OrderLineID INT PRIMARY KEY,
    Quantity INT,
    LineTotal DECIMAL(10, 2),
    OrderID INT,
    ProductID INT,
    FOREIGN KEY (OrderID) REFERENCES SalesOrder(OrderID),
    FOREIGN KEY (ProductID) REFERENCES Product(ProductID)
);

-- Payment table
CREATE TABLE Payment (
    PaymentID INT PRIMARY KEY,
    PaymentDate DATE,
    Amount DECIMAL(10, 2),
    CustomerID INT,
    FOREIGN KEY (CustomerID) REFERENCES Customer(CustomerID)
);
