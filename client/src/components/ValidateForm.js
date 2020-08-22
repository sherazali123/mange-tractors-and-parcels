export const Constants = {
  ID: 'Id is required!',
  NAME: 'Name is required!',
  EMAIL: 'Email is required!',
  PASSWORD: 'Password is required!',
  AREA: 'Area is required!',
  CULTURE: 'Culture is required!',
  LONGTITUDE: 'Longitude is required!',
  LATITUDE: 'Latitude is required!',
  INVALID_LONGTITUDE: 'longitude is invalid!',
  INVALID_LATITUDE: 'latitude is invalid!',
  TRACTOR_ID: 'Please select tractor!',
  PARCEL_ID: 'Please select parcel!',
  PROCESS_ON: 'Date of process is required!',
  STATUS: 'Status is required!',
};

export const ValidateForm = (errors) => {
  let valid = true;
  Object.values(errors).forEach(
    // if we have an error string set valid to false
    (val) => val.length > 0 && (valid = false)
  );
  return valid;
};
