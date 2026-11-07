import app from './app/app.js';
import { connectToDb } from './config/db.js'
await connectToDb()
app.listen(4000,()=>{
    console.log('server is  runing on port 4000')
})