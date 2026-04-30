// Persona Registry - Central export for all personas
// This makes it easy to add/remove personas without changing server.js

const anshuman = require('./anshuman');
const abhimanyu = require('./abhimanyu');
const kshitij = require('./kshitij');

// Registry object mapping persona IDs to their full config
const PERSONAS = {
  anshuman: anshuman,
  abhimanyu: abhimanyu,
  kshitij: kshitij
};

// Helper function to get persona by ID
function getPersona(personaId) {
  return PERSONAS[personaId] || null;
}

// Helper to get all persona IDs
function getAllPersonaIds() {
  return Object.keys(PERSONAS);
}

// Helper to get persona suggestions
function getPersonaSuggestions(personaId) {
  const persona = getPersona(personaId);
  return persona ? persona.suggestions : [];
}

module.exports = {
  PERSONAS,
  getPersona,
  getAllPersonaIds,
  getPersonaSuggestions
};