const { Validator } = require('jsonschema');

const v = new Validator();

const schemaValidator = (schema) => (req, res, next) => {
  const result = v.validate(req.body, schema);
  if (!result.valid) {
    const messageErrors = [];

    for (const item of result.errors) {
      messageErrors.push(item.message.replace('"', '').replace('"', ''));
    }

    return res.status(401).send({
      schemaErrors: messageErrors,
    });
  }
  return next();
};

module.exports = schemaValidator;
