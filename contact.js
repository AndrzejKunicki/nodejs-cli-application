const fs = require("fs/promises");
const path = require("path");

const contactsPath = path.resolve("./db/contacts.json");

async function listContacts() {
  const data = await fs.readFile(contactsPath, "utf-8");
  const content = JSON.parse(data);
  console.table(content);
}

async function getContactById(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const content = JSON.parse(data);
  const result = content.find((contact) => contact.id === Number(contactId));
  console.table(result);
}

async function removeContact(contactId) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const content = JSON.parse(data);
  const result = content.filter((contact) => contact.id !== Number(contactId));
  await fs.writeFile(contactsPath, JSON.stringify(result, null, 2));

  console.table(`The contact by id: ${contactId} removed`);
}

async function addContact(name, email, phone) {
  const data = await fs.readFile(contactsPath, "utf-8");
  const content = JSON.parse(data);

  content.push({ name, email, phone });
  await fs.writeFile(contactsPath, JSON.stringify(content, null, 2));
  console.table(`The contact ${name} was added succsessfully`);
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
