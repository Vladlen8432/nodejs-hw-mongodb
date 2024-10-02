import { getAllContacts } from "../services/contacts.js";
import { findContactById } from "../services/contacts.js";

import mongoose from "mongoose";
export const getContactsController = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    console.log("Contacts retrieved:", contacts);

    res.status(200).json({
      status: 200,
      message: "Successfully found contacts!",
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      status: 500,
      message: "Failed to retrieve contacts",
      error: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(contactId)) {
    return res.status(400).json({
      message: "Invalid contact ID format",
    });
  }

  try {
    const contact = await findContactById(contactId);

    if (!contact) {
      return res.status(404).json({
        message: "Contact not found",
      });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
