import {capitalizeFirstLetter} from "./capitalizeFirstLetter";
import {monthNames} from "./mothNames";

export const createdAt = (time: string) => {
 const date = new Date(time)
	return `${date.getDate()} 
            ${capitalizeFirstLetter(monthNames[date.getMonth()].slice(0, 3).toLowerCase())} 
            ${date.getFullYear()}, 
            ${date.toLocaleString('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		hour12: true
	}).toLowerCase()
	}`
}
