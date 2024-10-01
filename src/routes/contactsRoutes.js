// import express from "express";
// import { getContactsController } from "../controllers/contactsController.js";

// const router = express.Router();

// router.get("/", getContactsController);

// export default router;

import express from 'express';
import { getContactsController, getContactById } from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContactsController);
router.get('/:contactId', getContactById);

export default router;
