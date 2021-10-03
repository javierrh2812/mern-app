import dotenv from 'dotenv'
import {runServer} from './src/server/app'
import startSocket from './src/server/socket'
import db from './src/server/database'
dotenv.config()
const server = runServer()
startSocket(server)

db.connect()
