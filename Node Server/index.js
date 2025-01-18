import express from "express";
import bodyParser from "body-parser"; //middleware import
import pg from "pg";
import cors from "cors";

/////////////////////////////////////////////////////////////////////////
import {dirname} from "path";    //import for location of file to be send
import {fileURLToPath} from "url"; //import for location of file to be send
import { hostname } from "os";
const _dirname = dirname(fileURLToPath(import.meta.url)); //const for location of file to be send
/////////////////////////////////////////////////////////////////////////////



const app = express();
const port = 3000;

app.use(cors())

app.use(express.json());
////////////////////////////DATABASE CONNECTION///////////////////////////////////

const db = new pg.Client({
    user: "postgres",
    host: "localhost",
    database: "postgres",
    password: "parth2822",
    port: 5432,
  });
  

db.connect(
    console.log("connected")
);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////

const result = await db.query("SELECT * FROM customers");


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


var data = [];


app.use(bodyParser.urlencoded({ extended: true })); // bodyparser middleware use method

app.use(express.static("public")); //for using 


    








//variables

var name = "";
var email= "";
var gender= "";

var huii=" hiiiiii this is connected to"

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


////////////////////////////////////////////////////////////////////////////////
app.get("/" , async (req, res) =>{
    
    const result = await db.query("SELECT * FROM customers ORDER BY id ASC");
    //res.sendFile(_dirname + "/index.html");
res.json( result.rows)


})
//////////////////////////////////////////////////////////////////////////////////






////////////////////////////////////////////////////////////////////////////////////////
app.post("/submit/data" , async  (req,res) =>{

    
   const data = req.body;
    gender = "male";
    console.log(data);
   
    //await db.query("INSERT INTO customers(id,name)VALUES(7,'Meet')");
    await db.query("INSERT INTO customers(name,email,cardnumber,cvv)VALUES($1,$2,$3,$4)",[data.name,data.email,data.cardnumber,data.cvv]);
    
    const result = await db.query("SELECT * FROM customers ORDER BY id ASC");
    res.json( result.rows)
    console.log(result.rows[0]);
    });
    ////////////////////////////////////////////////////////////////////////////////////////////////////
    



//data = db.query('SELECT * FROM customers');
//db.query("INSERT INTO customers(,name,email,gender)VALUES($1,$2,$3)," ["jeet','jeet34@gmail.com' ,'Male']);

//console.log(result.rows);




//////////////////////////////////////////////////////////////////
app.get("/view" , async (req,res) =>{

    const result = await db.query("SELECT * FROM customers ORDER BY id ASC ");
    res.render("table.ejs" , {

     data: result
    

    });
   // for(let i=1; i< result.rows.length; i ++ ){
     //   console.log(result.rows[i].id);
    //}

    
});
////////////////////////////////////////////////////////////////////////////////



///////////////////////////////////EDIT BUTTON AND PAGE/////////////////////////////////////////////////////
app.get("/edit/:id" , async (req,res) =>{
    const edit_id = parseInt(req.params.id);

    const result = await db.query(("SELECT * FROM customers WHERE id= $1"),[edit_id] );

    res.json(result.rows[0])
});




////////////////////////////////
app.post("/edit_submit/:id" , async  (req,res) =>{

    const data = req.body;
    const edit_id = parseInt(req.params.id) ;
    gender = "male"
    
    //await db.query("INSERT INTO customers(id,name)VALUES(7,'Meet')");
    await db.query("UPDATE customers SET name=$1, email=$2 , cardnumber=$3 ,cvv=$4 WHERE id =$5",[data.name,data.email,data.cardnumber,data.cvv,edit_id]);
    
    const result = await db.query("SELECT * FROM customers ORDER BY id ASC");
    res.json( result.rows)
    console.log(result.rows[0]);
    });



/////////////////////////////////////////////////////////////////////////////////////////////////////
app.post("/password" , async  (req,res) =>{

    
    const data = req.body;
     console.log(data);

     const result2 = await db.query(("SELECT * FROM passwords WHERE username= $1"),[data.username] );
     
     console.log(result2.rows[0].password)
if(result2.rows[0].password == data.password){
res.json("approved");
console.log("approved");
}else{
res.json("disapproved");
console.log("disapproved");
}
     
     });


/////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get("/delete/:id" , async (req,res) =>{

    const delete_id = parseInt(req.params.id) ;
    console.log(delete_id);
    await db.query("DELETE FROM customers WHERE id = $1",[delete_id]);
   
  const result = await db.query("SELECT * FROM customers ORDER BY id ASC ");
   
    res.json( result.rows );
    


    })
    


    const result2 = await db.query("SELECT * FROM customers");
    




    app.get("/delete34/:id" , async (req,res) =>{

        const delete_id = parseInt(req.params.id) ;
        console.log(delete_id);
        await db.query("DELETE FROM customers WHERE id = $1",[delete_id]);
       
        result2 = await db.query("SELECT * FROM customers");
       res.render("index.ejs" );
       db.end();    
    })    
    










app.listen( port , () =>{

    console.log(`Server running on port ${port}`);
    
    } )