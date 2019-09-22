import { DAYS_IN_WEEK } from './constants';

// returns a new date shifted a certain number of days (can be negative)
export function shiftDate(date, numDays) {
  const newDate = new Date(date);
  newDate.setDate(newDate.getDate() + numDays);
  return newDate;
}

export function getDatetimeFromDate(date) {
  let dateObj = convertToDate(date);
  return new Date(dateObj.getFullYear(), dateObj.getMonth(), dateObj.getDate());
}

// obj can be a parseable string, a millisecond timestamp, or a Date object
export function convertToDate(obj) {
  return obj instanceof Date ? obj : new Date(obj);
}

export function dateNDaysAgo(numDaysAgo) {
  return shiftDate(new Date(), -numDaysAgo);
}

export function getRange(count) {
  const arr = [];
  for (let idx = 0; idx < count; idx += 1) {
    arr.push(idx);
  }
  return arr;
}

export function getNumEmptyDaysEnd(date) {
  // getDay returns 0-6, Sun-Sat
  // top row of grid is Sunday
  return DAYS_IN_WEEK - 1 - convertToDate(date).getDay();
}

export function getNumEmptyDaysStart(date) {
  return convertToDate(date).getDay();
} 
