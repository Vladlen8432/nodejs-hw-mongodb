import contactsModel from "../models/contacts.js";

export const getAllContacts = async () => {
  const contacts = await contactsModel.find();
  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await contactsModel.find(contactId);
  return contact;
};
