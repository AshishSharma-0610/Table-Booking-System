// Backend configuration constants
const PORT = process.env.PORT || 3000;
const MONGODB_OPTIONS = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};

module.exports = {
    PORT,
    MONGODB_OPTIONS
};