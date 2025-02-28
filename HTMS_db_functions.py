import mysql.connector

# Replace these values with your MySQL credentials
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="***REMOVED***",
    database="htms_system"
)

cursor = db.cursor()
print("✅ Connected to MySQL successfully!")


def add_Estimate(EstimateID, PartNumber, CompanyID, partDesc, Qty, price, DateCreated):
        sql="Insert into Estimate() values(%s,%s)"
        cursor.execute(sql,(EstimateID, PartNumber, CompanyID, partDesc, Qty, price, DateCreated))
        db.commit()
        print("✅ Estimate added successfully!")


def add_Company(CompanyID, CompanyName, Address, paymentEmail, BillTo, ShipTo):
        sql="Insert into Company() values(%s,%s)"
        cursor.execute(sql,(CompanyID, CompanyName, Address, paymentEmail, BillTo, ShipTo))
        db.commit()
        print("✅ Company added successfully!")

def add_WorkOrder(WorkOrderID, EstimateID, QTY, Price):
        sql="Insert into WorkOrder() values(%s,%s)"
        cursor.execute(sql,(WorkOrderID, EstimateID, QTY, Price))
        db.commit()
        print("✅ WorkOrder added successfully!")


def add_Invoice(InvoiceID, shipmentNo, InvoiceDate):
        sql="Insert into Invoice() values(%s,%s)"
        cursor.execute(sql,(InvoiceID, shipmentNo, InvoiceDate))
        db.commit()
        print("✅ Invoice added successfully!")


def add_PackingList(ShipmentNo, WorkOrderID, ShipmentDate):
        sql="Insert into PackingList() values(%s,%s)"
        cursor.execute(sql,(ShipmentNo, WorkOrderID, ShipmentDate))
        db.commit()
        print("✅ PackingList added successfully!")

