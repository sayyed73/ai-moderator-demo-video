import {customers, CustomerId} from '../data/demo';

/** Channel of a customer by id. */
export const channelOf = (id: CustomerId) => customers[id].channel;
