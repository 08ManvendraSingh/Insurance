export const validateCompanyInputData = (inputData) => {
  const {
    CompanyName,
    CompanyEmail,
    FirstName,
    MiddleName,
    LastName,
    Gender,
    DOB,
    MobileNo,
    Address,
  } = inputData;

  let Errors = {};

  // Company Name
  if (!CompanyName?.trim()) {
    Errors.CompanyName = "Company name is required";
  } else if (CompanyName.length < 3 || CompanyName.length > 20) {
    Errors.CompanyName = "Company name must be between 3 and 20 characters";
  }

  // Company Email
  if (!CompanyEmail?.trim()) {
    Errors.CompanyEmail = "Company Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i.test(CompanyEmail.trim())) {
    Errors.CompanyEmail = "Enter a valid email address";
  }

  // First Name
  if (!FirstName?.trim()) {
    Errors.FirstName = "First name is required";
  } else if (FirstName.length < 3 || FirstName.length > 20) {
    Errors.FirstName = "First name must be between 3 and 20 characters";
  }

  // Middle Name
  if (!MiddleName?.trim()) {
    Errors.MiddleName = "Middle name is required";
  } else if (MiddleName.length < 3 || MiddleName.length > 20) {
    Errors.MiddleName = "Middle name must be between 3 and 20 characters";
  }

  // Last Name
  if (!LastName?.trim()) {
    Errors.LastName = "Last name is required";
  } else if (LastName.length < 3 || LastName.length > 20) {
    Errors.LastName = "Last name must be between 3 and 20 characters";
  }

  // Gender
  if (!Gender?.trim()) {
    Errors.Gender = "Gender is required";
  } else if (!["Male", "Female"].includes(Gender)) {
    Errors.Gender = "Gender must be either Male or Female";
  }

  // DOB
  const dobDate = new Date(DOB);
  if (!DOB?.trim()) {
    Errors.DOB = "Date of birth is required";
  } else if (isNaN(dobDate.getTime())) {
    Errors.DOB = "Invalid date of birth";
  } else {
    const minDate = new Date("1950-01-01");
    const now = new Date();
    if (dobDate < minDate) {
      Errors.DOB = "DOB must be on or after 01-01-1950";
    } else if (dobDate > now) {
      Errors.DOB = "DOB cannot be in the future";
    }
  }

  // Mobile No
  const mobileStr = String(MobileNo).trim();
  if (!mobileStr) {
    Errors.MobileNo = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(mobileStr)) {
    Errors.MobileNo = "Enter a valid 10-digit mobile number";
  } else if (MobileNo.length < 10) {
    Errors.MobileNo = "Enter a valid 10-digit mobile number";
  }

  // Address
  if (!Address?.trim()) {
    Errors.Address = "Address is required";
  } else if (Address.length < 3 || Address.length > 120) {
    Errors.Address = "Address must be between 3 and 120 characters";
  }

  return Errors;
};

export const validatePrivateInputData = (inputData) => {
  const { FirstName, MiddleName, LastName, Gender, DOB, MobileNo, Address } =
    inputData;

  const Errors = {};

  // First Name
  if (!FirstName?.trim()) {
    Errors.FirstName = "First name is required";
  } else if (FirstName.length < 3 || FirstName.length > 20) {
    Errors.FirstName = "First name must be between 3 and 20 characters";
  }

  // Middle Name
  if (!MiddleName?.trim()) {
    Errors.MiddleName = "Middle name is required";
  } else if (MiddleName.length < 3 || MiddleName.length > 20) {
    Errors.MiddleName = "Middle name must be between 3 and 20 characters";
  }

  // Last Name
  if (!LastName?.trim()) {
    Errors.LastName = "Last name is required";
  } else if (LastName.length < 3 || LastName.length > 20) {
    Errors.LastName = "Last name must be between 3 and 20 characters";
  }

  // Gender
  if (!Gender?.trim()) {
    Errors.Gender = "Gender is required";
  } else if (!["Male", "Female"].includes(Gender)) {
    Errors.Gender = "Gender must be either Male or Female";
  }

  // DOB
  const dobDate = new Date(DOB);
  if (!DOB?.trim()) {
    Errors.DOB = "Date of birth is required";
  } else if (isNaN(dobDate.getTime())) {
    Errors.DOB = "Invalid date of birth";
  } else {
    const minDate = new Date("1950-01-01");
    const now = new Date();
    if (dobDate < minDate) {
      Errors.DOB = "DOB must be on or after 01-01-1950";
    } else if (dobDate > now) {
      Errors.DOB = "DOB cannot be in the future";
    }
  }

  // Mobile No
  const mobileStr = String(MobileNo).trim();
  if (!mobileStr) {
    Errors.MobileNo = "Phone number is required";
  } else if (!/^[6-9]\d{9}$/.test(mobileStr)) {
    Errors.MobileNo = "Enter a valid 10-digit mobile number";
  } else if (MobileNo.length < 10) {
    Errors.MobileNo = "Enter a valid 10-digit mobile number";
  }

  // Address
  if (!Address?.trim()) {
    Errors.Address = "Address is required";
  } else if (Address.length < 3 || Address.length > 120) {
    Errors.Address = "Address must be between 3 and 120 characters";
  }

  return Errors;
};
