import pymysql

# Establish connection to the MySQL database
conn = pymysql.connect(
    host='localhost', 
    user='root',
    password='***REMOVED***',
    database='htms_system'
)
cursor = conn.cursor()
print("✅ Connected to MySQL successfully!")

# Corrected SQL Queries
sql_queries = [
    """
    CREATE TABLE IF NOT EXISTS Company (
        CompanyID int AUTO_INCREMENT PRIMARY KEY,
        CompanyName varchar(255) NOT NULL UNIQUE,
        address TEXT NOT NULL,
        paymentEmail varchar(255) NOT NULL UNIQUE,
        BillTo TEXT NOT NULL,
        ShipTo TEXT NOT NULL
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Estimate (
        EstimateID int AUTO_INCREMENT PRIMARY KEY,
        PartNo varchar(50) NOT NULL,
        CompanyID int NOT NULL,
        partDescription TEXT,
        QTY int NOT NULL,
        Price decimal(10,2) NOT NULL,
        DateCreated DATE NOT NULL DEFAULT (CURDATE()),
        FOREIGN KEY(CompanyID) REFERENCES Company(CompanyID)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS WorkOrder (
        WorkOrderID int AUTO_INCREMENT PRIMARY KEY,
        EstimateID int NOT NULL,
        QTY int NOT NULL,
        Price decimal(10,2) NOT NULL,
        FOREIGN KEY(EstimateID) REFERENCES Estimate(EstimateID)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS PackingList (
        ShipmentNo int AUTO_INCREMENT PRIMARY KEY,
        WorkOrderID int NOT NULL,
        ShipmentDate DATE NOT NULL,
        FOREIGN KEY(WorkOrderID) REFERENCES WorkOrder(WorkOrderID)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS Invoice (
        InvoiceID int AUTO_INCREMENT PRIMARY KEY,
        ShipmentNo int NOT NULL,
        InvoiceDate DATE NOT NULL DEFAULT (CURDATE()),
        FOREIGN KEY(ShipmentNo) REFERENCES PackingList(ShipmentNo)
    );
    """,
    """
    CREATE TABLE IF NOT EXISTS User (
        UserID int AUTO_INCREMENT PRIMARY KEY,
        Username varchar(50) NOT NULL UNIQUE,
        Password varchar(255) NOT NULL,
        role ENUM('admin', 'user') DEFAULT 'user',
        DateCreated DATE NOT NULL DEFAULT (CURDATE())
    );
    """
]

# Execute each query separately
for query in sql_queries:
    cursor.execute(query)

# Commit changes
conn.commit()
print("✅ All tables created successfully!")

# Close connection
cursor.close()
conn.close()
print("🔒 Database connection closed.")
