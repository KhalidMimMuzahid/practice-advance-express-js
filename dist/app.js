"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
// parsers 
app.use(express_1.default.json());
app.use(express_1.default.text());
app.use("/api/v1/users", userRouter);
app.use("/api/v1/courses", courseRouter);
//middleware
const logger = (req, res, next) => {
    console.log(req.url, req.method, req.hostname);
    next();
};
// const userRouter = express.Router()  
// app.use("/", userRouter)
userRouter.post('/create-user', (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        success: true,
        message: 'User Created Successfully',
        data: user
    });
});
courseRouter.post('/create-course', (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        success: true,
        message: 'course Created Successfully',
        data: course
    });
});
app.get('/', logger, (req, res, next) => {
    // error handling 
    try {
        // res.send("successfully got the data")
        res.send(somethingUndefined);
    }
    catch (error) {
        // console.log(error)
        next(error);
    }
});
app.post('/:userId/:userEmail', (req, res) => {
    // http://localhost:5000/65434323/khalidmimm@gmail.com  //this params will be set something like this.
    // console.log(req.body)
    console.log(req.params);
    // // sending plane text 
    // res.send('post data')  
    // sending json data 
    res.json({ message: 'post data' });
});
app.get('/get-user', (req, res) => {
    http: //localhost:5000/get-user?email=khalidmimm@gmail.com&&userId=1232343  // this query will be set like this
     console.log(req.query);
    res.json({ message: 'get data successfully' });
});
// global error handling middleware  and it should stay in the end of all api
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong"
        });
    }
});
//error handling for route not fount and it must be in the end of all api
app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});
exports.default = app;
