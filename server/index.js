import app from './app.js';
import { startConnection } from "./database";

startConnection();
app.listen(3000);
console.log('servidor en puerto 3000');