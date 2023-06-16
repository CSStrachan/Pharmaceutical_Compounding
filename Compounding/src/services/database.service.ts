import { Injectable } from '@angular/core';
import {Prescription} from "../models/prescription";

declare function openDatabase(name: string,
                              version: string,
                              displayName: string,
                              size: number,
                              creationCallback: any): any;
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db: any = null;

  constructor() {
  }

  private static errorHandler(error: any) {
    console.error(`Error: ${error.message}`);
  }

  private createDatabase() {
    let name = "CompoundingDB";
    let version = "1.0";
    let displayName = "DB for Compounding App";
    let size = 2 * 1024 * 1024;

    function creationCallback() {
      console.log("Success: Database created successfully");
    }
    this.db = openDatabase(name, version, displayName, size, creationCallback);
  }

  private getDatabase(): any {
    if (this.db == null){
      this.createDatabase();
    }
    return this.db;
  }

  private createTables() {
    function txFunction(tx: any) {
      let sql: string = "CREATE TABLE IF NOT EXISTS prescriptions("
        + "id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, "
        + "medication VARCHAR(25) NOT NULL,"
        + "dose INTEGER NOT NULL,"
        + "lactoseAllergy BOOL,"
        + "comments VARCHAR(250),"
        + "medWeight INTEGER NOT NULL,"
        + "lacWeight INTEGER NOT NULL,"
        + "flrWeight INTEGER NOT NULL);";

      let options: any[] = [];
      tx.executeSql(sql, options, () => {
        console.log("Success: Prescription Table created successfully");
      }, DatabaseService.errorHandler);

    }
    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table creation transaction successful");
    });
  }

  private dropTables() {
    function txFunction(tx: any) {
      let sql: string = "DROP TABLE IF EXISTS prescriptions;";

      let options: any[] = [];

      tx.executeSql(sql, options, () => {
        console.log("Success: Compounds Table dropped successfully");
      }, DatabaseService.errorHandler);
    }

    this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
      console.log("Success: Table drop transaction successful");
    });
  }

  public initDB() {
    try {
      this.createDatabase();
      this.createTables();
    } catch (err: any) {
      console.error(`Error in initDB: ${err.message}`);
    }
  }

  public clearDB() {
    let result = confirm("Are you sure you want to clear the database?");
    if (result) {
      this.dropTables();
      this.db = null;
      alert("Database cleared");
    }
  }

  insert(prescription: Prescription): Promise<any> {
    return new Promise ( (resolve, reject) => {
      function txFunction(tx:any) {
        var sql = "INSERT INTO prescriptions(medication, dose, lactoseAllergy, comments, medWeight, lacWeight, flrWeight) VALUES(?,?,?,?,?,?,?);";

        let options = [prescription.medication, prescription.dose, prescription.lactoseAllergy, prescription.comments, prescription.medWeight, prescription.lacWeight, prescription.flrWeight];
        tx.executeSql(sql, options, (tx:any, results: any) => {
          resolve(results);
        }, (err:any) => {
          reject(`Error in prescription insert${err}`)
        });
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: insert transaction successful");
      });
    });
  }

  selectAll(): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        var sql = "SELECT * FROM prescriptions;";
        let options: any[] = [];
        tx.executeSql(sql, options, (tx: any, results: any) => {

          let prescription: Prescription[] = [];
          if (results.rows.length > 0) {
            for (let i = 0; i < results.rows.length; i++) {
              let row = results.rows[i];
              let aPrescription: Prescription = new Prescription(row['medication'],
                row['dose'], row['lactoseAllergy'], row['comments'], row['medWeight'], row['lacWeight'], row['flrWeight']);
              aPrescription.id = row['id'];
              prescription.push(aPrescription);
            }
            resolve(prescription);
          } else {
            resolve(prescription);
          }
        }, (err: any) => {
          reject(`Error in selectAll ${err}`)
        });
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select All transaction successful");
      });
    });
  }

  delete(prescription: Prescription): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        var sql = "DELETE FROM prescriptions WHERE id=?;";
        let options = [prescription.id];

        tx.executeSql(sql, options, (tx: any, results: any) => {
          resolve(results);
        }, (err: any) => {
          reject(`Error in delete ${err}`)
        });
      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: delete transaction successful");
      });
    });
  }


  select(id: any): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        var sql = "SELECT * FROM prescriptions WHERE id=?;";
        let options: any[] = [id];
        tx.executeSql(sql, options, (tx: any, results: any) => {
          if (results.rows.length > 0) {
            let row = results.rows[0];
            let aPrescription: Prescription = new Prescription(row['medication'],
              row['dose'], row['lactoseAllergy'], row['comments'], row['medWeight'], row['lacWeight'], row['flrWeight']);
            aPrescription.id = row['id'];
            resolve(aPrescription);
          } else {
            reject("No Prescription found");
          }
        }, (err: any) => {
          reject(`Error in select ${err}`)
        });


      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: Select transaction successful");
      });
    });
  }

  update(prescription: Prescription): Promise<any> {
    return new Promise((resolve, reject) => {
      function txFunction(tx: any) {
        var sql = "UPDATE prescriptions SET medication=?, dose=?, lactoseAllergy=?, comments=?, medWeight=?, lacWeight=?, flrWeight=? WHERE id=?;";
        let options = [prescription.medication, prescription.dose,
          prescription.lactoseAllergy, prescription.comments,
          prescription.medWeight, prescription.lacWeight,
          prescription.flrWeight, prescription.id];

        tx.executeSql(sql, options, (tx: any, results: any)=> {
          resolve(options);
        }, (err: any) => {
          reject(`Error in update ${err}`)
        });

      }

      this.getDatabase().transaction(txFunction, DatabaseService.errorHandler, () => {
        console.log("Success: update transaction successful");
      });
    });
  }


}
