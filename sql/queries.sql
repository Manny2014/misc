-- Performance By Product Category

SELECT pc.Name AS Product_Category, SUM(p.Price * ol.Quantity) AS Total_Sales
FROM ProductCategory pc
JOIN Product p ON pc.CategoryID = p.CategoryID
JOIN OrderLine ol ON p.ProductID = ol.ProductID
GROUP BY pc.Name
ORDER BY Total_Sales DESC;

-- Customer Order Frequency

SELECT c.FirstName, c.LastName, COUNT(so.OrderID) AS Total_Orders
FROM Customer c
LEFT JOIN SalesOrder so ON c.CustomerID = so.CustomerID
GROUP BY c.FirstName, c.LastName
ORDER BY Total_Orders DESC;

-- Top Selling Products

SELECT p.Name AS Product_Name, SUM(ol.Quantity) AS Total_Quantity_Sold
FROM Product p
JOIN OrderLine ol ON p.ProductID = ol.ProductID
GROUP BY p.Name
ORDER BY Total_Quantity_Sold DESC;

-- Revenue Trend over time

SELECT DATEPART(YEAR, so.OrderDate) AS Order_Year, DATEPART(MONTH, so.OrderDate) AS Order_Month, SUM(ol.Quantity * p.Price) AS Monthly_Revenue
FROM SalesOrder so
JOIN OrderLine ol ON so.OrderID = ol.OrderID
JOIN Product p ON ol.ProductID = p.ProductID
GROUP BY DATEPART(YEAR, so.OrderDate), DATEPART(MONTH, so.OrderDate)
ORDER BY Order_Year, Order_Month;

-- Customer Payment History

SELECT c.FirstName, c.LastName, SUM(pm.Amount) AS Total_Payments
FROM Customer c
LEFT JOIN Payment pm ON c.CustomerID = pm.CustomerID
GROUP BY c.FirstName, c.LastName
ORDER BY Total_Payments DESC;


-- Average Salary by department

SELECT d.Name AS Department, AVG(e.Salary) AS Average_Salary
FROM Department d
JOIN Employee e ON d.DepartmentID = e.DepartmentID
GROUP BY d.Name;


-- Distribution across different deparments 

SELECT d.Name AS Department, COUNT(e.EmployeeID) AS EmployeeCount
FROM Employee e
INNER JOIN Department d ON e.DepartmentID = d.DepartmentID
GROUP BY d.Name;


-- Best performance by product based on sales

SELECT pc.Name AS Product_Category, COUNT(ol.OrderLineID) AS Total_Sales,
       COUNT(DISTINCT c.CustomerID) AS Unique_Customers
FROM ProductCategory pc
LEFT JOIN Product p ON pc.CategoryID = p.CategoryID
LEFT JOIN OrderLine ol ON p.ProductID = ol.ProductID
LEFT JOIN SalesOrder so ON ol.OrderID = so.OrderID
LEFT JOIN Customer c ON so.CustomerID = c.CustomerID
GROUP BY pc.Name
ORDER BY Total_Sales DESC, Unique_Customers DESC;

-- Employ Numbers by dept.

SELECT d.Name AS Department, COUNT(e.EmployeeID) AS EmployeeCount
FROM Employee e
INNER JOIN Department d ON e.DepartmentID = d.DepartmentID
GROUP BY d.Name;