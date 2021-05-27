const express = require("express");
const {
  getServiceById,
  createService,
  removeService,
  updateService,
  getAllServices,
  getService,
  photo,
} = require("../controllers/service");
const router = express.Router();
const { isSignedIn, isAuthenticated, isAdmin } = require("../controllers/auth");
const { getUserById } = require("../controllers/user");

// params
router.param('userId', getUserById)
router.param('serviceId', getServiceById)

// actual routes
// create route
router.post('/service/create/:userId', isSignedIn, isAuthenticated, isAdmin, createService)

// read routes
router.get('/service/:serviceId', getService)
router.get('/service/photo/:serviceId', photo)

// delete route
router.delete('/service/:serviceId/:userId', isSignedIn, isAuthenticated, isAdmin, removeService)

// update route
router.put('/service/:serviceId/:userId', isSignedIn, isAuthenticated, isAdmin, updateService)

// listing route
router.get('/services', getAllServices)

module.exports = router