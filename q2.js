const express=require('express');
const jwt=require('jsonwebtoken');
const mongoose=require('mongoose');
const app=express();
app.use(express.json());
const userSchema=new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true,}
});
mongoose.model("User", userSchema);
mongoose.connect("mongodb://localhost:27017/userr")
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));
  const authMiddleware = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Token missing" });
  try {
    const decoded = jwt.verify(token,"secretkey");
    req.userId = decoded.id;
    next();
  } 
  catch 
  {
    res.status(401).json({ message: "Invalid token" });
  }
};

app.post("/addU",authMiddleware, async (req,  res) => {
  try {
    const { name, email} = req.body;
    const user = new User({ name, email});
    await user.save();
    res.json({ message: "User registered" });
  } 
  catch (err) {
    res.status(400).json({ message:err.message });
  }
});
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Wrong password" });
    const token = jwt.sign({ id: user._id }, "secretkey", { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(400).json({ message: "Error: " + err.message });
  }
});
app.listen(3000,()=>{
    console.log("runnign at 3000");
})
