const express = require('express');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRouter');
const artworkRoutes = require('./routes/artworkRouter');
const commentRoutes = require('./routes/commentRouter');
const { globalErrorHandler, notFound } = require('../src/middlewares/globalErrorHandler');
const adminRoutes = require('./routes/adminRouter');

// make a server instance
app.use(express.json());

// allow cors

app.use(cors());

// pass incoming request to express.json()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));

app.get('/', (request, response) => {
	response.json({
		message: 'Welcome to ArtistryLink API',
	});
});

// routes
app.use('/users', userRoutes);
app.use('/artworks', artworkRoutes);
app.use('/comments', commentRoutes);
app.use('/admin', adminRoutes);

app.use(notFound);
// apply error handlers
app.use(globalErrorHandler);

module.exports = {
	app,
};
