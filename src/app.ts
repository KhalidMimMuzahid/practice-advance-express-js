import express, { NextFunction, Request, Response } from 'express'
const app = express()
const userRouter = express.Router()
const courseRouter = express.Router()
// parsers 
app.use(express.json())
app.use(express.text())
app.use("/api/v1/users", userRouter)
app.use("/api/v1/courses", courseRouter)





//middleware
const logger=(req:Request, res:Response, next:NextFunction)=>{
  console.log(req.url, req.method, req.hostname)
  next()
}


// const userRouter = express.Router()  
// app.use("/", userRouter)
userRouter.post('/create-user', (req:Request, res:Response)=>{
    const user= req.body
    console.log(user)

    res.json({
      success:true,
      message: 'User Created Successfully',
      data: user
    })

})

courseRouter.post('/create-course', (req:Request, res:Response)=>{
  const course= req.body
  console.log(course)

  res.json({
    success:true,
    message: 'course Created Successfully',
    data: course
  })
})

app.get('/', logger, (req:Request, res:Response, next:NextFunction) => {

  // error handling 
  try {
    // res.send("successfully got the data")
    res.send(somethingUndefined)
  } catch (error) {
    // console.log(error)
    next(error)
  }

  
})

app.post('/:userId/:userEmail', (req:Request, res:Response) => {
  // http://localhost:5000/65434323/khalidmimm@gmail.com  //this params will be set something like this.
  // console.log(req.body)
  console.log(req.params)

  // // sending plane text 
  // res.send('post data')  

  // sending json data 
  res.json({message:'post data'})
})

app.get('/get-user', (req:Request, res:Response) => {

  http://localhost:5000/get-user?email=khalidmimm@gmail.com&&userId=1232343  // this query will be set like this
    console.log(req.query)

    res.json({message:'get data successfully'})
})

// global error handling middleware  and it should stay in the end of all api
app.use((error:any, req:Request, res:Response,next:NextFunction)=>{
  if(error){
    res.status(400).json({
      success:false,
      message: "Something went wrong"
    })
  }
})

//error handling for route not fount and it must be in the end of all api
app.all("*",(req:Request, res:Response)=>{
  res.status(404).json({
    success:false,
    message: "Route not found"
  })
})
       
export default app; 