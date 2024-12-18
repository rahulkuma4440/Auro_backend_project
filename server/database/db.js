let mongoose=require('mongoose');

const Connection = async () => {
    const username = process.env.DB_USERNAME;
    const password = process.env.DB_PASSWORD;
    const URL = `mongodb+srv://${username}:${password}@cluster0.xxb75.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
    try {
        await mongoose.connect(URL, { useNewUrlParser: true })
        console.log('Database connected successfully');
    } catch (error) {
        console.log('Error while connecting to the database ', error);
    }
};

export default Connection;