import mongoose from "mongoose";


const DBCon = async () => {
	try {

		//console.log(process.env.MONGODB_URL)
		await mongoose.connect(process.env.MONGODB_URL);
		console.log("Connected to MongoDB");
		//console.log(process.env.MONGODB_URL)
	} catch (error) {
		console.log("Error connecting to MongoDB", error.message);
	}
};

export default DBCon;









// Ty15VAjdEgJjXmOs

// subashree3003

// Sample1