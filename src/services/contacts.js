import contactsModel from "../models/contacts.js";

export const getAllContacts = async (userId) => {
  const contacts = await contactsModel.find({ userId });
  return contacts;
};

export const getContactById = async (contactId, userId) => {
  const contact = await contactsModel.findOne({ _id: contactId, userId });
  return contact;
};

export const findContactById = async (contactId, userId) => {
  try {
    const contact = await contactsModel.findOne({ _id: contactId, userId });
    return contact;
  } catch (error) {
    console.error(`Error finding contact by ID: ${error.message}`);
    throw error;
  }
};

export const createContact = async (contactData) => {
  const newContact = await contactsModel.create(contactData);
  return newContact;
};

export const updateContactById = async (contactId, updateData, userId) => {
  return contactsModel.findOneAndUpdate(
    { _id: contactId, userId },
    { $set: updateData },
    { new: true, runValidators: true }
  );
};

export const deleteContactById = async (contactId, userId) => {
  return contactsModel.findOneAndDelete({ _id: contactId, userId });
};

// import contactsModel from "../models/contacts.js";

// export const getAllContacts = async () => {
//   const contacts = await contactsModel.find();
//   return contacts;
// };

// export const getContactById = async (contactId) => {
//   const contact = await contactsModel.findById(contactId);
//   return contact;
// };

// export const findContactById = async (contactId) => {
//   try {
//     const contact = await contactsModel.findById(contactId);
//     return contact;
//   } catch (error) {
//     console.error(`Error finding contact by ID: ${error.message}`);
//     throw error;
//   }
// };

// export const createContact = async (contactData) => {
//   const newContact = await contactsModel.create(contactData);
//   return newContact;
// };

// export const updateContactById = async (contactId, updateData) => {
//   return contactsModel.findByIdAndUpdate(
//     contactId,
//     { $set: updateData },
//     { new: true, runValidators: true }
//   );
// };

// export const deleteContactById = async (contactId) => {
//   return contactsModel.findByIdAndDelete(contactId);
// };
