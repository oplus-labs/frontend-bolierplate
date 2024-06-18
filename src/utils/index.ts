import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  const cnOutput = twMerge(clsx(inputs));
  return cnOutput;
}

export function sm(...inputs: ClassValue[]) {
  const smClasses = twMerge(clsx(inputs))
    .split(' ')
    .map((cls: string) => {
      return `sm:${cls}`;
    })
    .join(' ');
  return smClasses;
}

export function md(...inputs: ClassValue[]) {
  const mdClasses = twMerge(clsx(inputs))
    .split(' ')
    .map((cls: string) => {
      return `md:${cls}`;
    })
    .join(' ');
  return mdClasses;
}

export function lg(...inputs: ClassValue[]) {
  const lgClasses = twMerge(clsx(inputs))
    .split(' ')
    .map((cls: string) => {
      return `lg:${cls}`;
    })
    .join(' ');
  return lgClasses;
}

export function xl(...inputs: ClassValue[]) {
  const xlClasses = twMerge(clsx(inputs))
    .split(' ')
    .map((cls: string) => {
      return `xl:${cls}`;
    })
    .join(' ');
  return xlClasses;
}

/**
 * The scrollToComponent function scrolls the page smoothly to a specified component by its ID.
 * @param {string} componentId - The componentId parameter is a string that represents the id of the
 * component you want to scroll to.
 */
export function scrollToComponent(componentId: string) {
  const element = document.getElementById(componentId);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
}

/**
 * The function splits an array into multiple arrays of a specified size.
 * @param {Record<string, any>[]} array - An array of objects, where each object has string keys and
 * any values.
 * @param {number} size - The `size` parameter represents the desired size of each subarray. It
 * determines how many elements should be included in each subarray when splitting the original array.
 * @returns an array of arrays. Each inner array contains a subset of the original array, with each
 * subset having a maximum size specified by the "size" parameter.
 */
export function splitArrayIntoChunks(array: Record<string, any>[], size: number) {
  return array.reduce((acc: Record<string, any>[][], current: Record<string, any>) => {
    if (acc.length === 0 || acc[acc.length - 1].length === size) {
      acc.push([current]);
    } else {
      acc[acc.length - 1].push(current);
    }
    return acc;
  }, []);
}
