
const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const multer = require('multer')
const fs=require("fs")
const app = express()


require('dotenv').config(); 
const jwt = require('jsonwebtoken');
app.use(express.json())
const corsOptions = {
  origin: "https://ecom-new-rosy.vercel.app",   // React frontend URL
  credentials: true,                 // Allow cookies / tokens
};

app.use(cors(corsOptions));


app.listen(9000, () => {
  console.log("server is running")
 })



mongoose.connect(process.env.mongodb_url||"mongodb+srv://dishantkaushal456_db_user:0TAQFpQ9Mdbn4Aiw@cluster0.xnkyck2.mongodb.net/Bakery?retryWrites=true&w=majority")
    .then(() => console.log("database is connected"))

    .catch((err) => console.log("database is not connected"))

const cart = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String,

  usertype:String,

},{versionKey:false})
const datamodel = mongoose.model("reg", cart, "reg")

//register api
app.post("/api/register", async (req, res) => {
    let rr = new datamodel({
        firstname: req.body.fname,
        lastname: req.body.lname,

        
        email: req.body.email,
        password: req.body.pwd,
      usertype:"user"
    });
    const result = await rr.save()
    if (result) {
        res.send({ statuscode: 1 })
    } else {
        res.send({ statuscode: 0 })
    }

})

//alluser
app.get("/api/alluser",async(req,res)=>{
  let result= await datamodel.find();

    if (result){
      res.send({statuscode:1,userlist:result})

    }
    else{
      res.send({statuscode:0})
    }
  
})

//delete user
app.delete("/api/deleteuser/:id",async(req,res)=>{
  const result = await datamodel.deleteOne({_id:req.params.id})
  console.log(result)
  if(result){
  res.send({statuscode:1})

  }
  else{
    res.send({statuscode:0})
  }
})


// Update usertype API
app.put("/api/updateuser/:id", async (req, res) => {
  try {
    const { usertype } = req.body;
    if (!usertype) {
      return res.send({ statuscode: 0, message: "Usertype is required" });
    }
    const result = await datamodel.updateOne(
      { _id: req.params.id },
      { $set: { usertype: usertype } }
    );
    if (result.modifiedCount === 1) {
      res.send({ statuscode: 1, message: "Usertype updated" });
    } else {
      res.send({ statuscode: 0, message: "User not found or type unchanged" });
    }
  } catch (error) {
    console.error("Error updating usertype:", error);
    res.status(500).send({ statuscode: 0, message: "Server error" });
  }
});




//login api

app.post("/api/login", async (req, res) => {
  try {
    if (!process.env.TOKEN_KEY) {
      throw new Error("JWT secret key missing");
    }
    
    const data = await datamodel.findOne({ email: req.body.email });
    if (!data) {
      return res.send({ statuscode: 0, message: "Invalid email or password" });
    }
    if (data.password !== req.body.pwd) {
      return res.send({ statuscode: 0, message: "Invalid email or password" });
    }
    const token = jwt.sign({ userid: data._id }, process.env.TOKEN_KEY, { expiresIn: '1h' });
    return res.send({
      statuscode: 1,
      userdata: {
        email: data.email,
        userid: data._id,
    
        firstname: data.firstname,

    
      },
      authtoken: token,
          usertype: data.usertype,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).send({ statuscode: -1, error: "Server error" });
  }
});



app.get("/api/fetchdata", async (req, res) => {
    const result = await datamodel.find()
    if (result) {
        res.send({ statuscode: 1, data: result })
    } else {
        res.send({ statuscode: 0 })
    }
})

let categorypic;
const mystorage = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null, "./public/uploads")
    },
    filename: (req,file,cb) => {
        categorypic =file.originalname
        cb(null, categorypic)

    }
})
const upload1 = multer({ storage: mystorage })
const cart1 = mongoose.Schema({
    categoryname: String,
    categorytype: String,
})
const datamodel1 = mongoose.model("cate", cart1, "cate")



app.post("/api/category", upload1.single("ctype1"), async (req, res) => {
    const data = new datamodel1({
        categoryname: req.body.cname1,
        categorytype: categorypic,
    })
    const result = await data.save()
    if (result) {
        res.send({ statuscode: 1 })
    }
    else {
        res.send({ statuscode: 0 })
    }
})


app.get("/api/category1",async(req,res)=>{
    const data= await datamodel1.find()
    if(data){
        res.send({statuscode:1, data1:data})
    }
    else{
        res.send({statuscode:0})
    }
})


   const cart3=mongoose.Schema({
      catid:String,
   
      pname:String,
      pq:String,
      pimg:String,
      pprice:String,
      pdescription:String,
      Addedon:String
   })
   const datamodel3=mongoose.model("pdata",cart3,"pdata")
   app.post("/api/product",upload1.single("pimg1"),async(req,res)=>{
      const data=new datamodel3({
        catid:req.body.catid,
         pname:req.body.pname1,
        pq:req.body.pq1,
        pimg:categorypic,
        pprice:req.body.pprice,
        pdescription:req.body.pdescription,
        Addedon:new Date()
      })
       const data1=await data.save()
      if(data1){
        res.send({statuscode:1})
      }
      else{
        res.send({statuscode:0})
      }
      
   })
   app.get("/api/product1",async(req,res)=>{
    const result= await datamodel3.find()
    if(result){
        res.send({statuscode:1, dd:result})
    }
    else{
        res.send({statuscode:0})
    }
   })
   app.get("/api/showproduct/:id",async(req,res)=>{
    const result= await datamodel3.find({catid:req.params.id})
    if(result){
        res.send({statuscode:1, dd:result})
    }
    else{
        res.send({statuscode:0})
    }
   })
   app.delete("/api/delete/:cid",async(req,res)=>{
const result=await datamodel1.deleteOne({_id:req.params.cid})
if(result.deletedCount===1){
    res.send({statuscode:1})
}else{
    res.send({statuscode:0})
}
   })
   app.delete("/api/sdelete/:sid",async(req,res)=>{
    const result=await datamodel2.deleteOne({_id:req.params.sid})
    if(result.deletedCount===1){
        res.send({statuscode:1})
    }
    else{
        res.send({statuscode:0})
    }
   })
app.delete("/api/pdelete/:pid",async(req,res)=>{
    const result= await datamodel3.deleteOne({_id:req.params.pid})
    if(result.deletedCount===1){
        res.send({statuscode:1})
    }
    else{
        res.send({statuscode:0})
    }
})
app.get("/api/pdetails/:id",async(req,res)=>{
       const result=await datamodel3.findOne({_id:req.params.id})
       if(result){
        res.send({statuscode:1,dd:result})
       }
       else{
        res.send({statuscode:0})
       }
})

app.put("/api/categoryupdate",upload1.single("ctype"),async(req,res)=>{
    if(!req.file){
       
    categorytype=req.body.oldpic
    }
    else{
        fs.unlink("./public/uploads"+req.body.oldpic,(err)=>{
            if(err){
                console.log("file didn't delete")
            }else{
                console.log("file deleted")
            }
        })
    }

    const result= await datamodel1.updateOne({_id:req.body.categoryid},{$set:{categoryname:req.body.cname,categorytype:categorypic}})
    if(result){
        res.send({statuscode:1})
    }
    else{
        res.send({statuscode:0})
    }
})


app.put("/api/updatesubcategory",upload1.single("subtype"),async(req,res)=>{
    if(!req.file){
        subtype=req.body.oldpic
    }
    else{
        fs.unlink("./public/uploads"+req.body.oldpic,(err)=>{
        if(err){
            console.log("file didn't delete")
        }
        else{
            console.log("file deleted")
        }
    })
    }
    const result= await datamodel2.updateOne({_id:req.body.subcategoryid},{$set:{subname:req.body.subname, subtype:categorypic}})
    if(result){
        res.send({statuscode:1})
    }else{
        res.send({statuscode:0}) 
    } 
})










app.put("/api/productupdate",upload1.single("pimg"),async(req,res)=>{
    if(!req.file){
        categorypic=req.body.oldpic
    }
    else{
        fs.unlink("public/uploads"+req.body.oldpic,()=>{
            console.log("pic deleted")
        })
    }
    const  result=await datamodel3.updateOne({_id:req.body.productid},{$set:{pname:req.body.pname,pimg:categorypic}})
    if(result){
        res.send({statuscode:1})
    }
    else{
        res.send({statuscode:0})
    }
})



const cart4 = mongoose.Schema({
    userid: String, 
    email: String,
    productname: String,
    productquantity: Number,
    productprice: String,
    productimage: String,
    productdes: String,
    totalprice: String,
    productid: String
});



const datamodel4 = mongoose.model("addtocart", cart4, "addtocart")
app.post("/api/addcart", async (req, res) => {
    try {
        const result = new datamodel4({
            userid: req.body.userid, 
            email: req.body.email,
            productname: req.body.pname,
            productquantity: req.body.pq,
            productprice: req.body.pprice,
            productimage: req.body.pimg,
            productdes: req.body.pdes,
            totalprice: req.body.tprice,
            productid: req.body.productid
        });

        const data = await result.save();
        if (data) {
            res.send({ statuscode: 1 });
        } else {
            res.send({ statuscode: 0 });
        }
    } catch (error) {
        console.error("Error adding to cart:", error);
        res.status(500).send({ statuscode: -1, error: "Server error" });
    }
});



//addtocart api


app.post("/api/checkcart", async (req, res) => {
  try {
    const { userid, idd } = req.body;

    if (!userid || !idd) {
      return res.status(400).json({ 
        statuscode: 0, 
        msg: "User ID and Product ID are required" 
      });
    }

    const userCart = await datamodel4.findOne({
      userid,
      productid: idd
    });

    if (userCart) {
      return res.json({
        statuscode: 2,
        msg: "Product already in cart",
        existingQuantity: userCart.productquantity
      });
    }

    return res.json({
      statuscode: 3,
      msg: "Product not in cart"
    });

  } catch (error) {
    console.error("Error checking cart:", error);
    return res.status(500).json({
      statuscode: -1,
      msg: "Server error"
    });
  }
});





// Update Cart Quantity API

app.post("/api/updatecart", async (req, res) => {
  try {
    const { userid, productid, pq, tprice } = req.body;

    if (!userid || !productid) {
      return res.send({ statuscode: 0, msg: "Missing userid or productid" });
    }

    const updated = await datamodel4.updateOne(
      { userid: userid, productid: productid },
      {
        $set: {
          pq: pq,
          tprice: tprice
        }
      }
    );

    if (updated.modifiedCount === 1) {
      return res.send({ statuscode: 1, msg: "Cart quantity updated" });
    } else {
      return res.send({ statuscode: 0, msg: "No matching cart item found" });
    }
  } catch (error) {
    console.error("Update Cart Error:", error);
    return res.status(500).send({ statuscode: 0, msg: "Internal server error" });
  }
});










//showcart of particular email of user


app.get("/api/cartdata/:userid", async (req, res) => {
    try {
        const userid = req.params.userid;

        if (!userid) {
            return res.status(400).json({ 
                statuscode: 0, 
                message: "User ID is required" 
            });
        }

        const cartItems = await datamodel4.find({ userid: userid });

        if (cartItems.length > 0) {
            return res.json({
                statuscode: 1,
                message: "Cart data retrieved",
                data: cartItems,
                arraylength: cartItems.length
            });
        } else {
            return res.json({
                statuscode: 0,
                message: "No items found in cart",
                data: [],
                arraylength: 0
            });
        }
    } catch (error) {
        console.error("Server Error:", error);
        return res.status(500).json({
            statuscode: -1,
            message: "Internal server error"
        });
    }
});



//delete cart

app.delete("/api/cartdelete/:id", async (req, res) => {
    try {
        const result = await datamodel4.findByIdAndDelete(req.params.id);
        if (result) {
            res.send({ statuscode: 1, data: result })
        } else {
            res.send({ statuscode: 0 })
        }
    } catch (error) {
        console.error("Error deleting cart item:", error);
        res.status(500).send({ statuscode: -1, error: "Server error" })
    }
})



//checkout APIs

const checkoutSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobile: Number,
  address: String,
  cash: String,
  orderid: String,
  totalPrice: Number,
  items: [{pname:String,pq:Number,tprice:Number}]
  
}, { timestamps: true });

const CheckoutModel = mongoose.model("checkoutdata", checkoutSchema, "checkoutdata");





app.post("/api/checkcartdata", async (req, res) => {
  try {
    const { name, email, mobile, address, cash, orderid, totalPrice} = req.body;

    if (!name || !email || !mobile || !address || !cash || !totalPrice ) {
      return res.send({ statuscode: 0, msg: "Missing required fields" });
    }

    const newOrder = new CheckoutModel({
      name,
      email,
      mobile,
      address,
      cash,
      orderid,
      totalPrice,
      items:req.body.data
    });

    await newOrder.save();
    res.send({ statuscode: 1 });
  } catch (err) {
    console.error("Checkout API Error:", err);
    res.status(500).send({ statuscode: 0, msg: "Server error" });
  }
});


 //to get all orders
app.get("/api/allorders", async (req, res) => {
  try {
    const orders = await CheckoutModel.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, orders });
  } catch (err) {
    console.error("GET /api/allorders error:", err);
    res.status(500).json({ success: false, msg: "Server error" });
  }
});


app.get("/api/useraddress/:id",async(req,res)=>{
    const result= await Checkout.findOne({orderid:req.params.id})
    if(result){
        res.send({statuscode:1, data:result})
    }
    else{
        res.send({statuscode:0})
    }
})

//// cart delete after checkout
app.delete('/api/clearcart/:userid', async (req, res) => {
  const { userid } = req.params;
  try {
    await Cart.deleteMany({ userid }); // assuming your cart items have a 'userid' field
    res.json({ status: 'success' });
  } catch (error) {
    console.error('Error clearing cart:', error);
    res.status(500).json({ status: 'error', message: 'Failed to clear cart' });
  }
});



//show latest product api
app.get("/api/latestprod", async (req, res) => {
    const result = await datamodel3.find().sort({ "Addedon": -1 }).limit(9)
    if (result) {
        res.send({ statuscode: 1, proddata: result })
    }
    else {
        res.send({ statuscode: 0 })
    }
})

// Simple ContactUs Schema and Model
const contactUsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  mobile: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

// POST /api/contact - Save contact form data
app.post('/api/contact', async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    if (!name || !email || !mobile || !subject || !message) {
      return res.status(400).json({ success: false, message: 'Please fill all fields.' });
    }

    const newContact = new ContactUs({ name, email, mobile, subject, message });
    await newContact.save();

    res.json({ success: true, message: 'Contact message saved successfully.' });
  } catch (error) {
    console.error('Error saving contact message:', error);
    res.status(500).json({ success: false, message: 'Server error.' });
  }
});

app.get('/api/contactall', async (req, res) => {
  try {
    const contacts = await ContactUs.find().sort({ createdAt: -1 });
    res.json({ success: true, contacts });
  } catch (err) {
    console.error('Error fetching contacts:', err);
    res.status(500).json({ success: false, error: 'Server error' });
  }
});



//Ai chatbot


const { GoogleGenerativeAI } = require("@google/generative-ai");

// Get your API key from environment variables
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// The Express route
const faq = [
  { question: "what are your bakery timings", answer: "We are open from 8 AM to 8 PM every day." },
  { question: "do you deliver cakes", answer: "Yes, we deliver cakes within a 5km radius of the store." },
  { question: "what types of cakes do you have", answer: "We offer chocolate, vanilla, red velvet, and fruit cakes." },
  { question: "how to place an order", answer: "You can place an order by visiting our shop or calling us at 123-456-7890." },
  { question: "do you offer custom cakes", answer: "Yes, we offer custom cakes for birthdays, weddings, and other events." }
];

function findAnswer(userMsg) {
  const normalized = userMsg.toLowerCase().trim();
  const found = faq.find(f =>
    normalized.includes(f.question)
  );
  return found ? found.answer : "Sorry, I don’t have an answer to that. Please ask something else.";
}

app.post("/api/chat", (req, res) => {
  const { message } = req.body;

  if (!message) return res.status(400).json({ reply: "Message is required." });

  const reply = findAnswer(message);
  res.json({ reply });
});




// AIzaSyCQuQn_c_-gv4MqdAppy4PLkgbUlQCZ8-E