import  express from 'express';
import 'dotenv/config';
import { dbConnection } from './database/db.js';
import { router } from './router.js';
import cors from 'cors';

const app = express()

app.use(express.json());

const PORT =process.env.PORT || 4000


app.use(cors({
    origin: (origin, callback) => {
        if (origin && origin.startsWith('http://localhost:')) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));


app.use(express.json())
app.get('/healthy',(req, res)=> {
    res.json(
        {
            success: true,
            message:"Server is healthy"
        }
    )
})

app.use('/api', router);




 


dbConnection().then(()=> {
    console.log('Databse connected');
   app.listen(PORT, () => {
        console.log(`server runnig ${PORT}`);
     })
 })

 .catch (error => {
    console.log('Error connection database:'+ error);
 })

