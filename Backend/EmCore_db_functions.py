from flask import Flask, request, jsonify
from flask_cors import CORS
import pymysql
import bcrypt #this is used for hashing passwords to protect from hackers

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"]) #allows communication with react which runs in browser under that http



#function to connect to the database
def db_connection():
        conn = None
        try:
                conn = pymysql.connect(host="localhost",
                                        user="root",
                                        password="***REMOVED***",
                                        database="htms_system",
                                        cursorclass= pymysql.cursors.DictCursor #changes the SQL query responses to dictionaries, where column names are used as dictionary keys instead of using index positions (tuples).
                                        )
        except pymysql.Error as e:
                print(e)
        return conn



"""
# Create a REST API endpoint for your function
@app.route('/greet', methods=['GET'])
def greet():
        name = request.args.get('name', 'Guest')  # Get the 'name' parameter from the request
        result = example_function(name)
        return jsonify({"message": result})
"""

@app.route('/', methods=['POST'])
def login():
        conn = db_connection()
        cursor = conn.cursor()
        data = request.json
        Username = data.get('username')
        Password = data.get('password').encode('utf-8')  # Convert the password to bytes
        sql = "SELECT Password FROM User WHERE Username=%s"#placeholder used to prevent SQL injection attacks
        cursor.execute(sql, (Username,))#provide (username,) to give pysmysql a tuple with one value pymysql requires tuple parameters
        correctPass = cursor.fetchone()
        cursor.close()
        conn.close()
        if correctPass is not None:
                storedHash = correctPass["Password"].encode('utf-8') #Use ["Password"] because that is the key to the dict returned,Convert the password from the database to bytes
                print(f"Stored password hash: {storedHash}")
                if bcrypt.checkpw(Password, storedHash):  # Check if the password is correct
                        return "Login successful", 200
                else:
                        return "Invalid username or password", 404
        else:
                return "Invalid username", 404

#fucntion to add an estimate for a part and retrieve all estimates
#make sure to figure out how it should be done since the date is set to "todays date" in the database and the id is autoincremented
@app.route('/Estimates', methods=['GET','POST'])
def Estimates():
        #this has been tested and works
        conn=db_connection()
        cursor=conn.cursor()
        if request.method == 'GET':
                cursor.execute("SELECT * FROM Estimate")
                Estimate =[dict(EstimateID=row['EstimateID'], PartNumber=row['PartNo'], CompanyID=row['CompanyID'], partDesc=row['partDescription'], Qty=row['QTY'], price=row['Price'], DateCreated=row['DateCreated']) for row in cursor.fetchall()]
                cursor.close()
                conn.close()
                if Estimate is not None:
                        return jsonify(Estimate)
                else:
                        return "Something went wrong", 404
        
        #this has been tested and works        
        if request.method == 'POST':
                # Extracting data from the JSON body
                data = request.json
        
                # Access JSON data
                new_PartNumber = data.get('PartNo')
                new_CompanyID = data.get('CompanyID')
                new_partDesc = data.get('partDescription')
                new_Qty = data.get('QTY')
                new_price = data.get('Price')

                sql = """INSERT INTO Estimate (PartNo, CompanyID, partDescription, QTY, Price) VALUES ( %s, %s, %s, %s, %s)"""

                cursor.execute(sql, (new_PartNumber, new_CompanyID, new_partDesc, new_Qty, new_price))
                conn.commit()

                print("✅ Estimate added successfully!")
                cursor.close()
                conn.close()
                return "Estimate added successfully", 201


@app.route("/Companies", methods=['GET','POST'])
def Companys():
        #this has been tested and works
        conn= db_connection()
        cursor=conn.cursor()
        if request.method == 'GET':
                cursor.execute("SELECT * FROM Company")
                Company=[dict(CompanyID=row['CompanyID'], CompanyName=row['CompanyName'], address=row['address'], paymentEmail=row['paymentEmail'], BillTo=row['BillTo'], ShipTo=row['ShipTo']) for row in cursor.fetchall()]
                cursor.close()
                conn.close()
                if Company is not None:
                        return jsonify(Company)
                else:
                        return "Something went wrong", 404
        #this has been tested and works
        if request.method == 'POST':
                data=request.json
                new_CompanyName=data.get('CompanyName')
                new_address=data.get('address')
                new_paymentEmail=data.get('paymentEmail')
                new_BillTo=data.get('BillTo')
                new_ShipTo=data.get('ShipTo')
                sql="Insert into Company(CompanyName, address, paymentEmail, BillTo, ShipTo) values(%s,%s, %s, %s, %s)"
                cursor.execute(sql,(new_CompanyName, new_address, new_paymentEmail, new_BillTo, new_ShipTo))
                conn.commit()
                print("✅ Company added successfully!")
                cursor.close()
                conn.close()
                return "Company added successfully", 201




@app.route("/WorkOrder", methods=['GET','POST'])
def WorkOrder():
        conn= db_connection()
        cursor=conn.cursor()


        if request.method == 'POST':
                data = request.json
                WorkOrderID = data.get("Work Order ID")
                EstimateID = data.get("EstimateID")
                Qty = data.get("QTY")
                Price = data.get("Price")
                sql="Insert into WorkOrder() values(%s,%s)"
                cursor.execute(sql,(WorkOrderID, EstimateID, Qty, Price))
                conn.commit()
        if request.method == 'GET':
                data = request.json
                if data is not None:
                        WorkOrderID = data.get("Work Order ID")
                else:
                        sql="SELECT * FROM WorkOrder"
        print("✅ WorkOrder added successfully!")


def add_Invoice(InvoiceID, shipmentNo, InvoiceDate):
        conn= db_connection()
        cursor=conn.cursor()
        sql="Insert into Invoice() values(%s,%s)"
        cursor.execute(sql,(InvoiceID, shipmentNo, InvoiceDate))
        conn.commit()
        print("✅ Invoice added successfully!")


def add_PackingList(ShipmentNo, WorkOrderID, ShipmentDate):
        conn= db_connection()
        cursor=conn.cursor()
        sql="Insert into PackingList() values(%s,%s)"
        cursor.execute(sql,(ShipmentNo, WorkOrderID, ShipmentDate))
        conn.commit()
        print("✅ PackingList added successfully!")


# Run the Flask app
if __name__ == '__main__':
        app.run(debug=True, port=5050)