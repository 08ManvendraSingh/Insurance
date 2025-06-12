const validatePUser = (req, res) => {
  let { FirstName, MiddleName, LastName, Gender, DOB, MobileNo, Address } =
    req.body;

  if (
    !FirstName ||
    !MiddleName ||
    !LastName ||
    !Gender ||
    !DOB ||
    !MobileNo ||
    !Address
  ) {
    throw new Error("All fields are required");
  }
};

const validateCUser = (req, res) => {
  let {
    CompanyName,
    CompanyEmail,
    FirstName,
    MiddleName,
    LastName,
    Gender,
    DOB,
    MobileNo,
    Address,
  } = req.body;

  if (
    !CompanyName ||
    !CompanyEmail ||
    !FirstName ||
    !MiddleName ||
    !LastName ||
    !Gender ||
    !DOB ||
    !MobileNo ||
    !Address
  ) {
    throw new Error("All fields are required");
  }
};

module.exports = { validatePUser, validateCUser };
